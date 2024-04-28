import React, { useState, useEffect } from 'react';
import { fetchData, createItem, updateItem, deleteItem } from './api'; // Assuming the file name is api.js
import './App.css'

const SearchBar = ({ value, onChange, onSearch }) => (
  <div>
    <input type="text" value={value} onChange={onChange} placeholder="Search workouts" />
    <button onClick={onSearch}>Search</button>
  </div>
);

const FilterDropdowns = ({ workouts, onFilterChange, filters }) => {
  const uniqueNames = [...new Set(workouts.map(workout => workout.name))];
  const uniqueEquipment = [...new Set(workouts.map(workout => workout.equipment))];
  const uniqueDates = [...new Set(workouts.map(workout => new Date(workout.date).toLocaleDateString()))];

  return (
    <div>
      <select value={filters.name} onChange={e => onFilterChange('name', e.target.value)}>
        <option value="">Select Name</option>
        {uniqueNames.map(name => (
          <option key={name} value={name}>{name}</option>
        ))}
      </select>
      <select value={filters.equipment} onChange={e => onFilterChange('equipment', e.target.value)}>
        <option value="">Select Equipment</option>
        {uniqueEquipment.map(equipment => (
          <option key={equipment} value={equipment}>{equipment}</option>
        ))}
      </select>
      <select value={filters.date} onChange={e => onFilterChange('date', e.target.value)}>
        <option value="">Select Date</option>
        {uniqueDates.map(date => (
          <option key={date} value={date}>{date}</option>
        ))}
      </select>
    </div>
  );
};


const Table = ({ workouts, onEdit, onDelete }) => (
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Date</th>
        <th>Duration (minutes)</th>
        <th>Sets</th>
        <th>Reps</th>
        <th>Weight (lbs)</th>
        <th>Equipment</th>
        <th>Target Muscles</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {workouts.map((workout) => (
        <tr key={workout._id}>
          <td>{workout.name}</td>
          <td>{new Date(workout.date).toLocaleDateString()}</td>
          <td>{workout.duration}</td>
          <td>{workout.sets}</td>
          <td>{workout.reps}</td>
          <td>{workout.weight}</td>
          <td>{workout.equipment}</td>
          <td>{workout.targetMuscles}</td>
          <td>
            <button onClick={() => onEdit(workout)}>Edit</button>
            <button onClick={() => onDelete(workout._id)}>Delete</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

const Button = ({ children, onClick, className }) => {
  return (
    <button className={`btn ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};

const WorkoutForm = ({ onSave, onCancel, initialWorkout }) => {
  const [workout, setWorkout] = useState(initialWorkout);

  useEffect(() => {
    setWorkout(initialWorkout);
  }, [initialWorkout]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWorkout({ ...workout, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(workout);
  };

  return (
    <form onSubmit={handleSubmit} className="workout-form">
      <input name="name" value={workout.name} onChange={handleChange} placeholder="Name" required />
      <input name="date" value={workout.date} onChange={handleChange} placeholder="Date" required />
      <input name="duration" value={workout.duration} onChange={handleChange} placeholder="Duration" required />
      <input name="sets" value={workout.sets} onChange={handleChange} placeholder="Sets" required />
      <input name="reps" value={workout.reps} onChange={handleChange} placeholder="Reps" required />  
      <input name="weight" value={workout.weight} onChange={handleChange} placeholder="Weight" required />
      <input name="equipment" value={workout.equipment} onChange={handleChange} placeholder="Equipment" required />
      <input name="targetMuscles" value={workout.targetMuscles} onChange={handleChange} placeholder="Target Muscles" required />
      <div className="form-actions">
        <Button type="submit">Save</Button>
        <Button onClick={onCancel}>Cancel</Button>
      </div>
    </form>
  );
};

const App = () => {
  const [workouts, setWorkouts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingWorkout, setEditingWorkout] = useState(null);
  const [showStats, setShowStats] = useState(false);
  const [filters, setFilters] = useState({
    name: '',
    equipment: '',
    date: ''
  });

  const selectedTable = 'Workouts';

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const fetchWorkouts = async () => {
    try {
      const data = await fetchData(selectedTable);
      setWorkouts(data);
    } catch (error) {
      console.error('Error fetching workouts:', error);
    }
  };

  const handleSearch = async () => {
    // You'll need to adjust or add the appropriate API endpoint for search functionality
  };

  const handleAddWorkout = async (newWorkout) => {
    try {
      await createItem(selectedTable, newWorkout);
      fetchWorkouts();
    } catch (error) {
      console.error('Error adding workout:', error);
    }
  };

  const handleSaveWorkout = async (editedWorkout) => {
    try {
      if (editingWorkout && editingWorkout._id) {
        await updateItem(selectedTable, editedWorkout);
      } else {
        await handleAddWorkout(editedWorkout);
      }
      setEditingWorkout(null);
      fetchWorkouts();
    } catch (error) {
      console.error('Error saving workout:', error);
    }
  };

  const handleDeleteWorkout = async (workoutId) => {
    try {
      await deleteItem(selectedTable, workoutId);
      fetchWorkouts();
    } catch (error) {
      console.error('Error deleting workout:', error);
    }
  };

  const handleViewStats = () => {
    // Implement logic to compute or fetch stats based on selected filters
    console.log('Filters:', filters);
    // You might need to call an API or filter the `workouts` state and compute averages
  };

  return (
    <div className="app">
      <h1 style={{fontFamily:"Gill Sans"}}>GYM WORKOUT TRACKER</h1>
      <SearchBar value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} onSearch={handleSearch} />
      <Button onClick={() => setEditingWorkout({name: '', date: '', duration: '', sets: '', reps: '', weight: '', equipment: '', targetMuscles: ''}
      )}> Add Workout </Button>
      <Button onClick={() => setShowStats(!showStats)}>View Stats</Button>
      {showStats && <FilterDropdowns workouts={workouts} filters={filters} onFilterChange={(filter, value) => setFilters({ ...filters, [filter]: value })} />}
      {showStats && <Button onClick={handleViewStats}>Confirm</Button>}
      {editingWorkout && (
        <WorkoutForm
          initialWorkout={editingWorkout}
          onSave={handleSaveWorkout}
          onCancel={() => setEditingWorkout(null)}
        />
      )}
      {!showStats && <Table workouts={workouts} onEdit={(workouts) => setEditingWorkout({...workouts, _id: workouts._id})} onDelete={handleDeleteWorkout} />}
    </div>
  );
};

export default App;