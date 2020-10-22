import React, { Component } from 'react';
import _ from 'lodash'
import { Button, Container, Grid, Header, Icon, Image, Divider, Message} from 'semantic-ui-react';
import NavBar from '../components/NavBar';
import {
    Link,
  } from "react-router-dom";

export default class WishListPage extends Component {

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

    revoveElement = (val) => {
        delete this.state.items[this.state.items.indexOf(val)]
        console.log(this.state.items)
        // this.state.items = this.state.items
        this.setState({item: this.state.items})
        var len = 0
        this.state.items.map(()=>
            len = len+1
        )
        if (len === 0){
            window.location.reload(false)
        }
        
    }
    removeFromWishlist = (val) => {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            // body: JSON.stringify({ id: this.props.match.params.movieId, user: this.user })
            body: JSON.stringify({ movieId: val.movieID, username: this.user, wishlist: false})
        };

        fetch("http://127.0.0.1:8000/api/addWishlist/", requestOptions)
        this.revoveElement(val)
        // window.location.reload(false)
    }
   
    
    addToMyWishlist = (val) => {
        this.setState((prevState) => ({ active_wishlist: !prevState.active_wishlist }))

        // this.state.active_wishlist = !this.state.active_wishlist

        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            // body: JSON.stringify({ id: this.props.match.params.movieId, user: this.user })
            body: JSON.stringify({ movieId: val, username: this.user, wishlist: !this.state.items.wishlist})
        };

        // fetch("http://127.0.0.1:8000/api/addWishlist/", requestOptions)
            
            // this.state.items.wishlist = !this.state.items.wishlist
    }

    render() {

        if (this.props.match.params.userId === "guest"){
            window.location.href='/login'
        }

        return (
            <>
                <NavBar />
                <Container>
                    {/* <Header as='h1'>{this.props.match.params.userId}'s Wishlist</Header> */}
                    <Divider horizontal></Divider>
                    <Divider horizontal>
                    <Header as='h1'>
                        {this.props.match.params.userId.charAt(0).toUpperCase() + this.props.match.params.userId.slice(1)}'s Wishlist
                    </Header>
                    </Divider>
                    {
                    (this.state.items.length !== 0)?
                    <Grid columns='equal' divided={'vertically'}>
                        {
                            this.state.items.map((item)=>
                            <Grid.Row>
                                <Grid.Column width={2}>
                                    <Image src={item.poster} size='tiny'  />
                                </Grid.Column>
                                <Grid.Column width={2}>
                                <br/>
                                    <Icon name='star' color={"yellow"}/> {item.rating} <br/><br/>
                                    <Icon name='calendar alternate outline' /> {item.release_date.substring(0,4)}
                                </Grid.Column>
                                <Grid.Column width={8}>
                                <br/><br/>
                                
                                    <Link style={{ color: 'black', fontSize:24}} className="MovieDetails" key={item.movieID} to= {`/movieDetails/${item.movieID}`}>
                                        {item.title}
                                    </Link>
                               
                                    
                                </Grid.Column>
                                <Grid.Column>
                                    <br/><br/>
                                    {
                                        (this.props.match.params.userId === window.sessionStorage.getItem('username'))?
                                            <Button circular floated='right' color='red' icon='close' onClick={()=>this.removeFromWishlist(item)} />
                                            :
                                            <Button primary floated='right'><Link style={{ color: '#FFF'}} className="MovieDetails" key={item.movieID} to= {`/movieDetails/${item.movieID}`}>
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
                        <Message.Header>There are items in your wishlist yet!</Message.Header>
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