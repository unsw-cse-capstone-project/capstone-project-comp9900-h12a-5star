import React from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from '../components/NavBar';
import MovieTile from '../components/MovieTile';

const HomePage = () => (
    <React.Fragment>
        <NavBar />
        <Container style={{ margin: 20 }}>
            <p>The content will appear here</p>
            <MovieTile />
        </Container>
    </React.Fragment>
);

export default HomePage;