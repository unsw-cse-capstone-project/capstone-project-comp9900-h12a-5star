import React, { Component } from 'react';
import _ from 'lodash'
import { Container, Header, Divider, Grid, Label } from 'semantic-ui-react';
import NavBar from '../components/NavBar';
import MovieTile from '../components/MovieTile';


export default class HomePage extends Component {
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

    state = {name: "Enola Holmes", url:"http://image.tmdb.org/t/p/w780//riYInlsq2kf1AWoGm80JQW5dLKp.jpg"}
    // article = MovieData.find(serType => serType === 'popular')
    columnsTopMovies = _.times(5, (i) => (
        <Grid.Column key={i}>
            <MovieTile title = {this.movie_data.popular[i].title} poster = {this.state.url} release = {''} rating = {''} description = {''}/>
        </Grid.Column>
    ))
    columnsRecentlyReleased = _.times(5, (i) => (
        
        <Grid.Column key={i}>
            <MovieTile title = {'Avengers'} poster = {'https://upload.wikimedia.org/wikipedia/en/8/8a/The_Avengers_%282012_film%29_poster.jpg'}/>
        </Grid.Column>
    ))
    columnsMostPopular = _.times(5, (i) => (
        <Grid.Column key={i}>
            <MovieTile title = {'The Last Days of American Crime'} poster = {'http://image.tmdb.org/t/p/w780//ygCQnDEqUEIamBpdQdDYnFfxvgM.jpg'} />
        </Grid.Column>
    ))

    render() {
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
                    <Grid columns='equal'>{this.columnsTopMovies}</Grid>
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
                    <Grid columns='equal'>{this.columnsRecentlyReleased}</Grid>
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
                    <Grid columns='equal'>{this.columnsMostPopular}</Grid>
                </Container>
            </React.Fragment>
        )
    }
}