import React from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from '../components/NavBar';

const HomePage = () => (
    <React.Fragment>
        <NavBar />
        <Container style={{ margin: 20 }}>
            <p>The content will appear here</p>
        </Container>
    </React.Fragment>
);

export default HomePage;