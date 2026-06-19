import { Schema, model, Types } from "mongoose";

const leaderboardEntrySchema = new Schema(
  {
    rank: { type: Number, required: true },
    entityId: { type: Types.ObjectId, required: true },
    name: { type: String, required: true },
    points: { type: Number, required: true },
    type: { type: String, enum: ["user", "team"], required: true }
  },
  { _id: false }
);

const leaderboardSchema = new Schema(
  {
    category: { type: String, required: true },
    entries: { type: [leaderboardEntrySchema], default: [] },
    generatedAt: { type: Date, default: () => new Date() }
  },
  { timestamps: true }
);

const Leaderboard = model("Leaderboard", leaderboardSchema);
export default Leaderboard;
