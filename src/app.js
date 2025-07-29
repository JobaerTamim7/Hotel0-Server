import express from "express";
import cors from "cors";
import RoomRouter from "./Room/getRoom.js";

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

app.use((req, res, next) => {
  console.log(`404 - Route not found: ${req.method} ${req.path}`);
  res.status(404).json({ error: "Route not found", path: req.path });
});

export default app;
