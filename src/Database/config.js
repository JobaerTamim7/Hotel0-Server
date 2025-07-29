import { config } from "dotenv";
import { MongoClient, ServerApiVersion } from "mongodb";

config();

const uri = process.env.DB_URI;
const DBName = process.env.DB_NAME;

let client = null;

const connectDB = async () => {
  if (!client) {
    client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
    await client.connect();
  }

  return client.db(DBName);
};

export { client, connectDB };
