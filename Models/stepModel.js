import mongoose from 'mongoose';

const stepsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true // Example of a required field
  },
  date: {
    type: Date,
    required: true
  },
  steps: {
    type: Number,
    required: true // Ensure steps field is required
  }
});

const Steps = mongoose.model('Steps', stepsSchema);

export default Steps;
