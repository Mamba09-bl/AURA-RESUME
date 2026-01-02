import mongoose from "mongoose";

let isConnected = false;

export async function connectDB() {
  if (isConnected) return;

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "AlphaAi",
    });

    isConnected = true;
    console.log("✔ MongoDB Connected");
  } catch (err) {
    console.error("❌ MongoDB Error:", err);
  }
}
