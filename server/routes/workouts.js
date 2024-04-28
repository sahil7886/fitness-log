const express = require('express');
const router = express.Router();

//controllers
const { getWorkouts, addWorkouts, updateWorkouts, deleteWorkouts } = require('../controllers/workoutsController');

//api routes
router.get('/', getWorkouts);
router.post('/', addWorkouts);
router.put('/', updateWorkouts);
router.delete('/', deleteWorkouts);

module.exports = router;
