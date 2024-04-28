import React, { useState, useEffect } from 'react';
//TODO: Assume these functions are implemented in 'api.js'
import { fetchData, createItem, updateItem, deleteItem } from '../api'; 
import ItemForm from './itemform';

const TableView = ({ selectedTable }) => {
  const [items, setItems] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    fetchData(selectedTable).then(setItems);
  }, [selectedTable]);

  const handleDelete = (id) => {
    deleteItem(selectedTable, id).then(() => {
      setItems(items.filter(item => item.id !== id));
    });
  };

  const handleCreateOrUpdate = (item) => {
    const action = item.id ? updateItem : createItem;
    action(selectedTable, item).then(updatedItem => {
      if (item.id) {
        setItems(items.map(it => it.id === updatedItem.id ? updatedItem : it));
      } else {
        setItems([...items, updatedItem]);
      }
      setEditingItem(null);
      setIsCreating(false);
    });
  };

  return (
    <div>
      <button onClick={() => setIsCreating(true)}>Add New</button>
      {isCreating && <ItemForm onSave={handleCreateOrUpdate} onCancel={() => setIsCreating(false)} selectedTable={selectedTable} />}
      {editingItem && <ItemForm item={editingItem} onSave={handleCreateOrUpdate} onCancel={() => setEditingItem(null)} selectedTable={selectedTable} />}
      {items.map(item => (
        <div key={item.id}>
          <p>{item.name} - Details...</p>
          <button onClick={() => setEditingItem(item)}>Edit</button>
          <button onClick={() => handleDelete(item.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default TableView;
