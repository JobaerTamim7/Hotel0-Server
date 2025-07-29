import express from "express";
import cors from "cors";
import RoomRouter from "./Room/getRoom.js";
import { getCollection } from "./Utils/getCollection.js";

const app = express();
const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: "*",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/rooms", RoomRouter);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to the Hotel Server API" });
});

app.post("/reviews", async (req, res) => {
  const { rating, comment, roomId, userEmail } = req.body;
  try {
    const reviewsCollection = await getCollection("reviews");
    const newReview = {
      rating,
      comment,
      roomId,
      userEmail,
      createdAt: new Date(),
    };
    const result = await reviewsCollection.insertOne(newReview);
    res.status(201).json({
      message: "Review added successfully",
      reviewId: result.insertedId,
    });
  } catch (error) {
    console.error("Error adding review:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



app.use((req, res, next) => {
  console.log(`404 - Route not found: ${req.method} ${req.path}`);
  res.status(404).json({ error: "Route not found", path: req.path });
});

export default app;
