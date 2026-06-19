import { Schema, model, Types } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    team: { type: Types.ObjectId, ref: "Team" },
    role: { type: String, default: "member" },
    joinedAt: { type: Date, default: () => new Date() },
    totalPoints: { type: Number, default: 0 }
  },
  { timestamps: true }
);

const User = model("User", userSchema);
export default User;
