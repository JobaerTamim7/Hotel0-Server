import { connectDB } from "../Database/config.js";

const getCollection = async (name) => {
  const db = await connectDB();
  const collection = db.collection(name);

  return collection;
};

export { getCollection };
