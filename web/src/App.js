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
import RecentReleased from './pages/RecentReleased';
import TopRated from './pages/TopRated';
import PopularMovies from './pages/PopularMovies';
import WishListPage from './pages/WishListPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={HomePage} exact/>
        <Route path="/recentReleased" component={RecentReleased} exact/>
        <Route path="/topRated" component={TopRated} exact/>
        <Route path="/popularMovies" component={PopularMovies} exact/>
        <Route path="/welcome" component={HomePage} />
        <Route path="/browse" component = {NotFoundPage} />
        <Route path="/wishlist/:userId" component={WishListPage} />
        <Route path="/myprofile" component = {NotFoundPage} />
        <Route path="/login" component = {Login} />
        <Route path="/signup" component = {SignUpPage} />
        <Route path="/movieDetails/:movieId" component = {MovieDetails} />
        <Route component = {NotFoundPage} />
      </Switch>
    </Router>
  );
}

export default App;
