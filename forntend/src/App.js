import React, { useState } from 'react';
import Login from './components/Login';
import FruitList from './components/FruitList';
import AddFruit from './components/AddFruit';

const App = () => {
    const [authenticated, setAuthenticated] = useState(false);

    if (!authenticated) {
        return <Login setAuthenticated={setAuthenticated} />;
    }

    return (
        <div>
            <h1>Fruits List</h1>
            <FruitList />
            <AddFruit />
        </div>
    );
};

export default App;
