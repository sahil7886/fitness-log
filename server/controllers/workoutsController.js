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
    console.error("Error deleting Workouts:", error);
    res.status(400).send(`Error deleting Workouts: ${error.message}`);
  }
};

exports.viewStats = async (req, res) => {
  try {
    console.log("view stats:", req.body);
    const {name, equipment} = req.body;

    const pipeline = [
      {
        $match: {
          name: name,
          equipment: equipment
        }
      },
      {
        $group: {
          _id: null, // Grouping without specific field, all results are aggregated together
          averageWeight: { $avg: "$weight" },
          averageDuration: { $avg: "$duration" }
        }
      }
    ];
    const stats = await Workouts.aggregate(pipeline);
    if (stats.length == 0) {
      return res.status(404).send('No matches found');
    } else {
      return res.json(stats[0]);
    }
  } catch (error) {
    console.error(`Error fetching stats: ${error.message}`);
    res.status(400).send(`Error deleting Workouts: ${error.message}`);
  }
};
