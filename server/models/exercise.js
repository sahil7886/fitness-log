const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
    name: String,
    targetMuscles: String,
    lastDone: Date,
    SSR: Number,
    Equipment: String
});
const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;
