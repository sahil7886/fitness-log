const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
    exercise: String,
    reps: Number,
    weight: Number,
    setNo: Number,
  }, { timestamps: true });
  const Workout = mongoose.model('Workout', workoutSchema);

module.exports = Workout;
