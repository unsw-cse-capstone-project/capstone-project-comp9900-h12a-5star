import React, { Component } from 'react';
import{
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import NotFoundPage from './pages/NotFoundPage';

import HomePage from './pages/HomePage';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={HomePage} exact/>
        <Route component = {NotFoundPage} />
      </Switch>
    </Router>
  );
}

export default App;
