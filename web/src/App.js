import React from 'react';
import{
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import './App.css';
import NotFoundPage from './pages/NotFoundPage';
<<<<<<< HEAD
import SignUpPage from './pages/SignUpPage';
=======
import MovieDetails from './pages/MovieDetails'
>>>>>>> master
import HomePage from './pages/HomePage';


function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={HomePage} exact/>
        <Route path="/welcome" component={HomePage} />
        <Route path="/browse" component = {NotFoundPage} />
        <Route path="/wishlist" component={HomePage} />
        <Route path="/myprofile" component = {NotFoundPage} />
        <Route path="/login" component = {NotFoundPage} />
<<<<<<< HEAD
        <Route path="/signup" component = {SignUpPage} />
=======
        <Route path="/movieDetails" component = {MovieDetails} />
>>>>>>> master
      </Switch>
    </Router>
  );
}

export default App;
