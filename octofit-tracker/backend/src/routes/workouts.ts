import { Router } from "express";
import Workout from "../models/workout.js";

const router = Router();

router.get("/", async (_req, res) => {
  const workouts = await Workout.find().populate("createdBy", "name");
  res.json({ resource: "workouts", data: workouts });
});

router.get("/:id", async (req, res) => {
  const workout = await Workout.findById(req.params.id).populate("createdBy", "name");
  if (!workout) {
    return res.status(404).json({ error: "Workout not found" });
  }
  res.json({ resource: "workouts", data: workout });
});

export default router;
