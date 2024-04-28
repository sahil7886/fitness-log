const API_BASE_URL = 'http://localhost:8080';

// Fetch items (GET)
export const fetchData = async (selectedTable) => {
  try {
    const response = await fetch(`${API_BASE_URL}/get${selectedTable}`)
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// Create item (POST)
export const createItem = async (selectedTable, item) => {
  try {
    const response = await fetch(`${API_BASE_URL}/add${selectedTable}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    });
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json(); // Returns the created item
  } catch (error) {
    console.error("Error creating item:", error);
    throw error;
  }
};

// Update item (PUT)
export const updateItem = async (selectedTable, item) => {
  try {
    const response = await fetch(`${API_BASE_URL}/update${selectedTable}/${item._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    });
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json(); // Returns the updated item
  } catch (error) {
    console.error("Error updating item:", error);
    throw error;
  }
};

// Delete item (DELETE)
export const deleteItem = async (selectedTable, itemId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/delete${selectedTable}/${itemId}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Network response was not ok');
    //return await response.json(); // Can return success message or deleted item's details
  } catch (error) {
    console.error("Error deleting item:", error);
    throw error;
  }
};
