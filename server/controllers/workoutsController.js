const Workouts = require('../models/workouts');

exports.getWorkouts = async (req, res) => {
    const workouts = await Workouts.find();
    res.json(workouts);
};

exports.addWorkouts = async (req, res) => {
  console.log("Data to add:", req.body);
  const newWorkouts = new Workouts(req.body);
  await newWorkouts.save();
  res.send(newWorkouts);
};

exports.updateWorkouts = async (req, res) => {
  try {
    const updatedWorkouts = await Workouts.findByIdAndUpdate(req.params.id, req.body, { new: true });
    console.log("Updating ID:", req.params.id);
    console.log("Data to update:", req.body);
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
    console.log("Updating ID:", req.params.id);
    const deletedWorkouts = await Workouts.findByIdAndDelete(req.params.id);
    if (!deletedWorkouts) {
      return res.status(404).send('Workouts not found');
    }
    res.send(`Workouts deleted successfully: ${deletedWorkouts.name}`);
  } catch (error) {
    console.error("Error details:", error);
    res.status(400).send(`Error deleting Workouts: ${error.message}`);
  }
};
