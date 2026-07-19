package main

import (
    "context"
    "database/sql"
    "encoding/json"
    "log"
    "math/rand"
    "net/http"
    "strconv"
    "time"

    "github.com/gin-gonic/gin"
    _ "github.com/lib/pq"
    "github.com/segmentio/kafka-go"
)

type BookingRequest struct {
    UserID      string      `json:"user_id"`
    TrainID     string      `json:"train_id"`
    FromStation string      `json:"from_station"`
    ToStation   string      `json:"to_station"`
    TravelDate  string      `json:"travel_date"`
    Class       string      `json:"class"`
    Passengers  []Passenger `json:"passengers"`
    PaymentID   string      `json:"payment_id"`
}

type Passenger struct {
    Name      string `json:"name"`
    Age       int    `json:"age"`
    Gender    string `json:"gender"`
    BerthPref string `json:"berth_preference"`
}

type BookingEvent struct {
    EventType string    `json:"event_type"`
    PNR       string    `json:"pnr"`
    UserID    string    `json:"user_id"`
    Timestamp time.Time `json:"timestamp"`
}

var db *sql.DB
var kafkaWriter *kafka.Writer

func main() {
    var err error
    db, err = sql.Open("postgres", "postgres://user:pass@db-cluster:5432/bookings?sslmode=disable")
    if err != nil {
        log.Fatal(err)
    }
    db.SetMaxOpenConns(100)
    db.SetMaxIdleConns(50)
    db.SetConnMaxLifetime(time.Hour)

    kafkaWriter = &kafka.Writer{
        Addr:     kafka.TCP("kafka-cluster:9092"),
        Topic:    "booking-events",
        Balancer: &kafka.LeastBytes{},
    }

    r := gin.Default()
    r.POST("/api/v1/booking/create", createBooking)
    r.GET("/api/v1/booking/:pnr", getBookingStatus)
    r.GET("/health", func(c *gin.Context) { c.JSON(http.StatusOK, gin.H{"status": "healthy", "timestamp": time.Now().UnixMilli()}) })

    log.Fatal(r.Run(":3000"))
}

func createBooking(c *gin.Context) {
    ctx := c.Request.Context()
    var req BookingRequest

    if err := c.ShouldBindJSON(&req); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    tx, err := db.BeginTx(ctx, &sql.TxOptions{Isolation: sql.LevelSerializable})
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to start transaction"})
        return
    }
    defer tx.Rollback()

    pnr := generatePNR()

    var availableSeats int
    err = tx.QueryRowContext(ctx,
        "SELECT available_seats FROM train_availability WHERE train_id = $1 AND travel_date = $2 AND class = $3 FOR UPDATE",
        req.TrainID, req.TravelDate, req.Class).Scan(&availableSeats)

    if err != nil || availableSeats < len(req.Passengers) {
        c.JSON(http.StatusConflict, gin.H{"error": "Seats not available"})
        return
    }

    _, err = tx.ExecContext(ctx,
        `INSERT INTO bookings (pnr, user_id, train_id, from_station, to_station, travel_date, class, status, payment_id, created_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, 'CONFIRMED', $8, NOW())`,
        pnr, req.UserID, req.TrainID, req.FromStation, req.ToStation, req.TravelDate, req.Class, req.PaymentID)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Booking failed"})
        return
    }

    for _, p := range req.Passengers {
        _, err = tx.ExecContext(ctx,
            `INSERT INTO passengers (pnr, name, age, gender, berth_preference)
             VALUES ($1, $2, $3, $4, $5)`,
            pnr, p.Name, p.Age, p.Gender, p.BerthPref)
        if err != nil {
            c.JSON(http.StatusInternalServerError, gin.H{"error": "Passenger insert failed"})
            return
        }
    }

    _, err = tx.ExecContext(ctx,
        `UPDATE train_availability SET available_seats = available_seats - $1
         WHERE train_id = $2 AND travel_date = $3 AND class = $4`,
        len(req.Passengers), req.TrainID, req.TravelDate, req.Class)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Availability update failed"})
        return
    }

    if err := tx.Commit(); err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Transaction commit failed"})
        return
    }

    publishBookingEvent(ctx, BookingEvent{EventType: "BOOKING_CREATED", PNR: pnr, UserID: req.UserID, Timestamp: time.Now()})

    c.JSON(http.StatusCreated, gin.H{"pnr": pnr, "status": "CONFIRMED", "message": "Booking successful"})
}

func getBookingStatus(c *gin.Context) {
    c.JSON(http.StatusOK, gin.H{"pnr": c.Param("pnr"), "status": "CONFIRMED"})
}

func publishBookingEvent(ctx context.Context, event BookingEvent) {
    eventData, err := json.Marshal(event)
    if err != nil {
        log.Printf("failed to marshal booking event: %v", err)
        return
    }
    if err := kafkaWriter.WriteMessages(ctx, kafka.Message{Value: eventData}); err != nil {
        log.Printf("failed to publish booking event: %v", err)
    }
}

func generatePNR() string {
    return strconv.FormatInt(1000000000+rand.Int63n(8999999999), 10)
}
