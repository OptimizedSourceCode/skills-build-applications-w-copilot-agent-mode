import mongoose from "mongoose";

export const MONGODB_URI = process.env.MONGODB_URI ?? "mongodb://127.0.0.1:27017/octofit_db";

export function configureMongoose(): void {
  mongoose.set("strictQuery", true);
}

export async function connectDB(): Promise<typeof mongoose> {
  configureMongoose();
  return mongoose.connect(MONGODB_URI);
}

export async function disconnectDB(): Promise<void> {
  await mongoose.disconnect();
}

export default mongoose;
