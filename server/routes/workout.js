const express = require('express');
const router = express.Router();

//controllers
const { getWorkout, addWorkout, updateWorkout, deleteWorkout } = require('../controllers/workoutController');

//api routes
router.get('/', getWorkout);
router.post('/', addWorkout);
router.put('/', updateWorkout);
router.delete('/', deleteWorkout);

module.exports = router;