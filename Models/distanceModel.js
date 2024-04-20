import mongoose from "mongoose";

const { Schema } = mongoose;

const distanceSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  distanceKm: {
    type: Number,
    required: true
  }
});

const Distance = mongoose.model("Distance", distanceSchema);

export default Distance;