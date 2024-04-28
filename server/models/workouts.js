const mongoose = require('mongoose');

const workoutsSchema = new mongoose.Schema({
    date: Date,
    duration: Number,
    exercises: Number,
    sets: Number,
    volume: Number
  }, { timestamps: true });
  const Workouts = mongoose.model('Workouts', workoutsSchema);

module.exports = Workouts;
