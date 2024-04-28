const Workout = require('../models/workout');

exports.getWorkout = async (req, res) => {
  const Workout = await Workout.find();
  res.json(Workout);
};

exports.addWorkout = async (req, res) => {
  const newWorkout = new Workout(req.body);
  await newWorkout.save();
  res.send(newWorkout);
};

exports.updateWorkout = async (req, res) => {
  try {
    const updatedWorkout = await Workout.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedWorkout) {
      return res.status(404).send('Workout not found');
    }
    res.json(updatedWorkout);
  } catch (error) {
    res.status(400).send(`Error updating Workout: ${error.message}`);
  }
};

exports.deleteWorkout = async (req, res) => {
  try {
    const deletedWorkout = await Workout.findByIdAndRemove(req.params.id);
    if (!deletedWorkout) {
      return res.status(404).send('Workout not found');
    }
    res.send(`Workout deleted successfully: ${deletedWorkout.name}`);
  } catch (error) {
    res.status(400).send(`Error deleting Workout: ${error.message}`);
  }
};
