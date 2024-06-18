import React, { useEffect, useState } from 'react';

function FruitList() {
  const [fruits, setFruits] = useState([]);

  useEffect(() => {
    async function fetchFruits() {
      const response = await fetch('http://localhost:8000/fruits');
      const data = await response.json();
      setFruits(data);
    }
    fetchFruits();
  }, []);

  return (
    <div>
      <h1>Fruits</h1>
      <ul>
        {fruits.map((fruit) => (
          <li key={fruit.id}>{fruit.name}: {fruit.description}</li>
        ))}
      </ul>
    </div>
  );
}

export default FruitList;
