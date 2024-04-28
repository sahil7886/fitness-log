const Workouts = require('../models/workouts');

exports.getWorkouts = async (req, res) => {
  const Workouts = await Workouts.find();
  res.json(Workouts);
};

exports.addWorkouts = async (req, res) => {
  const newWorkouts = new Workouts(req.body);
  await newWorkouts.save();
  res.send(newWorkouts);
};

exports.updateWorkouts = async (req, res) => {
  try {
    const updatedWorkouts = await Workouts.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedWorkouts) {
      return res.status(404).send('Workouts not found');
    }
    res.json(updatedWorkouts);
  } catch (error) {
    res.status(400).send(`Error updating Workouts: ${error.message}`);
  }
};

exports.deleteWorkouts = async (req, res) => {
  try {
    const deletedWorkouts = await Workouts.findByIdAndRemove(req.params.id);
    if (!deletedWorkouts) {
      return res.status(404).send('Workouts not found');
    }
    res.send(`Workouts deleted successfully: ${deletedWorkouts.name}`);
  } catch (error) {
    res.status(400).send(`Error deleting Workouts: ${error.message}`);
  }
};
