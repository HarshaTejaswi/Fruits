// src/components/FruitList.js
import React, { useEffect, useState } from 'react';
import { getFruits, addFruits, removeFruits, updateFruitQuantity } from '../api';

const FruitList = () => {
  const [fruits, setFruits] = useState([]);
  const [newFruit, setNewFruit] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      console.log('Fetching fruits...');
      try {
        const result = await getFruits();
        console.log('Fruits fetched:', result);
        setFruits(result);
      } catch (error) {
        console.error('Failed to fetch fruits:', error);
      }
    };
    fetchData();
  }, []);

  const handleAddFruit = async (e) => {
    e.preventDefault();
    if (newFruit.trim()) {
      console.log('Attempting to add fruit:', newFruit);
      try {
        const result = await addFruits([newFruit]);
        console.log('Fruit added:', result);
        if (result && result.ids) {
          const newFruits = result.ids.map(id => ({ id, name: newFruit }));
          setFruits([...fruits, ...newFruits]);
          setNewFruit('');
        }
      } catch (error) {
        console.error('Error adding fruit:', error);
      }
    }
  };

  const handleRemoveFruit = async (id) => {
    console.log('Attempting to remove fruit with ID:', id);
    try {
      const result = await removeFruits([id]);
      console.log('Fruit removed:', result);
      setFruits(fruits.filter(fruit => fruit.id !== id));
    } catch (error) {
      console.error('Error removing fruit:', error);
    }
  };

  const handleUpdateQuantity = async (id, quantity) => {
    console.log('Attempting to update quantity of fruit with ID:', id);
    try {
      const result = await updateFruitQuantity(id, quantity);
      console.log('Quantity updated:', result);
      setFruits(fruits.map(fruit => fruit.id === id ? { ...fruit, quantity } : fruit));
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  return (
    <div>
      <ul>
        {fruits.map(fruit => (
          <li key={fruit.id}>
            {fruit.name} (Quantity: {fruit.quantity || 1})
            <button onClick={() => handleRemoveFruit(fruit.id)}>Remove</button>
            <input
              type="number"
              value={fruit.quantity || 1}
              onChange={(e) => handleUpdateQuantity(fruit.id, parseInt(e.target.value))}
            />
          </li>
        ))}
      </ul>
      <form onSubmit={handleAddFruit}>
        <input
          type="text"
          value={newFruit}
          onChange={(e) => setNewFruit(e.target.value)}
          placeholder="Add new fruit"
        />
        <button type="submit">Add Fruit</button>
      </form>
    </div>
  );
};

export default FruitList;
