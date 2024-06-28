import React, { useState } from 'react';
import Login from './components/Login';
import FruitList from './components/FruitList';
import './App.css';  // Ensure you import your App.css for styling

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  // Add a className to the main div to control its styles centrally
  return (
    <div className="app-container">
      {!authenticated ? (
        <Login setAuthenticated={setAuthenticated} />
      ) : (
        <FruitList />
      )}
    </div>
  );
}

export default App;
