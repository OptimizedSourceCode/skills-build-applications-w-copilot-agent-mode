import { Router } from "express";
import Leaderboard from "../models/leaderboard.js";

const router = Router();

router.get("/", async (_req, res) => {
  const boards = await Leaderboard.find();
  res.json({ resource: "leaderboard", data: boards });
});

export default router;
