//modules
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");

// app
const app = express();
// port
const port = process.env.PORT || 8080;

// middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));

// db
mongoose
	.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("Database Connected.."))
	.catch((err) => console.log("Failed to connect:", err));

  
// routes
const Workouts = require('./routes/workouts')
app.use('/', Workouts);

// listener
const server = app.listen(port, () =>
	console.log(`Server is running on port ${port}`)
);