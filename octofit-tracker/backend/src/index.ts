import express from "express";
import mongoose from "mongoose";
import usersRouter from "./routes/users.js";
import teamsRouter from "./routes/teams.js";
import activitiesRouter from "./routes/activities.js";
import leaderboardRouter from "./routes/leaderboard.js";
import workoutsRouter from "./routes/workouts.js";
import seedRouter from "./routes/seed.js";

const app = express();
const PORT = 8000;
const MONGODB_URI = "mongodb://127.0.0.1:27017/octofit_db";
const CODESPACE_NAME = process.env.CODESPACE_NAME;
const API_URL = CODESPACE_NAME
  ? `https://${CODESPACE_NAME}-8000.githubpreview.dev`
  : `http://localhost:${PORT}`;

app.use(express.json());
app.use("/api/users", usersRouter);
app.use("/api/teams", teamsRouter);
app.use("/api/activities", activitiesRouter);
app.use("/api/leaderboard", leaderboardRouter);
app.use("/api/workouts", workoutsRouter);
app.use("/api/seed", seedRouter);

app.get("/api", (_req, res) => {
  res.json({
    status: "OctoFit Tracker backend API is running",
    apiUrl: API_URL,
    routes: [
      "/api/users/",
      "/api/teams/",
      "/api/activities/",
      "/api/leaderboard/",
      "/api/workouts/"
    ]
  });
});

app.get("/", (_req, res) => {
  res.json({
    status: "OctoFit Tracker backend is running",
    apiUrl: API_URL
  });
});

mongoose.set("strictQuery", true);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log(`Connected to MongoDB at ${MONGODB_URI}`);
    app.listen(PORT, () => {
      console.log(`Backend running on ${API_URL}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1);
  });
