import React, { useState } from 'react';
import Login from './components/Login';
import FruitList from './components/FruitList';

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  return (
    <div>
      {!authenticated ? (
        <Login setAuthenticated={setAuthenticated} />
      ) : (
        <FruitList />
      )}
    </div>
  );
}

export default App;
