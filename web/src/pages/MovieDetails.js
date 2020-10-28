import React, { Component } from 'react';
import _ from 'lodash'
import { Grid, Container, Image, Segment, Icon, List, Button, Comment, Form, Header, Rating , Popup, Label, Message} from 'semantic-ui-react'
import NavBar from '../components/NavBar';

export default class MovieDetails extends Component {

    constructor() {
        super();
        
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            review: "",
            rating: "0"
            
        };
        this.handleReview = this.handleReview.bind(this);
        if (window.sessionStorage.getItem('username') === null){
            window.sessionStorage.setItem('username', 'guest');
            
        }
        this.user = window.sessionStorage.getItem('username')
        
    }

    componentDidMount() {
        if(window.sessionStorage.getItem('username')==="guest"){

            alert("You are not Signed in! Sign up to tell us what do you think about this movie.")
        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: this.props.match.params.movieId, user: this.user })
        };

        fetch("http://127.0.0.1:8000/api/moviedetail", requestOptions)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result,
                        active_like: result.liked,
                        active_seen: result.watched,
                        active_wishlist: result.wishlist
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

    // state = {}
    handleClick_like = () =>{
        this.setState((prevState) => ({ active_like: !prevState.active_like }))

        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            // body: JSON.stringify({ id: this.props.match.params.movieId, user: this.user })
            body: JSON.stringify({ movieId: this.props.match.params.movieId, username: this.user, likeMovie: !this.state.items.liked})
        };

        fetch("http://127.0.0.1:8000/api/likeMovie/", requestOptions)

        this.state.items.liked = !this.state.items.liked
    }
    handleClick_seen = () =>{
        this.setState((prevState) => ({ active_seen: !prevState.active_seen }))
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            // body: JSON.stringify({ id: this.props.match.params.movieId, user: this.user })
            body: JSON.stringify({ username: this.user, movieID: this.props.match.params.movieId, movieStatus: !this.state.items.watched})
        };
        fetch("http://127.0.0.1:8000/api/watchMovie/", requestOptions)

        this.state.items.watched = !this.state.items.watched



    }
    handleClick_wishlist = () =>{
        this.setState((prevState) => ({ active_wishlist: !prevState.active_wishlist }))

        // this.state.active_wishlist = !this.state.active_wishlist

        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            // body: JSON.stringify({ id: this.props.match.params.movieId, user: this.user })
            body: JSON.stringify({ movieId: this.props.match.params.movieId, username: this.user, wishlist: !this.state.items.wishlist})
        };

        fetch("http://127.0.0.1:8000/api/addWishlist/", requestOptions)
            
           
            this.state.items.wishlist = !this.state.items.wishlist
    }
    handleReview = (event) => {   
       this.state.review = event.target.value;

       console.log("Review: "+this.state.review);
       }
     handleRate = (e, { rating, maxRating }) => {
     this.state.rating = rating;
    }
    handle_adding_review = async() => {
        const movie = this.props.match.params.movieId;
        const user = this.user
        const review = this.state.review;
        const rating = this.state.rating;
        if (user!=="guest"){

            const result = await fetch(`http://127.0.0.1:8000/api/addreview`, {
                method: 'post',
                body: JSON.stringify({movie,user,review,rating}),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }



            });
            const body = await result.json();

            if (body.response.status_code === 200){
            

                window.location.href='/movieDetails';
            }
        }
        else{
            window.location.href='/movieDetails';
        }


    

        

        /*console.log("EMail: " + this.state.review);
        console.log("Password: " + this.state.password);*/

    }


    render() {



        const { active_like } = this.state
        const { active_seen } = this.state
        const { active_wishlist } = this.state

        const style = {
            borderRadius: 0,
            opacity: 0.9,
            padding: '2em',
          }

        return (
            
            <React.Fragment>
                < NavBar />
                <Container >
                
                    <Segment > 
                        <Grid columns='equal'   divided={'vertically'} padded style={{margin : 20}}>
                            <Grid.Row >
                                <Grid.Column >
                                    <Header as='h1'>
                                        {this.state.items.title} 
                                </Header>
                                <Icon name='star' color={"yellow"}/> {this.state.items.imdb_rating} 
                                </Grid.Column>
                                    
                                <Grid.Column textAlign={"right"} >
                                        <Button circular icon='thumbs up'  size={'big'} toggle active={active_like} onClick={this.handleClick_like}/>
                                        <Button circular icon='eye'  size={'big'} toggle active={active_seen} onClick={this.handleClick_seen}/>
                                        <Button circular icon='bookmark'  size={'big'} toggle active={active_wishlist} onClick={this.handleClick_wishlist}/>
                                        <Button circular icon='share alternate'  size={'big'}/>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>

                                
                                <Grid.Column >
                                    <List >
                                        
                                        <List.Item as='a'>
                                            <Icon name='calendar alternate outline' />
                                            <List.Content>
                                                <List.Header>Release Date</List.Header>
                                                <List.Description>
                                                {this.state.items.release_date} <br /><br />
                                                </List.Description>
                                            </List.Content>
                                        </List.Item>
                                        <List.Item as='a'>
                                            <Icon name='map outline' />
                                            <List.Content>
                                                <List.Header>Director</List.Header>
                                                <List.Description>
                                                <Label.Group>
                                                    {
                                                        (this.state.items.director)?
                                                            this.state.items.director.map((item) =>
                                                        <Label as='a'>{item}</Label>
                                                        )
                                                        :
                                                        <div></div>
                                                    }
                                                    </Label.Group>
                                                </List.Description>
                                            </List.Content>
                                        </List.Item>
                                        <List.Item as='a'>
                                            <Icon name='film' />
                                            <List.Content>
                                                <List.Header>Producer</List.Header>
                                                <List.Description>
                                                <Label.Group>
                                                    {
                                                        (this.state.items.producer)?
                                                            this.state.items.producer.map((item) =>
                                                        <Label as='a'>{item}</Label>
                                                        )
                                                        :
                                                        <div></div>
                                                    }
                                                    </Label.Group>
                                                </List.Description>
                                            </List.Content>
                                        </List.Item>
                                        <List.Item as='a'>
                                            <Icon name='globe' />
                                            <List.Content>
                                                <List.Header>Genre</List.Header>
                                                <List.Description>
                                                <Label.Group>
                                                {
                                                        (this.state.items.genres)?
                                                            this.state.items.genres.map((item) =>
                                                        <Label as='a'>{item}</Label>
                                                        )
                                                        :
                                                        <div></div>
                                                        
                                                    }
                                                    </Label.Group>
                                                </List.Description>
                                            </List.Content>
                                        </List.Item>
                                        <List.Item as='a'>
                                            <Icon name='address book outline' />
                                            <List.Content>
                                                <List.Header>Cast</List.Header>
                                                <List.Description>
                                                <Label.Group>
                                                {
                                                    
                                                        (this.state.items.cast)?
                                                            this.state.items.cast.map((item) =>
                                                        <Label as='a'>{item}</Label>
                                                        )
                                                        :
                                                        <div></div>
                                                    
                                                    }
                                                    </Label.Group>
                                                </List.Description>
                                            </List.Content>
                                        </List.Item>
                                    </List>
                                    
                                </Grid.Column>
                                <Grid.Column width={4}>
                                    {}
                                    <Image src={`${this.state.items.poster}`} />
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column>
                                    <Header as='h3' >
                                        About the Movie
                                    </Header>
                                    <p>
                                    {this.state.items.description}
                                    </p>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column stretched>
                                <Comment.Group>
                            <Header as='h3' >
                                User Reviews
                        </Header>

                            {
                                (this.state.items.review)?
                                (this.state.items.review.length === 0)?
                                <Message>
                                    <Message.Header>There are no reviews to show yet!</Message.Header>
                                    <p>
                                    Be the first one to review {this.state.items.title}
                                    </p>
                                </Message> : <div></div>
                                :
                                <div></div>
                            }

                            {
                                (this.state.items.review)?
                                _.times(this.state.items.review.length, (j) => (
                                    <Comment>
                                        <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
                                        <Comment.Content>
                                            <Popup trigger={<Comment.Author as='a'>{this.state.items.user[j]}</Comment.Author>} 
                                                    flowing 
                                                    hoverable 
                                                    style={style} 
                                                    inverted 
                                                    position='top center'
                                                    on={['hover', 'click']}>
                                                <Grid columns={3} >
                                                    <Grid.Column textAlign='center' >
                                                        <Button primary onClick={event =>  window.location.href=`/Wishlist/${this.state.items.user[j]}` }>View Wishlist</Button>
                                                    </Grid.Column>
                                                    <Grid.Column textAlign='center'>
                                                        <Button primary>Ban </Button>
                                                    </Grid.Column>
                                                    <Grid.Column textAlign='center'>
                                                        <Button primary>Follow</Button>
                                                    </Grid.Column>
                                                </Grid>
                                            </Popup>
                                            <Comment.Metadata>
                                                <div>{this.state.items.date[j]} {this.state.items.time[j]}</div>
                                            </Comment.Metadata>
                                            <Comment.Text>
                                                <Rating icon='star' defaultRating={this.state.items.rating[j]} maxRating={5} disabled /><br />
                                                {this.state.items.review[j]}
                                            </Comment.Text>
                                            <Comment.Actions>
                                                <Comment.Action>upvote</Comment.Action>
                                                <Comment.Action>downvote</Comment.Action>
                                            </Comment.Actions>
                                        </Comment.Content>
                                    </Comment>
                                ))
                                :
                                <div></div>
                            }

<Form reply>
                                How was this Movie?  <Rating  disabled={window.sessionStorage.getItem('username') === 'guest' ? true: false} onRate={this.handleRate} icon='star' defaultRating={0} maxRating={5}/>
                                <Form> 
                                    <textarea  onChange={(event) => this.handleReview(event)}  placeholder='What do you think about the movie?' disabled={window.sessionStorage.getItem('username') === 'guest' ? true: false}/>
                                <input  value={this.state.review}/>
                            
                            </Form>

                                <Button disabled={window.sessionStorage.getItem('username') === 'guest' ? true: false} onClick={this.handle_adding_review} content='Add Reply' labelPosition='left' icon='edit' primary />
                            </Form>
                            
                        </Comment.Group>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>



                        

                       


                    </Segment>
                </Container>


            </React.Fragment>
        )
    }
}