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

RoomRouter.patch("/book", async (req, res) => {
  const { roomId, userEmail } = req.body;
  try {
    const roomCollection = await getCollection("rooms");
    const updateResult = await roomCollection.updateOne(
      { roomId: roomId },
      { $set: { userEmail: userEmail, roomStatus: "unavailable" } }
    );
    if (updateResult.modifiedCount === 0) {
      return res
        .status(404)
        .json({ error: "Room not found or already booked" });
    }
    console.log(`Room ${roomId} booked by ${userEmail}`);
    res.status(200).json({ message: "Room booked successfully" });
  } catch (error) {
    console.error("Error booking room:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

RoomRouter.get("/my-rooms/:userEmail", async (req, res) => {
  const userEmail = req.params.userEmail;
  try {
    const roomCollection = await getCollection("rooms");
    const rooms = await roomCollection.find({ userEmail: userEmail }).toArray();
    if (rooms.length === 0) {
      return res.status(404).json({ error: "No rooms found for this user" });
    }
    console.log(`Fetched rooms for user ${userEmail}:`, rooms);
    res.status(200).json(rooms);
  } catch (error) {
    console.error("Error fetching user's rooms:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default RoomRouter;
