import React, { useState, useEffect } from 'react';

// Simulated schema object based on your Mongoose schema
// This could also be passed as a prop if you have different forms with different schemas
const schemas = {
  exercise: {
    name: 'String',
    targetMuscles: 'String',
    lastDone: 'Date',
    SSR: 'Number',
    Equipment: 'String'
  },
  workout: {
    exercise: 'String',
    reps: 'Number',
    weight: 'Number',
    setNo: 'Number'
  },
  workouts: {
    date: 'Date',
    duration: 'Number',
    exercises: 'Number',
    sets: 'Number',
    volume: 'Number'
  }
};

// Mapping from schema types to input types
const inputTypeMap = {
  String: 'text',
  Number: 'number',
  Date: 'date',
};

const ItemForm = ({ item = {}, onSave, onCancel, selectedTable }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    // Initialize formData based on the selected schema
    const schema = schemas[selectedTable];
    setFormData(Object.keys(schema).reduce((acc, key) => ({
      ...acc,
      [key]: item[key] || '',
    }), {}));
  }, [selectedTable, item]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const selectedSchema = schemas[selectedTable] || {};

  return (
    <form onSubmit={handleSubmit}>
      {Object.keys(selectedSchema).map(key => (
        <input
          key={key}
          type={inputTypeMap[selectedSchema[key]] || 'text'}
          name={key}
          value={formData[key]}
          onChange={handleChange}
          placeholder={key.charAt(0).toUpperCase() + key.slice(1)} // Capitalize the placeholder
        />
      ))}
      <button type="submit">Save</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
};

export default ItemForm;