import mongoose from "mongoose";

const { Schema } = mongoose;

const stepSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  stepCount: {
    type: Number,
    required: true
  }
});

const Step = mongoose.model("Step", stepSchema);

export default Step;