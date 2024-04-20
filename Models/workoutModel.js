import mongoose from "mongoose";

const { Schema } = mongoose;

const workoutSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  caloriesBurned: {
    type: Number,
    required: true
  }
});

const Workout = mongoose.model("Workout", workoutSchema);

export default Workout;