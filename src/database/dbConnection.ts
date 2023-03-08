import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()

const MONGO_URI = `${process.env.MONGO_URL}`

mongoose.connect(MONGO_URI, (): void => {
    console.log("Server connected to database");
  }
);

export default mongoose;

