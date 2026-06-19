import { Router } from "express";
import Activity from "../models/activity.js";

const router = Router();

router.get("/", async (_req, res) => {
  const activities = await Activity.find().populate("user", "name").populate("workout", "title category");
  res.json({ resource: "activities", data: activities });
});

router.get("/:id", async (req, res) => {
  const activity = await Activity.findById(req.params.id)
    .populate("user", "name")
    .populate("workout", "title category");
  if (!activity) {
    return res.status(404).json({ error: "Activity not found" });
  }
  res.json({ resource: "activities", data: activity });
});

export default router;
