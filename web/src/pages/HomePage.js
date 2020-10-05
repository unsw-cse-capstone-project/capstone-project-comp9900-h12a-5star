import React, { Component } from 'react';
import _ from 'lodash'
import { Container, Header, Divider, Grid } from 'semantic-ui-react';
import NavBar from '../components/NavBar';
import MovieTile from '../components/MovieTile';

const columnsTopMovies = _.times(5, (i) => (
    <Grid.Column key={i}>
      <MovieTile />
    </Grid.Column>
))
const columnsRecentlyReleased = _.times(5, (i) => (
    <Grid.Column key={i}>
      <MovieTile />
    </Grid.Column>
))
const columnsMostPopular = _.times(5, (i) => (
    <Grid.Column key={i}>
      <MovieTile />
    </Grid.Column>
))

export default class HomePage extends Component {
    render() {
        return (
            <React.Fragment>
                <NavBar />
               
                <Container style={{ margin: 20 }}>
                    <Header as='h1'>Top Rated Movies</Header>
                    <Grid columns='equal'>{columnsTopMovies}</Grid>
                    <Divider section />
                    <Header as='h1'>Recently Released Movies </Header>
                    <Grid columns='equal'>{columnsRecentlyReleased}</Grid>
                    <Divider section />
                    <Header as='h1'>Popular Movies</Header>
                    <Grid columns='equal'>{columnsMostPopular}</Grid>
                </Container>
            </React.Fragment>
        )
    }
}