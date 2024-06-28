// src/components/FruitList.js
import React, { useEffect, useState } from 'react';
import { getFruits, addFruits, removeFruits, updateFruitQuantity } from '../api';
import '../App.css';  // Ensure you have this if your CSS is defined there

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
          const newFruits = result.ids.map(id => ({ id, name: newFruit, quantity: 1 })); // Ensure default quantity
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
    console.log('Attempting to update quantity for fruit:', id);
    try {
      const result = await updateFruitQuantity(id, quantity);
      console.log('Quantity updated:', result);
      setFruits(fruits.map(fruit => fruit.id === id ? { ...fruit, quantity: quantity } : fruit));
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  return (
    <div className="fruit-list-container">
      <ul>
        {fruits.map(fruit => (
          <li className="fruit-item" key={fruit.id}>
            <span className="fruit-name">{fruit.name} (Quantity: {fruit.quantity || 1})</span>
            <button className="button" onClick={() => handleRemoveFruit(fruit.id)}>Remove</button>
            <input
              className="input-field"
              type="number"
              value={fruit.quantity || 1}
              onChange={(e) => handleUpdateQuantity(fruit.id, parseInt(e.target.value))}
            />
          </li>
        ))}
      </ul>
      <form onSubmit={handleAddFruit} className="add-fruit-container">
        <input
          className="add-fruit-input"
          type="text"
          value={newFruit}
          onChange={(e) => setNewFruit(e.target.value)}
          placeholder="Add new fruit"
        />
        <button className="add-fruit-button" type="submit">Add Fruit</button>
      </form>
    </div>
  );
};

export default FruitList;
