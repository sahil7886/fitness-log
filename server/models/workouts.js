const mongoose = require('mongoose');
//list of exercises
//every exercise done is counted as 1 workout
//removes the need for a 2nd and third table for holding exercises within a workout
const workoutsSchema = new mongoose.Schema({
    name: String,
    date: Date,
    duration: Number,
    sets: Number,
    reps: Number,
    weight: Number,
    equipment: String,
    targetMuscles: String,
  });
  const Workouts = mongoose.model('Workouts', workoutsSchema);

module.exports = Workouts;
