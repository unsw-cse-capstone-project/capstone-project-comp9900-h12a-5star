import React, { Component } from 'react';
import { Button, Container, Grid, Header, Icon, Image, Divider, Message} from 'semantic-ui-react';
import {
    Link,
  } from "react-router-dom";

export default class WishListPage extends Component {

    //Constructor called at the time of page load
    constructor() {
        super();
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
        if (window.sessionStorage.getItem('username') === null){
            window.sessionStorage.setItem('username', 'guest');
        }
        this.user = window.sessionStorage.getItem('username')
    }

    // function called when the components are loaded onto the page.It gets executed right after the constructor.
    // Performs an operation to pull the wish list from the database.
    componentDidMount() {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: this.user, reviewerUsername: this.props.match.params.userId })
        };

        fetch("http://127.0.0.1:8000/api/viewWishlist/", requestOptions)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    // Removes the movie from the state so that it is instantly loaded on the page and a refresh is not required.
    revoveElement = (val) => {
        delete this.state.items[this.state.items.indexOf(val)]
        this.setState({item: this.state.items})
        var len = 0
        this.state.items.map(()=>
            len = len+1
        )
        if (len === 0){
            window.location.reload(false)
        }
        
    }

    // remove a movie from wishlist and send the request to the database
    removeFromWishlist = (val) => {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ movieId: val.movieID, username: this.user, wishlist: false})
        };

        fetch("http://127.0.0.1:8000/api/addWishlist/", requestOptions)
        this.revoveElement(val)
    }

    render() {

        // Redirect the user to login page if they are not logged in yet.
        if (this.props.match.params.userId === "guest"){
            window.location.href='/login'
        }

        return (
            <>
                <Container>
                    {/* title section of the application */}
                    <Divider horizontal></Divider>
                    <Divider horizontal>
                    <Header as='h1'>
                        {this.props.match.params.userId.charAt(0).toUpperCase() + this.props.match.params.userId.slice(1)}'s Wishlist
                    </Header>
                    </Divider>
                    {/* Wish list is loaded dynamically from the data received from the database */ }
                    {
                            (this.state.items.length !== 0) ?
                            <Grid columns='equal' divided={'vertically'}>
                                {
                                    this.state.items.map((item) =>
                                        <Grid.Row>
                                            <Grid.Column width={2}>
                                                <Image src={item.poster} size='tiny' />
                                            </Grid.Column>
                                            <Grid.Column width={2}>
                                                <br />
                                                <Icon name='star' color={"yellow"} /> {item.avgRating} <br /><br />
                                                <Icon name='chart pie' color={(item.tmdbRating >4) ? 'green' : ((item.tmdbRating >2.5) ? 'yellow' : 'orange')} />  {item.tmdbRating * 20}% <br /><br />
                                                <Icon name='calendar alternate outline' /> {item.release_date.substring(0, 4)}
                                            </Grid.Column>
                                            <Grid.Column width={8}>
                                                <p>
                                                    <br /><br />
                                                </p>
                                                <Link style={{ color: 'black', fontSize: 24 }} className="MovieDetails" key={item.movieID} to={`/movieDetails/${item.movieID}`}>
                                                    {item.title}
                                                </Link>
                                            </Grid.Column>
                                            <Grid.Column>
                                                <p>
                                                    <br />
                                                    <br />
                                                </p>
                                                {
                                                    (this.props.match.params.userId === window.sessionStorage.getItem('username')) ?
                                                        <Button circular floated='right' color='red' icon='close' onClick={() => this.removeFromWishlist(item)} />
                                                        :
                                                        <Button primary floated='right'><Link style={{ color: '#FFF' }} className="MovieDetails" key={item.movieID} to={`/movieDetails/${item.movieID}`}>
                                                            View Details
                                        </Link><Icon name='right chevron' />  </Button>
                                                }
                                            </Grid.Column>
                                        </Grid.Row>
                                    )
                                }  
                    </Grid>
                    :
                    <Message>
                        {/* Message incase there are no movies in wishlist */}
                        <Message.Header>Opps...It's time to create a wishlist!</Message.Header>
                        <p>
                            Go ahead and add items to your wishlist.
                        </p>
                    </Message>
                }
                </Container> 
            </>
        )
    }
}