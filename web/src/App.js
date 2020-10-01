import React, { Component } from 'react';
import{
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import './App.css';

import HomePage from './pages/HomePage';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={HomePage} exact/>
      </Switch>
    </Router>
  );
}

export default App;
