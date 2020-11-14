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
import SearchDetails from './pages/SearchDetails';
import ProfilePage from './pages/ProfilePage';
import WatchListPage from './pages/WatchListPage';
import BannedUsers from './pages/BannedUsers';
import SignUp from './pages/SignUp';
import BrowsePage from './pages/BrowsePage';
import NavBar from './components/NavBar';
import WelcomeCategory from './pages/WelcomeCategory';
import FollowUserPage from './pages/FollowUserPage';
import MovieCategory from './pages/MovieCategory';


function App() {
  return (
    <>
    <Router>
    <NavBar />
      <Switch>
        <Route path="/" component={HomePage} exact/>
        <Route path="/welcome" component={HomePage} exact/>
        <Route path="/welcome/:category" component={WelcomeCategory} exact/>
        <Route path="/FollowUser/:userId" component={FollowUserPage} exact />
        <Route path="/browse" component = {BrowsePage} />
        <Route path="/wishlist/:userId" component={WishListPage} />
        <Route path="/watchlist/:userId" component={WatchListPage} />
        <Route path="/bannedlist/:userId" component={BannedUsers} />
        <Route path="/myprofile" component = {ProfilePage} />
        <Route path="/login" component = {Login} />
        <Route path="/signup" component = {SignUp} />
        <Route path="/search/:searchText" component = {SearchPage} />
        <Route path="/searchDetails/:searchCategory/:searchText" component = {SearchDetails} />
        <Route path="/movieDetails/:movieId" component = {MovieDetails} />
        <Route path="/movieDetails/:category" component={MovieCategory} exact/>
        <Route component = {NotFoundPage} />
      </Switch>
    </Router>
    </>
  );
}

export default App;
