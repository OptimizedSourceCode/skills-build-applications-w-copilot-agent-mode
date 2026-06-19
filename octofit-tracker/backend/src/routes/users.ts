import { Router } from "express";
import User from "../models/user.js";

const router = Router();

router.get("/", async (_req, res) => {
  const users = await User.find().populate("team", "name totalPoints");
  res.json({ resource: "users", data: users });
});

router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id).populate("team", "name");
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  res.json({ resource: "users", data: user });
});

export default router;
