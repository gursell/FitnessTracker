import mongoose from "mongoose";

const { Schema } = mongoose;

const goalSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  dailyStepGoal: {
    type: Number,
    required: true
  },
  dailyCalorieGoal: {
    type: Number,
    required: true
  },
  weeklyExerciseGoal: {
    type: Number,
    required: true
  }
});

const Goal = mongoose.model("Goal", goalSchema);

export default Goal;