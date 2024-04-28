const express = require('express');
const router = express.Router();

//controllers
const { getWorkouts, addWorkouts, updateWorkouts, deleteWorkouts } = require('../controllers/workoutsController');

//api routes
router.get('/getWorkouts', getWorkouts);
router.post('/addWorkouts', addWorkouts);
router.put('/updateWorkouts/:id', updateWorkouts);
router.delete('/deleteWorkouts/:id', deleteWorkouts);

module.exports = router;
