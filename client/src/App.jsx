import React, { useState, useEffect } from 'react';
import { fetchData, createItem, updateItem, deleteItem } from './api';
import './App.css';
import logo from './images/dumbbell_colour.png';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { UserCircle } from 'lucide-react';
import ProfilePage from './ProfilePage';

const API_BASE_URL = 'http://localhost:3000';

const SearchBar = ({ value, onChange, onSearch }) => (
  <div className="flex justify-center my-4">
    <input 
      type="text" 
      value={value} 
      onChange={onChange} 
      placeholder="Search workouts" 
      className="p-2 rounded-l bg-gray-700 text-white border-none text-sm pr-6"
    />
    <button 
      onClick={onSearch} 
      className="p-2 bg-purple-600 text-zinc-200 text-sm px-4 rounded-r hover:bg-purple-700 duration-300"
    >
      Search
    </button>
  </div>
);

const FilterDropdowns = ({ workouts, onFilterChange, filters }) => {
  const uniqueNames = [...new Set(workouts.map(workout => workout.name))];
  const uniqueEquipment = [...new Set(workouts.map(workout => workout.equipment))];
  
  return (
    <div className="flex justify-center space-x-4 my-4">
      <select 
        value={filters.name} 
        onChange={e => onFilterChange('name', e.target.value)} 
        className="p-2 bg-gray-700 text-white rounded"
      >
        <option value="">Select Name</option>
        {uniqueNames.map(name => (
          <option key={name} value={name}>{name}</option>
        ))}
      </select>
      <select 
        value={filters.equipment} 
        onChange={e => onFilterChange('equipment', e.target.value)} 
        className="p-2 bg-gray-700 text-white rounded"
      >
        <option value="">Select Equipment</option>
        {uniqueEquipment.map(equipment => (
          <option key={equipment} value={equipment}>{equipment}</option>
        ))}
      </select>
    </div>
  );
};

const Table = ({ workouts, onEdit, onDelete }) => (
  <table className="min-w-full bg-gray-800 text-white">
    <thead>
      <tr>
        {['Name', 'Date', 'Duration (minutes)', 'Sets', 'Reps', 'Weight (lbs)', 'Equipment', 'Target Muscles', 'Actions'].map(header => (
          <th key={header} className="border-b border-gray-600 p-4 text-left font-medium">{header}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {workouts.map((workout) => (
        <tr key={workout._id} className="hover:bg-gray-700 text-sm font-light ml-2 animate-fade-in">
          <td className="p-4">{workout.name}</td>
          <td className="p-4">{new Date(workout.date).toLocaleDateString()}</td>
          <td className="p-4">{workout.duration}</td>
          <td className="p-4">{workout.sets}</td>
          <td className="p-4">{workout.reps}</td>
          <td className="p-4">{workout.weight}</td>
          <td className="p-4">{workout.equipment}</td>
          <td className="p-4">{workout.targetMuscles}</td>
          <td className="p-4 space-x-2">
            <button 
              onClick={() => onEdit(workout)} 
              className="px-2 py-1 bg-blue-500 text-white font-extralight rounded hover:bg-blue-700 duration-200"
            >
              Edit
            </button>
            <button 
              onClick={() => onDelete(workout._id)} 
              className="px-2 py-1 bg-red-700 text-white font-extralight rounded hover:bg-red-800 duration-200"
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

const Button = ({ children, onClick, className }) => {
  return (
    <button 
      className={`px-4 py-2 bg-purple-600 text-white text-sm rounded hover:bg-purple-700 duration-300 ${className} font-normal animate-fade-in`} 
      onClick={onClick}
    >
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
    <form onSubmit={handleSubmit} className="space-y-4 bg-gray-800 p-6 rounded">
      {['name', 'date', 'duration', 'sets', 'reps', 'weight', 'equipment', 'targetMuscles'].map(field => (
        <input 
          key={field}
          name={field}
          value={workout[field]}
          onChange={handleChange}
          placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
          required
          className="w-full p-2 bg-gray-700 text-white rounded"
        />
      ))}
      <div className="flex justify-between">
        <Button type="submit">Save</Button>
        <Button onClick={onCancel} className="bg-gray-600 hover:bg-gray-800">Cancel</Button>
      </div>
    </form>
  );
};

const StatsTable = ({ stats }) => {
  if (!stats) return null;

  return (
    <table className="min-w-full bg-gray-800 text-white animate-fade-in">
      <thead>
        <tr>
          {['Name', 'Equipment', 'Average Weight (lbs)', 'Average Duration (minutes)'].map(header => (
            <th key={header} className="border-b border-gray-600 p-4 text-left">{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr className="hover:bg-gray-700">
          <td className="p-4">{stats.name}</td>
          <td className="p-4">{stats.equipment}</td>
          <td className="p-4">{stats.averageWeight.toFixed(2)}</td>
          <td className="p-4">{stats.averageDuration.toFixed(2)}</td>
        </tr>
      </tbody>
    </table>
  );
};

const App = () => {
  const [workouts, setWorkouts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingWorkout, setEditingWorkout] = useState(null);
  const [showStats, setShowStats] = useState(false);
  const [filters, setFilters] = useState({
    name: '',
    equipment: ''
  });
  const [stats, setStats] = useState(null);

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

  const handleViewStats = async () => {
    console.log('Filters:', filters);
    if (!filters.name || !filters.equipment) {
      alert("Please select all filters before confirming.");
      return;
    }
    try {
      const response = await fetch(`${API_BASE_URL}/viewStats`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: filters.name,
          equipment: filters.equipment
        })
      });
      if (!response.ok) {
        throw new Error('Failed to fetch statistics. Please try again.');
      }
      const data = await response.json();
      console.log('Received stats:', data);
      setStats({ ...data, name: filters.name, equipment: filters.equipment });
    } catch (error) {
      console.error(`Error fetching stats: ${error.message}`);
      alert('Error fetching stats. Please check the console for more details.');
    }
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-gray-100 font-roboto p-6 bg-gradient-to-tl from-black via-zinc-500/10 to-black">
        <div className="relative mb-8">
          <h1 className="text-3xl font-bold text-center pt-8 animate-fade-in">Track your Gym Workouts:</h1>
          <Link to="/profile" className="absolute right-6 top-1/2 transform -translate-y-1/2 text-3xl text-purple-500 hover:text-purple-400">
            <UserCircle size={28}/>
          </Link>
        </div>
        <Routes>
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/" element={
            <>
              <div className="flex justify-center items-center pb-6 animate-fade-in">
                <img src={logo} alt="Logo" className="h-12 hover:animate-pulse" />
              </div>
              <div className='animate-fade-in'>
                <SearchBar value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} onSearch={handleSearch} />
              </div>
              <div className="flex justify-center space-x-4 mb-4 py-6 px-4 ">
                <Button onClick={() => setEditingWorkout({name: '', date: '', duration: '', sets: '', reps: '', weight: '', equipment: '', targetMuscles: ''})}>
                  Add Workout
                </Button>
                <Button onClick={() => setShowStats(!showStats)}>View Stats</Button>
              </div>
              {showStats && <FilterDropdowns workouts={workouts} filters={filters} onFilterChange={(filter, value) => setFilters({ ...filters, [filter]: value })} />}
              {showStats && <Button onClick={handleViewStats} className="block mx-auto my-4">Confirm</Button>}
              {showStats && stats && <StatsTable stats={stats} />}
              {editingWorkout && (
                <WorkoutForm
                  initialWorkout={editingWorkout}
                  onSave={handleSaveWorkout}
                  onCancel={() => setEditingWorkout(null)}
                />
              )}
              {!showStats && <Table workouts={workouts} onEdit={(workouts) => setEditingWorkout({...workouts, _id: workouts._id})} onDelete={handleDeleteWorkout} />}
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
