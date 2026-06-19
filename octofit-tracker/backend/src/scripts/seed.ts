import mongoose from "mongoose";
import Team from "../models/team.js";
import User from "../models/user.js";
import Workout from "../models/workout.js";
import Activity from "../models/activity.js";
import Leaderboard from "../models/leaderboard.js";

import { connectDB, disconnectDB } from "../config/database.js";

console.log("Seed the octofit_db database with test data");

async function seed() {
  await connectDB();
  console.log(`Connected to MongoDB at ${process.env.MONGODB_URI ?? "mongodb://127.0.0.1:27017/octofit_db"}`);

  await Promise.all([
    Team.deleteMany({}),
    User.deleteMany({}),
    Workout.deleteMany({}),
    Activity.deleteMany({}),
    Leaderboard.deleteMany({})
  ]);

  const teams = await Team.create([
    {
      name: "Velocity Crew",
      description: "A high-performance training squad focused on speed and endurance.",
      membersCount: 3,
      totalPoints: 12400
    },
    {
      name: "Trail Blazers",
      description: "Outdoor athletes pushing personal bests across running and cycling.",
      membersCount: 2,
      totalPoints: 9300
    }
  ]);

  const users = await User.create([
    {
      name: "Ava Morgan",
      email: "ava.morgan@example.com",
      team: teams[0]._id,
      role: "captain",
      joinedAt: new Date("2025-09-14"),
      totalPoints: 5400
    },
    {
      name: "Noah Patel",
      email: "noah.patel@example.com",
      team: teams[0]._id,
      role: "member",
      joinedAt: new Date("2025-11-02"),
      totalPoints: 4100
    },
    {
      name: "Sofia Chen",
      email: "sofia.chen@example.com",
      team: teams[1]._id,
      role: "member",
      joinedAt: new Date("2026-01-05"),
      totalPoints: 5200
    }
  ]);

  const workouts = await Workout.create([
    {
      title: "Morning Power Run",
      category: "Running",
      durationMin: 45,
      intensity: "Moderate",
      description: "A balanced run designed to build stamina and heart rate recovery.",
      createdBy: users[0]._id
    },
    {
      title: "Strength Circuit",
      category: "Strength",
      durationMin: 35,
      intensity: "High",
      description: "Full-body circuit with bodyweight exercises and kettlebell swings.",
      createdBy: users[1]._id
    },
    {
      title: "Recovery Ride",
      category: "Cycling",
      durationMin: 60,
      intensity: "Low",
      description: "A restorative ride to flush legs and keep cadence smooth.",
      createdBy: users[2]._id
    }
  ]);

  const activities = await Activity.create([
    {
      user: users[0]._id,
      workout: workouts[0]._id,
      date: new Date("2026-06-15T07:30:00Z"),
      durationMin: 46,
      distanceKm: 8.4,
      caloriesBurned: 520,
      notes: "Maintained a steady pace with a strong finish."
    },
    {
      user: users[1]._id,
      workout: workouts[1]._id,
      date: new Date("2026-06-16T18:00:00Z"),
      durationMin: 37,
      distanceKm: 0,
      caloriesBurned: 450,
      notes: "Added extra kettlebell sets for upper body strength."
    },
    {
      user: users[2]._id,
      workout: workouts[2]._id,
      date: new Date("2026-06-17T09:00:00Z"),
      durationMin: 62,
      distanceKm: 22,
      caloriesBurned: 380,
      notes: "Easy spin with comfortable cadence and good recovery."
    }
  ]);

  const leaderboard = await Leaderboard.create({
    category: "monthly",
    entries: [
      {
        rank: 1,
        entityId: users[0]._id,
        name: "Ava Morgan",
        points: 5400,
        type: "user"
      },
      {
        rank: 2,
        entityId: users[2]._id,
        name: "Sofia Chen",
        points: 5200,
        type: "user"
      },
      {
        rank: 3,
        entityId: teams[0]._id,
        name: "Velocity Crew",
        points: 12400,
        type: "team"
      },
      {
        rank: 4,
        entityId: teams[1]._id,
        name: "Trail Blazers",
        points: 9300,
        type: "team"
      }
    ]
  });

  console.log(`Seeded ${teams.length} teams, ${users.length} users, ${workouts.length} workouts, ${activities.length} activities, and 1 leaderboard document.`);
  console.log("Sample leaderboard document ID:", leaderboard._id.toString());

  await disconnectDB();
  console.log("Seed complete and disconnected from MongoDB.");
}

seed().catch((error) => {
  console.error("Seed script failed:", error);
  process.exit(1);
});
