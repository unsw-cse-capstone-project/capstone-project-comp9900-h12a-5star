import React, { Component } from 'react';
import _ from 'lodash'
import { Container, Header,Grid} from 'semantic-ui-react';
import NavBar from '../components/NavBar';
import MovieTile from '../components/MovieTile';

export default class PopularMovies extends Component {

    constructor() {
        super();
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }

    componentDidMount() {
        fetch("http://127.0.0.1:8000/homepage/")
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

        var columnsRecentlyReleased = null

        if (this.state.items.popular) {
            columnsRecentlyReleased = _.times(12, (i) => (
                <Grid.Row key={i}>{
                    _.times(4, (j) => (
                        <Grid.Column>
                            <MovieTile 
                                title={this.state.items.popular[i*4+j].title} 
                                poster={this.state.items.popular[i*4+j].poster} 
                                release={this.state.items.popular[i*4+j].release_date} 
                                rating={this.state.items.popular[i*4+j].rating} 
                                description={this.state.items.popular[i*4+j].description} 
                                movieId={this.state.items.popular[i*4+j].id}
                            />
                        </Grid.Column>
                    ))
                }
                </Grid.Row>
                ))
        }
        return (
            <>
                <NavBar />

                <Container style={{ margin: 20 }}>
                    <Header as='h1'>Top Rated Movies</Header>
                    <Grid columns='equal'>{columnsRecentlyReleased}</Grid>
                </Container>
            </>
        )
    }

}