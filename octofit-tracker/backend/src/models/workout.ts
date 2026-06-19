import { Schema, model, Types } from "mongoose";

const workoutSchema = new Schema(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    durationMin: { type: Number, required: true },
    intensity: { type: String, required: true },
    description: { type: String, default: "" },
    createdBy: { type: Types.ObjectId, ref: "User" },
    createdAt: { type: Date, default: () => new Date() }
  },
  { timestamps: true }
);

const Workout = model("Workout", workoutSchema);
export default Workout;
