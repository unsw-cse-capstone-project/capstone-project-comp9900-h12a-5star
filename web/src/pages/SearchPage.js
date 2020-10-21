import React, { Component } from 'react';
import _ from 'lodash'
import { Container, Header, Divider, Grid, Label, Card, Placeholder } from 'semantic-ui-react';
import NavBar from '../components/NavBar';
import MovieTile from '../components/MovieTile';


export default class SearchPage extends Component {

    constructor() {
        super();
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            url: "http://image.tmdb.org/t/p/w780//riYInlsq2kf1AWoGm80JQW5dLKp.jpg"
        };
    }

    componentDidMount() {
        fetch("http://127.0.0.1:8000/api/search/?query=action")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result
                    });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }
    
    render() {
        var movieLength=1;
        var genreLength=1;
        var descLength=1;
        var columnsMovie = null
        var columnsGenre = null
        var columnsDesc = null
        if (this.state.items.name_result || this.state.items.genre_result || this.state.items.description_result ){
            if (this.state.items.name_result){
                movieLength = this.state.items.name_result.length;
            }
            else{
                movieLength=0;
            }
            if (this.state.items.genre_result){
                genreLength = this.state.items.genre_result.length;
            }
            else{
                genreLength=0;
            }
            if (this.state.items.description_result){
                descLength = this.state.items.description_result.length;
            }
            else{
                descLength=0;
            }   
        }
        if (this.state.isLoaded === true){
            if (this.state.items.name_result || this.state.items.genre_result || this.state.items.description_result ){
                console.warn('abc')
            }
            else{
                movieLength=0
                genreLength=0
                descLength=0
            }
        }
        var flag=0;
        if (movieLength>0 || genreLength>0 || descLength>0){
            flag=1;
        }
            
       
        
        // this.state.items.name_result[0].title
        if (this.state.items.name_result || this.state.items.genre_result || this.state.items.description_result){
            if (this.state.items.name_result) {
                columnsMovie = _.times(4, (i) => (
                    <Grid.Column key={i}>
                        <MovieTile 
                            title={this.state.items.name_result[i].title} 
                            poster={this.state.items.name_result[i].poster} 
                            release={this.state.items.name_result[i].release_date} 
                            rating={this.state.items.name_result[i].rating} 
                            description={this.state.items.name_result[i].description} 
                            movieId={this.state.items.name_result[i].id} 
                        />
                    </Grid.Column>
                ))
            }
            if (this.state.items.genre_result){
                columnsGenre = _.times(4, (i) => (

                    <Grid.Column key={i}>
                        <MovieTile 
                            title={this.state.items.genre_result[i].title} 
                            poster={this.state.items.genre_result[i].poster} 
                            release={this.state.items.genre_result[i].release_date} 
                            rating={this.state.items.genre_result[i].rating} 
                            description={this.state.items.genre_result[i].description} 
                            movieId={this.state.items.genre_result[i].id}
                        />
                    </Grid.Column>

                ))
            }  
            if (this.state.items.description_result){
                columnsDesc = _.times(4, (i) => (
                    <Grid.Column key={i}>
                        <MovieTile 
                            title={this.state.items.description_result[i].title} 
                            poster={this.state.items.description_result[i].poster} 
                            release={this.state.items.description_result[i].release_date} 
                            rating={this.state.items.description_result[i].rating} 
                            description={this.state.items.description_result[i].description} 
                            movieId={this.state.items.description_result[i].id}
                        />
                    </Grid.Column>
                ))
            }
        }
        else{

            columnsMovie = _.times(4, (i) => (
                <Grid.Column key={i}>
                    <Card.Group>
                        <Card>
                            <Placeholder>
                                <Placeholder.Image square />
                            </Placeholder>
                        </Card>
                        <Card.Content>
                            <Placeholder>
                                <Placeholder.Header>
                                    <Placeholder.Line length='very short' />
                                    <Placeholder.Line length='medium' />
                                </Placeholder.Header>
                                <Placeholder.Paragraph>
                                    <Placeholder.Line length='short' />
                                </Placeholder.Paragraph>
                            </Placeholder>
                        </Card.Content>
                    </Card.Group>
                </Grid.Column>
            ))
            columnsGenre = _.times(4, (i) => (

                <Grid.Column key={i}>
                    <Card.Group>
                        <Card>
                            <Placeholder>
                                <Placeholder.Image square />
                            </Placeholder>
                        </Card>
                        <Card.Content>
                            <Placeholder>
                                <Placeholder.Header>
                                    <Placeholder.Line length='very short' />
                                    <Placeholder.Line length='medium' />
                                </Placeholder.Header>
                                <Placeholder.Paragraph>
                                    <Placeholder.Line length='short' />
                                </Placeholder.Paragraph>
                            </Placeholder>
                        </Card.Content>
                    </Card.Group>
                </Grid.Column>

            ))
            columnsDesc = _.times(4, (i) => (
                <Grid.Column key={i}>
                    <Card.Group>
                        <Card>
                            <Placeholder>
                                <Placeholder.Image square />
                            </Placeholder>
                        </Card>
                        <Card.Content>
                            <Placeholder>
                                <Placeholder.Header>
                                    <Placeholder.Line length='very short' />
                                    <Placeholder.Line length='medium' />
                                </Placeholder.Header>
                                <Placeholder.Paragraph>
                                    <Placeholder.Line length='short' />
                                </Placeholder.Paragraph>
                            </Placeholder>
                        </Card.Content>
                    </Card.Group>
                </Grid.Column>
            ))

        }
        
        return (
            <React.Fragment>
                <NavBar />
                
                <Container style={{ margin: 20 }}>
                { flag == 1  && 
                    <Grid.Column>
                        <Header as='h1'>Search Results: "action"</Header>
                        <Divider section />
                    </Grid.Column>
                }
                { movieLength > 0  &&
                    <Grid columns="equal">
                        <Grid.Column>
                            <Header as='h1'>Movie Title</Header>
                        </Grid.Column>
                        <Grid.Column>
                            <Label as='a' color='blue' ribbon='right' onClick={event => window.location.href = '/searchMovieTitle'}>
                                see more
                            </Label>
                        </Grid.Column>
                    </Grid>

                }
                { movieLength > 0 &&
                    <Grid columns='equal'>{columnsMovie}</Grid>
                }
                { movieLength > 0 &&
                    <Divider section />
                }

                { genreLength > 0  &&
                    <Grid columns="equal">
                        <Grid.Column>
                            <Header as='h1'>Genre</Header>
                        </Grid.Column>
                        <Grid.Column>
                            <Label as='a' color='blue' ribbon='right' onClick={event => window.location.href = '/recentReleased'}>
                                see more
                            </Label>
                        </Grid.Column>
                    </Grid>
                } 
                {  genreLength > 0 &&
                    <Grid columns='equal'>{columnsGenre}</Grid>
                }
                {   genreLength > 0 &&
                    <Divider section />
                }
                { descLength > 0 &&
                    <Grid columns="equal">
                        <Grid.Column>
                            <Header as='h1'>Description</Header>
                        </Grid.Column>
                        <Grid.Column>
                            <Label as='a' color='blue' ribbon='right' onClick={event => window.location.href = '/popularMovies'}>
                                see more
                            </Label>
                        </Grid.Column>
                    </Grid>
                }
                { descLength > 0 &&
                    <Grid columns='equal'>{columnsDesc}</Grid>
                }
                {movieLength == 0 && genreLength == 0 && descLength == 0 &&
              
                    <Grid.Column>
                        <Header as='h1'>No Search Results Found! Please search with other keyword.</Header>
                        
                    </Grid.Column>
                }
                </Container>
            </React.Fragment>
        )
    }
}