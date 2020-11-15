import React, { Component } from 'react';
import _ from 'lodash'
import { Container, Header, Divider, Grid, Label, Card, Placeholder,GridColumn } from 'semantic-ui-react';
import MovieTile from '../components/MovieTile';


export default class SearchPage extends Component {
    //Constructor called at the time of page load
    constructor() {
        super();
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            url: "http://image.tmdb.org/t/p/w780//riYInlsq2kf1AWoGm80JQW5dLKp.jpg"
        };
    }
    // function called when the components are loaded onto the page.It gets executed right after the constructor.
    // Performs an operation to pull the movies based on user search text
    componentDidMount() {
        fetch(`http://127.0.0.1:8000/api/search/?query=${this.props.match.params.searchText}`)
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
    
    render() {
        
        var movieLength=1;
        var genreLength=1;
        var descLength=1;
        var columnsMovie = null
        var columnsGenre = null
        var columnsDesc = null
        //Initialise the variables if movies are returned based on movie name, genre or description
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
        //after page load if movies are not returned then initialise variables are zero. No search results
        if (this.state.isLoaded === true){
            if (this.state.items.name_result || this.state.items.genre_result || this.state.items.description_result ){
                
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
        //variables x,y,a,b,m,n used to display results if exists
        var x = Math.floor(movieLength/4);

        var y= x*4;
        if (movieLength>0 && movieLength<4){
            y=movieLength
        }

        var a = Math.floor(genreLength/4);

        var b= a*4;
        if (genreLength>0 && genreLength<4){
            b=genreLength
        }

        var m = Math.floor(descLength/4);

        var n= m*4;
        if (descLength>0 && descLength<4){
            n=descLength
        }
        //Initialise columnsMovie,columnsGenre and columnsDesc based on movie results returned
        if (this.state.items.name_result || this.state.items.genre_result || this.state.items.description_result){
            if ( movieLength >= 4) {
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
            if( movieLength < 4){
                
                    columnsMovie = _.times(movieLength, (i) => (
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
            if ( genreLength >= 4 ){
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
            if ( genreLength < 4){
                columnsGenre = _.times(genreLength, (i) => (

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
            if ( descLength >= 4){
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
            if ( descLength < 4){
                columnsDesc = _.times(descLength, (i) => (
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
        //On search page load show empty tiles (placeholder)
        //Initialise columnsMovie,columnsGenre and columnsDesc with placeholder value
        else if (movieLength===1 & genreLength===1 & descLength ===1){
            b=5
            y=5
            n=5
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
                <Container style={{ margin: 20 }}>
                { flag === 1  && 
                    <Grid.Column>
                        <Header as='h1'>Search Results: {this.props.match.params.searchText}</Header>
                        <Divider section />
                    </Grid.Column>
                }
                { movieLength > 0  &&
                    <Grid columns="equal">
                        <Grid.Column>
                            <Header as='h1'>Movie Title</Header>
                        </Grid.Column>
                        <Grid.Column>
                            <Label as='a' color='blue' ribbon='right' onClick={event => window.location.href = `/searchDetails/searchMovieTitle/${this.props.match.params.searchText}`}>
                                see more
                            </Label>
                        </Grid.Column>
                    </Grid>

                }

                { movieLength > 0 && y >= 4
                    ? <Grid columns='equal'>{columnsMovie}</Grid>
                    : <Grid columns='equal'>{columnsMovie}
                        <GridColumn></GridColumn>

                        </Grid>
                  
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
                            <Label as='a' color='blue' ribbon='right' onClick={event => window.location.href = `/searchDetails/searchGenre/${this.props.match.params.searchText}`}>
                                see more
                            </Label>
                        </Grid.Column>
                    </Grid>
                } 
                {  genreLength > 0 && b >= 4
                   
                    ? <Grid columns='equal'>{columnsGenre}</Grid>
                    : <Grid columns='equal'>{columnsGenre}
                        <GridColumn></GridColumn>

                        </Grid>

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
                            <Label as='a' color='blue' ribbon='right' onClick={event => window.location.href = `/searchDetails/searchDescription/${this.props.match.params.searchText}`}>
                                see more
                            </Label>
                        </Grid.Column>
                    </Grid>
                }
                { descLength > 0 && n >= 4
                    ? <Grid columns='equal'>{columnsDesc}</Grid>
                        : <Grid columns='equal'>{columnsDesc}
                            <GridColumn></GridColumn>
                        </Grid>
                }
                {movieLength === 0 && genreLength === 0 && descLength === 0 &&
              
                    <Grid.Column>
                        <Header as='h1'>No Search Results Found! Please search with other keyword.</Header>
                        
                    </Grid.Column>
                }
                </Container>
            </React.Fragment>
        )
    }
}