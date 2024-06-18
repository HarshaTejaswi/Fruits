import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './Login';
import FruitList from './FruitList';
import FruitForm from './FruitForm';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/fruits" component={FruitList} />
        <Route path="/add-fruit" component={FruitForm} />
      </Switch>
    </Router>
  );
}

export default App;
