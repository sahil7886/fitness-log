const express = require('express');
const router = express.Router();

//controllers
const { getWorkouts, addWorkouts, updateWorkouts, deleteWorkouts, viewStats } = require('../controllers/workoutsController');

//api routes
router.get('/getWorkouts', getWorkouts);
router.post('/addWorkouts', addWorkouts);
router.put('/updateWorkouts/:id', updateWorkouts);
router.delete('/deleteWorkouts/:id', deleteWorkouts);
router.post('/viewStats', viewStats);

module.exports = router;
