import React, { Component } from 'react';
import _ from 'lodash'
import { Container, Header, Divider, Grid, Label, Card, Placeholder } from 'semantic-ui-react';
import MovieTile from '../components/MovieTile';


export default class HomePage extends Component {

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
    }

    // function called when the components are loaded onto the page.It gets executed right after the constructor.
    // Performs an operation to pull the top rated, popular and recently released movies from the database.
    async componentDidMount() {
        await fetch("http://127.0.0.1:8000/api/homepage/")
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

        // Innitializing the variables
        var columnsTopMovies = null
        var columnsRecentlyReleased = null
        var columnsMostPopular = null

        if (this.state.items.popular) {

            // Populate the top movies
            columnsTopMovies = _.times(4, (i) => (
                <Grid.Column key={i}>
                    <MovieTile 
                        title={this.state.items.top_rated[i].title} 
                        poster={this.state.items.top_rated[i].poster} 
                        release={this.state.items.top_rated[i].release_date} 
                        rating={this.state.items.top_rated[i].rating} 
                        description={this.state.items.top_rated[i].description} 
                        movieId={this.state.items.top_rated[i].id} 
                    />
                </Grid.Column>
            ))

            // Populate the recently released movies
            columnsRecentlyReleased = _.times(4, (i) => (
                <Grid.Column key={i}>
                    <MovieTile 
                        title={this.state.items.now_playing[i].title} 
                        poster={this.state.items.now_playing[i].poster} 
                        release={this.state.items.now_playing[i].release_date} 
                        rating={this.state.items.now_playing[i].rating} 
                        description={this.state.items.now_playing[i].description} 
                        movieId={this.state.items.now_playing[i].id}
                    />
                </Grid.Column>
            ))

            // POpulate the most popular movies
            columnsMostPopular = _.times(4, (i) => (
                <Grid.Column key={i}>
                    <MovieTile 
                        title={this.state.items.popular[i].title} 
                        poster={this.state.items.popular[i].poster} 
                        release={this.state.items.popular[i].release_date} 
                        rating={this.state.items.popular[i].rating} 
                        description={this.state.items.popular[i].description} 
                        movieId={this.state.items.popular[i].id}
                    />
                </Grid.Column>
            ))
            
        }
        else{

            // The placeholder elements while the page is being loaded 
            columnsTopMovies = _.times(4, (i) => (
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

            // The placeholder elements while the page is being loaded 
            columnsRecentlyReleased = _.times(4, (i) => (
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

            // The placeholder elements while the page is being loaded 
            columnsMostPopular = _.times(4, (i) => (
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
                    <Grid columns="equal">
                        <Grid.Column>
                            <Header as='h1'>Top Rated Movies</Header>
                        </Grid.Column>
                        <Grid.Column>
                            <Label as='a' color='blue' ribbon='right' onClick={event => window.location.href = 'welcome/TopRated'}>
                                see more
                            </Label>
                        </Grid.Column>
                    </Grid>
                    <Grid columns='equal'>{columnsTopMovies}</Grid>
                    <Divider section />
                    <Grid columns="equal">
                        <Grid.Column>
                            <Header as='h1'>Recently Released Movies</Header>
                        </Grid.Column>
                        <Grid.Column>
                            <Label as='a' color='blue' ribbon='right' onClick={event => window.location.href = 'welcome/RecentlyReleased'}>
                                see more
                            </Label>
                        </Grid.Column>
                    </Grid>
                    <Grid columns='equal'>{columnsRecentlyReleased}</Grid>
                    <Divider section />
                    <Grid columns="equal">
                        <Grid.Column>
                            <Header as='h1'>Trending Movies</Header>
                        </Grid.Column>
                        <Grid.Column>
                            <Label as='a' color='blue' ribbon='right' onClick={event => window.location.href = 'welcome/TrendingNow'}>
                                see more
                            </Label>
                        </Grid.Column>
                    </Grid>
                    <Grid columns='equal'>{columnsMostPopular}</Grid>
                </Container>
            </React.Fragment>
        )
    }
}