import React, { useState, useEffect } from 'react';
import { fetchData, createItem, updateItem, deleteItem } from './api'; // Assuming the file name is api.js
import './App.css'



const SearchBar = ({ value, onChange, onSearch }) => (
  <div>
    <input type="text" value={value} onChange={onChange} placeholder="Search exercises" />
    <button onClick={onSearch}>Search</button>
  </div>
);

const ExerciseTable = ({ exercises, onEdit, onDelete }) => (
  <table>
    <thead>
    <tr>
      <th>Name</th>
      <th>Target Muscles</th>
      <th>Last Done</th>
      <th>Single Set Record (lbs/reps)</th>
      <th>Equipment</th>
      <th>Actions</th>
    </tr>
    </thead>
    <tbody>
    {exercises.map((exercise) => (
      <tr key={exercise._id}>
        <td>{exercise.name}</td>
        <td>{exercise.targetMuscles}</td>
        <td>{new Date(exercise.lastDone).toLocaleDateString()}</td>
        <td>{exercise.SSR}</td>
        <td>{exercise.Equipment}</td>
        <td>
          <button onClick={() => onEdit(exercise)}>Edit</button>
          <button onClick={() => onDelete(exercise._id)}>Delete</button>
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

const ExerciseForm = ({ onSave, onCancel, initialExercise }) => {
  const [exercise, setExercise] = useState(initialExercise);

  useEffect(() => {
    setExercise(initialExercise);
  }, [initialExercise]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExercise({ ...exercise, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(exercise);
  };

  return (
    <form onSubmit={handleSubmit} className="exercise-form">
      <input name="name" value={exercise.name} onChange={handleChange} placeholder="Name" required />
      <input name="targetMuscles" value={exercise.targetMuscles} onChange={handleChange} placeholder="Target Muscles" required />
      {/* <input type="date" name="lastDone" value={exercise.lastDone.split('T')[0]} onChange={handleChange} placeholder="Last Done" required />
      <input name="SSR" type="number" value={exercise.SSR} onChange={handleChange} placeholder="SSR" required /> */}
      <input name="Equipment" value={exercise.Equipment} onChange={handleChange} placeholder="Equipment" required />
      <div className="form-actions">
        <Button type="submit">Save</Button>
        <Button onClick={onCancel}>Cancel</Button>
      </div>
    </form>
  );
};

const App = () => {
  const [exercises, setExercises] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingExercise, setEditingExercise] = useState(null);
  const selectedTable = 'Exercise'; // Assuming 'exercise' is the path for your exercises API

  useEffect(() => {
    fetchExercises();
  }, []);

  const fetchExercises = async () => {
    try {
      const data = await fetchData(selectedTable);
      setExercises(data);
    } catch (error) {
      console.error('Error fetching exercises:', error);
    }
  };

  const handleSearch = async () => {
    // You'll need to adjust or add the appropriate API endpoint for search functionality
  };

  const handleAddExercise = async (newExercise) => {
    try {
      await createItem(selectedTable, newExercise);
      fetchExercises();
    } catch (error) {
      console.error('Error adding exercise:', error);
    }
  };

  const handleSaveExercise = async (editedExercise) => {
    try {
      if (editingExercise && editingExercise.id) {
        await updateItem(selectedTable, editedExercise);
      } else {
        await handleAddExercise(editedExercise);
      }
      setEditingExercise(null);
      fetchExercises();
    } catch (error) {
      console.error('Error saving exercise:', error);
    }
  };

  const handleDeleteExercise = async (exerciseId) => {
    try {
      await deleteItem(selectedTable, exerciseId);
      fetchExercises();
    } catch (error) {
      console.error('Error deleting exercise:', error);
    }
  };

  return (
    <div className="app">
      <h1 style={{fontFamily:"Roboto"}}>GYM WORKOUT TRACKER</h1>
      <SearchBar value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} onSearch={handleSearch} />
      <Button onClick={() => setEditingExercise({ name: '', targetMuscles: '', lastDone: '', SSR: '', Equipment: '' })}>
        Add Exercise
      </Button>
      {editingExercise && (
        <ExerciseForm
          initialExercise={editingExercise}
          onSave={handleSaveExercise}
          onCancel={() => setEditingExercise(null)}
        />
      )}
      <ExerciseTable exercises={exercises} onEdit={setEditingExercise} onDelete={handleDeleteExercise} />
    </div>
  );
};

export default App;