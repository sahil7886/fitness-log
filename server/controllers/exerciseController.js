const Exercise = require('../models/exercise');

exports.getExercise = async (req, res) => {
  const exercise = await Exercise.find();
  res.json(exercise);
};

exports.addExercise = async (req, res) => {
  const newExercise = new Exercise(req.body);
  await newExercise.save();
  res.send(newExercise);
};

exports.updateExercise = async (req, res) => {
  const { taskId } = req.params;
  const update = new Exercise(req.body);
  try {
    const updatedExercise = await Exercise.findByIdAndUpdate(taskId, update, { new: true });
    if (!updatedExercise) {
      return res.status(404).send('Exercise not found');
    }
    res.json(updatedExercise);
  } catch (error) {
    res.status(400).send(`Error updating exercise: ${error.message}`);
  }
};

exports.deleteExercise = async (req, res) => {
  try {
    const deletedExercise = await Exercise.findByIdAndRemove(req.params.id);
    if (!deletedExercise) {
      return res.status(404).send('Exercise not found');
    }
    res.send(`Exercise deleted successfully: ${deletedExercise.name}`);
  } catch (error) {
    console.log(error); // Log the error for debugging
    res.status(400).send(`Error deleting exercise: ${error.message}`);
  }
};

