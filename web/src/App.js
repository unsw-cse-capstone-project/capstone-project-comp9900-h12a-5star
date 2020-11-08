import React from 'react';
import{
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import './App.css';
import NotFoundPage from './pages/NotFoundPage';
import MovieDetails from './pages/MovieDetails'
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import WishListPage from './pages/WishListPage';
import SearchPage from './pages/SearchPage';
import SearchMovieTitle from './pages/SearchMovieTitle';
import SearchGenre from './pages/SearchGenre';
import SearchDescription from './pages/SearchDescription';
import ProfilePage from './pages/ProfilePage';
import WatchListPage from './pages/WatchListPage';
import BannedUsers from './pages/BannedUsers';
import SignUp from './pages/SignUp';
import BrowsePage from './pages/BrowsePage';
import NavBar from './components/NavBar';
import WelcomeCategory from './pages/WelcomeCategory';

function App() {
  return (
    <>
    <NavBar />
    <Router>
      <Switch>
        <Route path="/" component={HomePage} exact/>
        <Route path="/welcome" component={HomePage} exact/>
        <Route path="/welcome/:category" component={WelcomeCategory} exact/>
        <Route path="/browse" component = {BrowsePage} />
        <Route path="/wishlist/:userId" component={WishListPage} />
        <Route path="/watchlist/:userId" component={WatchListPage} />
        <Route path="/bannedlist/:userId" component={BannedUsers} />
        <Route path="/myprofile" component = {ProfilePage} />
        <Route path="/login" component = {Login} />
        <Route path="/signup" component = {SignUp} />
        <Route path="/search/:searchText" component = {SearchPage} />
        <Route path="/searchMovieTitle/:searchText" component = {SearchMovieTitle} />
        <Route path="/searchGenre/:searchText" component = {SearchGenre} />
        <Route path="/searchDescription/:searchText" component = {SearchDescription} />
        <Route path="/movieDetails/:movieId" component = {MovieDetails} />
        <Route component = {NotFoundPage} />
      </Switch>
    </Router>
    </>
  );
}

export default App;
