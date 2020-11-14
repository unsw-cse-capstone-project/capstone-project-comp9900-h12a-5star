import React, { Component } from 'react';
import { Button, Container, Grid, Header, Icon, Image, Divider, Message} from 'semantic-ui-react';
import {
    Link,
  } from "react-router-dom";

export default class WatchListPage extends Component {

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
            body: JSON.stringify({ username: this.user})
        };

        fetch("http://127.0.0.1:8000/api/watchMovie/", requestOptions)
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
        delete this.state.items.data[this.state.items.data.indexOf(val)]
        console.log(this.state.items.data)
        // this.state.items = this.state.items
        this.setState({item: this.state.items.data})
        var len = 0
        this.state.items.data.map(()=>
            len = len+1
        )
        if (len === 0){
            window.location.reload(false)
        }
        
    }
    removeFromWatchlist = (val) => {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            // body: JSON.stringify({ id: this.props.match.params.movieId, user: this.user })
            body: JSON.stringify({ username: this.user,movieID: val.movieID, movieStatus: false})
        };

        fetch("http://127.0.0.1:8000/api/watchMovie/", requestOptions)
        this.revoveElement(val)
        // window.location.reload(false
    }

    render() {

        if (this.props.match.params.userId === "guest"){
            window.location.href='/login'
        }

        return (
            <>
                <Container>
                    {/* <Header as='h1'>{this.props.match.params.userId}'s Wishlist</Header> */}
                    <Divider horizontal></Divider>
                    <Divider horizontal>
                    <Header as='h1'>
                        {this.props.match.params.userId.charAt(0).toUpperCase() + this.props.match.params.userId.slice(1)}'s Watchlist
                    </Header>
                    </Divider>
                    {
                    (this.state.items.data && this.state.items.data.length !== 0)?
                    <Grid columns='equal' divided={'vertically'}>
                        {
                            this.state.items.data.map((item)=>
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
                                    <p><br /></p>
                                    <Button circular floated='right' color='red' icon='close' onClick={()=>this.removeFromWatchlist(item)} />
                                    
                            </Grid.Column>
                        </Grid.Row>
                            )
                        }
                        
                    </Grid>
                    :
                    <Message>
                        <Message.Header>There are no items in your watchlist yet!</Message.Header>
                        <p>
                            Go ahead and add items to your watchlist.
                        </p>
                    </Message>
                }
                </Container>
                
                
            </>

        )
    }

}