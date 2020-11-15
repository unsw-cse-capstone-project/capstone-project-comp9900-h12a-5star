import React from 'react';
import { Container, Icon } from 'semantic-ui-react';

// This component is called when a page which we searched for does not exist.
const NotFoundPage = () => (
    <Container>
        <br />
        <br />
        <center>
        <h1><Icon name="find" size="massive"/> <br /> <br />
        Oops!!! We could not find the page that you were looking for!</h1>
        </center>
        
    </Container>
    
);

export default NotFoundPage;