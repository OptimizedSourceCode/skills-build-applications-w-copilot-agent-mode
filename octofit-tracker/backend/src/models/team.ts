import { Schema, model } from "mongoose";

const teamSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, default: "" },
    membersCount: { type: Number, default: 0 },
    totalPoints: { type: Number, default: 0 },
    createdAt: { type: Date, default: () => new Date() }
  },
  { timestamps: true }
);

const Team = model("Team", teamSchema);
export default Team;
