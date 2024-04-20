import mongoose from "mongoose";

const { Schema } = mongoose;

const calorieSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  caloriesConsumed: {
    type: Number,
    required: true
  },
  
});

const Calorie = mongoose.model("Calorie", calorieSchema);

export default Calorie;