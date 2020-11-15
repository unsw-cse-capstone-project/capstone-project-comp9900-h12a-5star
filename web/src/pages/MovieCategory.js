import React, { Component } from 'react';
import _ from 'lodash'
import { Container, Header,Grid} from 'semantic-ui-react';
import MovieTile from '../components/MovieTile';

export default class RecentReleased extends Component {

    constructor() {
        super();
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }

    componentDidMount() {

        console.log(this.props.match.params.movieId)
        console.log(window.sessionStorage.getItem('username'))
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: this.props.match.params.movieId, user: window.sessionStorage.getItem('username') })
            
        };

        fetch("http://127.0.0.1:8000/api/moviedetail", requestOptions)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result,

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

        var columnsCategory = null
        var category = null



        if (this.props.match.params.category === "RecommendMore"){
            if (this.state.items.recomendations) {
                console.log("recommending")
                category = "More Like This"
                columnsCategory = _.times(3, (i) => (
                    <Grid.Row key={i}>{
                        _.times(3, (j) => (
                            <Grid.Column>
                                <MovieTile 
                    title={this.state.items.recomendations[i*4+j].movieTitle} 
                    poster={this.state.items.recomendations[i*4+j].poster} 
                    release={this.state.items.recomendations[i*4+j].releaseDate} 
                    rating={this.state.items.recomendations[i*4+j].rating} 
                    description={this.state.items.recomendations[i*4+j].description} 
                    movieId={this.state.items.recomendations[i*4+j].movieID} 
                                />
                            </Grid.Column>
                        ))
                    }
                    </Grid.Row>
                ))
            }
        }
        
        return (
            <>
                <Container style={{ margin: 20 }}>
                    <Header as='h1'>{category}</Header>
                    <Grid columns='equal'>{columnsCategory}</Grid>
                </Container>
            </>
        )
    }

}