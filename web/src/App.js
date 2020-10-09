import React from 'react';
import{
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import './App.css';
import NotFoundPage from './pages/NotFoundPage';
import SignUpPage from './pages/SignUpPage';
import MovieDetails from './pages/MovieDetails'
import HomePage from './pages/HomePage';
import Login from './pages/Login';


function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={HomePage} exact/>
        <Route path="/welcome" component={HomePage} />
        <Route path="/browse" component = {NotFoundPage} />
        <Route path="/wishlist" component={HomePage} />
        <Route path="/myprofile" component = {NotFoundPage} />
        <Route path="/login" component = {Login} />
        <Route path="/signup" component = {SignUpPage} />
        <Route path="/movieDetails" component = {MovieDetails} />
      </Switch>
    </Router>
  );
}

export default App;
