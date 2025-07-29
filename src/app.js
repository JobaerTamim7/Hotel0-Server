import express from "express";
import cors from "cors";
import { formatDate } from "./Utils/dateFormatter.js";
import { getCollection } from "./Utils/getCollection.js";
import { v4 } from "uuid";

const app = express();
const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: "*",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to the Hotel Server API" });
});

app.post("/populate", async (req, res) => {
  const {
    roomCateory,
    roomNumber,
    roomPrice,
    roomStatus,
    roomImage,
    roomDescription,
    bookedDate = "",
    userEmail = "",
  } = req.body;
  if (bookedDate) {
    const bookedDate = formatDate(bookedDate);
  }

  const roomId = "room-" + v4();

  const roomCollection = await getCollection("rooms");

  await roomCollection
    .insertOne({
      roomId,
      roomCateory,
      roomNumber,
      roomPrice,
      roomStatus,
      roomImage,
      roomDescription,
      bookedDate,
      userEmail,
    })
    .then(() => {
      res.status(201).json({ message: "Room added successfully" });
    })
    .catch((error) => {
      console.error("Error adding room:", error);
      res.status(500).json({ error: "Failed to add room" });
    });
});

app.use((req, res, next) => {
  console.log(`404 - Route not found: ${req.method} ${req.path}`);
  res.status(404).json({ error: "Route not found", path: req.path });
});

export default app;
