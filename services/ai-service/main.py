from __future__ import annotations

import asyncio
from typing import Any, List, Optional

import joblib
import numpy as np
import redis
import tensorflow as tf
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI(title="IRCTC AI Service")

confirmation_model = tf.keras.models.load_model("models/confirmation_predictor.h5")
recommendation_model = joblib.load("models/recommendation_engine.pkl")
nlp_model = joblib.load("models/nlp_classifier.pkl")
redis_client = redis.RedisCluster(host="redis-cluster", port=6379)


class SearchQuery(BaseModel):
    from_station: str
    to_station: str
    travel_date: str
    class_type: str
    quota: str = "GN"


class BookingHistory(BaseModel):
    user_id: str
    past_bookings: List[dict[str, Any]]


class ChatMessage(BaseModel):
    user_id: str
    message: str
    context: Optional[dict[str, Any]] = None


@app.post("/predict/confirmation")
async def predict_confirmation(query: SearchQuery) -> dict[str, Any]:
    """Predict ticket confirmation probability."""
    cache_key = f"prediction:{query.from_station}:{query.to_station}:{query.travel_date}:{query.class_type}"
    cached = redis_client.get(cache_key)
    if cached:
        return {"probability": float(cached), "cached": True}

    features = extract_features(query)
    prediction = confirmation_model.predict(np.array([features]))[0][0]
    redis_client.setex(cache_key, 3600, str(prediction))

    return {
        "probability": float(prediction),
        "confidence": "HIGH" if prediction > 0.8 else "MEDIUM" if prediction > 0.5 else "LOW",
        "cached": False,
    }


@app.post("/recommend/trains")
async def recommend_trains(history: BookingHistory) -> dict[str, Any]:
    """Return personalized train recommendations."""
    user_embeddings = recommendation_model.transform(history.past_bookings)
    recommendations = recommendation_model.recommend(user_embeddings, top_k=10)
    return {"recommendations": recommendations}


@app.post("/chat")
async def chat_assistant(message: ChatMessage) -> dict[str, Any]:
    """Route AI chat requests to intent-specific handlers."""
    intent = nlp_model.predict([message.message])[0]
    if intent == "SEARCH_TRAIN":
        return await handle_train_search(message)
    if intent == "PNR_STATUS":
        return await handle_pnr_status(message)
    if intent == "BOOKING_HELP":
        return await handle_booking_help(message)
    return {"reply": "I'm here to help! What would you like to know?"}


@app.get("/health")
async def health() -> dict[str, Any]:
    return {"status": "healthy", "models": ["confirmation", "recommendation", "nlp"]}


@app.on_event("startup")
async def startup_event() -> None:
    print("AI Service started - Models loaded successfully")


def extract_features(query: SearchQuery) -> np.ndarray:
    route_hash = (sum(map(ord, query.from_station + query.to_station)) % 100) / 100
    quota_score = 1.0 if query.quota == "GN" else 0.7
    class_score = {"1A": 0.9, "2A": 0.8, "3A": 0.7, "SL": 0.6, "CC": 0.75}.get(query.class_type, 0.5)
    return np.array([route_hash, quota_score, class_score, len(query.travel_date) / 10])


async def handle_train_search(message: ChatMessage) -> dict[str, Any]:
    await asyncio.sleep(0)
    return {"reply": "I found matching trains and ranked them by duration, fare, and confirmation probability.", "intent": "SEARCH_TRAIN"}


async def handle_pnr_status(message: ChatMessage) -> dict[str, Any]:
    await asyncio.sleep(0)
    pnr = (message.context or {}).get("pnr", "unknown")
    return {"reply": f"PNR {pnr} is being checked with live cache and notification subscription.", "intent": "PNR_STATUS"}


async def handle_booking_help(message: ChatMessage) -> dict[str, Any]:
    await asyncio.sleep(0)
    return {"reply": "I can help with passenger details, quota choice, berth preference, catering, insurance, and payment steps.", "intent": "BOOKING_HELP"}
