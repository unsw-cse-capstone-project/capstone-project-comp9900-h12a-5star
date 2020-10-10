import React, { Component } from 'react';
import _ from 'lodash'
import { Container, Header, Divider, Grid, Label } from 'semantic-ui-react';
import NavBar from '../components/NavBar';
import MovieTile from '../components/MovieTile';


export default class HomePage extends Component {

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
        fetch("http://dummy.restapiexample.com/api/v1/employees")
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

    movie_data = {
        popular: [
            {
                id: 497582,
                title: "Enola Holmes",
                rating: 3.5
            },
            {
                id: 497582,
                title: "Enola Holmes 2",
                rating: 3.5
            },
            {
                id: 497582,
                title: "Enola Holmes 3",
                rating: 3.5
            },
            {
                id: 497582,
                title: "Enola Holmes 4",
                rating: 3.5
            },
            {
                id: 497582,
                title: "Enola Holmes 5",
                rating: 3.5
            }
        ]
    }



    render() {
        const { error, isLoaded, items, url } = this.state;
        var columnsTopMovies = null
        var columnsRecentlyReleased = null
        var columnsMostPopular = null

        if (this.state.items.data) {
            columnsTopMovies = _.times(5, (i) => (
                <Grid.Column key={i}>
                    <MovieTile title={this.movie_data.popular[i].title} poster={url} release={''} rating={3.5} description={''} movieId={''} />
                </Grid.Column>
            ))
            columnsRecentlyReleased = _.times(5, (i) => (

                <Grid.Column key={i}>
                    <MovieTile title={this.state.items.data[i].employee_name} poster={'https://upload.wikimedia.org/wikipedia/en/8/8a/The_Avengers_%282012_film%29_poster.jpg'} release={''} rating={3.5} description={''} />
                </Grid.Column>

            ))
            columnsMostPopular = _.times(5, (i) => (
                <Grid.Column key={i}>
                    <MovieTile title={'The Last Days of American Crime'} poster={'http://image.tmdb.org/t/p/w780//ygCQnDEqUEIamBpdQdDYnFfxvgM.jpg'} release={''} rating={3.5} description={''} />
                </Grid.Column>
            ))
        }
        return (
            <React.Fragment>
                <NavBar />

                <Container style={{ margin: 20 }}>
                    <Grid columns="equal">
                        <Grid.Column>
                            <Header as='h1'>Top Rated Movies</Header>
                        </Grid.Column>
                        <Grid.Column>
                            <Label as='a' color='blue' ribbon='right' onClick={event => window.location.href = '/searchResult/topRated'}>
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
                            <Label as='a' color='blue' ribbon='right' onClick={event => window.location.href = '/searchResult/recentReleased'}>
                                see more
                            </Label>
                        </Grid.Column>
                    </Grid>
                    <Grid columns='equal'>{columnsRecentlyReleased}</Grid>
                    <Divider section />
                    <Grid columns="equal">
                        <Grid.Column>
                            <Header as='h1'>Popular Movies</Header>
                        </Grid.Column>
                        <Grid.Column>
                            <Label as='a' color='blue' ribbon='right' onClick={event => window.location.href = '/searchResult/popularMovies'}>
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