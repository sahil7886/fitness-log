const express = require('express');
const router = express.Router();

//controllers
const { getExercise, addExercise, updateExercise, deleteExercise } = require('../controllers/exerciseController');

//api routes
router.get('/getExercise', getExercise);
router.post('/addExercise', addExercise);
router.put('/updateExercise/:id', updateExercise);
router.delete('/deleteExercise/:id', deleteExercise);

module.exports = router;