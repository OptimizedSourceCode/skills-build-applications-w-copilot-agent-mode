import express from "express";
import mongoose from "mongoose";

const app = express();
const PORT = 8000;
const MONGODB_URI = "mongodb://127.0.0.1:27017/octofit";

app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ status: "OctoFit Tracker backend is running" });
});

mongoose.set("strictQuery", true);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log(`Connected to MongoDB at ${MONGODB_URI}`);
    app.listen(PORT, () => {
      console.log(`Backend running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1);
  });
