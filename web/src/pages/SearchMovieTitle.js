import React, { Component } from 'react';
import _ from 'lodash'
import { Container, Header, Divider, Grid, Label, Card, Placeholder,GridColumn} from 'semantic-ui-react';
import MovieTile from '../components/MovieTile';

export default class SearchMovieTitle extends Component {

    constructor() {
        super();
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }

    componentDidMount() {
        fetch(`http://127.0.0.1:8000/api/search/?query=${this.props.match.params.searchText}`)
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

        var columnsMovie = null
        var movieLength=0;
        if (this.state.items.name_result){
            movieLength=this.state.items.name_result.length;
        }
        var x = Math.floor(movieLength/4);

        var y= x*4;
        if (movieLength>0 && movieLength<4){
            y=movieLength
        }


        if ( movieLength >=4 ) {
            columnsMovie = _.times(x, (i) => (
                <Grid.Row key={i}>{
                    _.times(4, (j) => (
                        <Grid.Column>
                            <MovieTile 
                                title={this.state.items.name_result[i*4+j].title} 
                                poster={this.state.items.name_result[i*4+j].poster} 
                                release={this.state.items.name_result[i*4+j].release_date} 
                                rating={this.state.items.name_result[i*4+j].rating} 
                                description={this.state.items.name_result[i*4+j].description} 
                                movieId={this.state.items.name_result[i*4+j].id}
                            />
                        </Grid.Column>
                    ))
                }
                </Grid.Row>
                ))
        }
        else if(movieLength>0 & movieLength<4){
            columnsMovie = _.times(movieLength, (i) => (
                <Grid.Column key={i}>
                    <MovieTile 
                        title={this.state.items.name_result[i].title} 
                        poster={this.state.items.name_result[i].poster} 
                        release={this.state.items.name_result[i].release_date} 
                        rating={this.state.items.name_result[i].rating} 
                        description={this.state.items.name_result[i].description} 
                        movieId={this.state.items.name_result[i].id} 
                    />
                </Grid.Column>
            ))
        }
        else if(movieLength === 0){

            columnsMovie = _.times(12, (i) => (
                <Grid.Row key={i}>{
                    _.times(4, (j) => (
                        <Grid.Column>
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
                </Grid.Row>
            ))
        }
        return (
            <>
                <Container style={{ margin: 20 }}>

                <Header as='h1'>Search Results by Movie Title: {this.props.match.params.searchText}</Header>
                    <Divider section />
                    {/* <Grid columns='equal'>{columnsMovie}</Grid> */}

                    {   y >= 4 

                            ? <Grid columns='equal'>{columnsMovie}</Grid>
                            : <Grid columns='equal'>{columnsMovie}
                                <GridColumn></GridColumn>

                                </Grid>
                    }
                </Container>
            </>
        )
    }

}