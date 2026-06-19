import { Schema, model, Types } from "mongoose";

const activitySchema = new Schema(
  {
    user: { type: Types.ObjectId, ref: "User", required: true },
    workout: { type: Types.ObjectId, ref: "Workout", required: true },
    date: { type: Date, required: true },
    durationMin: { type: Number, required: true },
    distanceKm: { type: Number, default: 0 },
    caloriesBurned: { type: Number, default: 0 },
    notes: { type: String, default: "" }
  },
  { timestamps: true }
);

const Activity = model("Activity", activitySchema);
export default Activity;
