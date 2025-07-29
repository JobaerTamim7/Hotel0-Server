import { getCollection } from "../Utils/getCollection.js";
import { Router } from "express";

const RoomRouter = Router();

RoomRouter.get("/all", async (req, res) => {
  try {
    const roomCollection = await getCollection("rooms");
    const rooms = await roomCollection.find({}).toArray();
    console.log("Fetched rooms:", rooms);
    res.status(200).json(rooms);
  } catch (error) {
    console.error("Error fetching rooms:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

RoomRouter.get("/:id", async (req, res) => {
  const roomId = req.params.id;
  try {
    const roomCollection = await getCollection("rooms");
    const room = await roomCollection.findOne({
      roomId: roomId,
    });
    if (!room) {
      return res.status(404).json({ error: "Room not found" });
    }
    console.log("Fetched room:", room);
    res.status(200).json(room);
  } catch (error) {
    console.error("Error fetching room:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default RoomRouter;
