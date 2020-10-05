import React from 'react';
import { Container, Header, Divider } from 'semantic-ui-react';
import NavBar from '../components/NavBar';
import MovieTile from '../components/MovieTile';

const HomePage = () => (
    <React.Fragment>
        <NavBar />
        <Container style={{ margin: 20 }}>
            <Header as='h1'>Top Movies</Header>
            <MovieTile />
            <Divider section />
            <Header as='h1'>Top Rated</Header>
            <MovieTile />
            <Divider section />
            <Header as='h1'>Most Popular</Header>
            <MovieTile />
        </Container>
    </React.Fragment>
);

export default HomePage;