import mongoose from "mongoose";
import { faker } from '@faker-js/faker';
import User from "./Models/userModel.js";
import Calorie from "./Models/calorieModel.js";
import Distance from "./Models/distanceModel.js";
import Goal from "./Models/goalModel.js";
import Step from "./Models/stepModel.js";
import Workout from "./Models/workoutModel.js";

mongoose.connect("mongodb+srv://unlgrsel:gursel1234@cluster0.hl9pkld.mongodb.net/FitnessTracker-Gursel");

const db = mongoose.connection;

async function seedDB() {
  try {
    for (let i = 0; i < 100; i++) {
      const user = await User.create({
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
      });

        for (let j = 0; j < 5; j++) {
        await Goal.create({
          userId: user._id,
          dailyStepGoal: faker.number.int({ min: 5000, max: 15000 }),
          dailyCalorieGoal: faker.number.int({ min: 1500, max: 3000 }),
          weeklyExerciseGoal: faker.number.int({ min: 150, max: 300 })
        });
      }

      for (let j = 0; j < 10; j++) {  
        await Distance.create({
          userId: user._id,
          date: faker.date.anytime(),
          distanceKm: faker.number.int({ min: 1, max: 20 })
        });
      }

      for (let j = 0; j < 10; j++) {
        await Calorie.create({
          userId: user._id,
          date: faker.date.anytime(),
          caloriesConsumed: faker.number.int({ min: 500, max: 1500 })
        });
      }

      for (let j = 0; j < 10; j++) {
        await Step.create({
          userId: user._id,
          date: faker.date.anytime(),
          stepCount: faker.number.int({ min: 1000, max: 20000 })
        });
      }
        for (let j = 0; j < 10; j++) {
        await Workout.create({
          userId: user._id,
          date: faker.date.anytime(),
          duration: faker.number.int({ min: 10, max: 120 }),
          caloriesBurned: faker.number.int({ min: 50, max: 500 })
        });
      }
    }

    console.log("Seed data inserted successfully!");
  } catch (error) {
    console.error("Error while seeding database:", error);
  } finally {
    mongoose.disconnect();
  }
}

seedDB();