# AI Service

Python + FastAPI service for IRCTC intelligence workloads.

## Endpoints

- `POST /predict/confirmation` predicts ticket confirmation probability with TensorFlow and Redis Cluster caching.
- `POST /recommend/trains` returns personalized recommendations with a joblib recommendation model.
- `POST /chat` classifies NLP intent and routes to train search, PNR status, or booking help handlers.
- `GET /health` reports model readiness.

## Runtime

```bash
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 3000
```
