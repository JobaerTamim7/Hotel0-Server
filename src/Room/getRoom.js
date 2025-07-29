import { getCollection } from "../Utils/getCollection.js";
import { Router } from "express";

const RoomRouter = Router();

RoomRouter.get("/all", async (req, res) => {
  try {
    const rooms = await getCollection("rooms");
    res.status(200).json(rooms);
  } catch (error) {
    console.error("Error fetching rooms:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default RoomRouter;
