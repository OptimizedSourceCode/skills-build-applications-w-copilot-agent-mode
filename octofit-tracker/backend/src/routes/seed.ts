import { Router } from "express";
import User from "../models/user.js";
import Team from "../models/team.js";
import Activity from "../models/activity.js";
import Workout from "../models/workout.js";
import Leaderboard from "../models/leaderboard.js";

const router = Router();

router.get("/", async (_req, res) => {
  const [users, teams, activities, workouts, leaderboard] = await Promise.all([
    User.countDocuments(),
    Team.countDocuments(),
    Activity.countDocuments(),
    Workout.countDocuments(),
    Leaderboard.countDocuments()
  ]);

  res.json({
    resource: "seed",
    status: "ok",
    database: "octofit_db",
    counts: {
      users,
      teams,
      activities,
      workouts,
      leaderboard
    }
  });
});

export default router;
