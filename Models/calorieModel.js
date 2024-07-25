import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const caloriesSchema = new Schema({
  userId: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  caloriesConsumed: {
    type: Number,
    required: true
  }
});

const Calories = mongoose.model('Calories', caloriesSchema);

export default Calories;