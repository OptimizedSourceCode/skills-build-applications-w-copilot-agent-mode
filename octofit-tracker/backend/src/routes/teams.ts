import { Router } from "express";
import Team from "../models/team.js";

const router = Router();

router.get("/", async (_req, res) => {
  const teams = await Team.find();
  res.json({ resource: "teams", data: teams });
});

router.get("/:id", async (req, res) => {
  const team = await Team.findById(req.params.id);
  if (!team) {
    return res.status(404).json({ error: "Team not found" });
  }
  res.json({ resource: "teams", data: team });
});

export default router;
