import React, { Component } from 'react';
import _ from 'lodash'
import { Container, Header, Divider, Grid, Card, Placeholder,GridColumn} from 'semantic-ui-react';
import MovieTile from '../components/MovieTile';

export default class SearchGenre extends Component {

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

        var columnsGenre = null
        var genreLength=0;
        if (this.state.items.genre_result){
            genreLength=this.state.items.genre_result.length;
        }
        var x = Math.floor(genreLength/4);
        var y= x*4;
        if (genreLength>0 && genreLength<4){
            y=genreLength
        }

        if ( genreLength >=4 ) {
            columnsGenre = _.times(x, (i) => (
                <Grid.Row key={i}>{
                    _.times(4, (j) => (
                        <Grid.Column>
                            <MovieTile 
                                title={this.state.items.genre_result[i*4+j].title} 
                                poster={this.state.items.genre_result[i*4+j].poster} 
                                release={this.state.items.genre_result[i*4+j].release_date} 
                                rating={this.state.items.genre_result[i*4+j].rating} 
                                description={this.state.items.genre_result[i*4+j].description} 
                                movieId={this.state.items.genre_result[i*4+j].id}
                            />
                        </Grid.Column>
                    ))
                }
                </Grid.Row>
                ))
        }
        else if(genreLength>0 & genreLength<4){
            columnsGenre = _.times(genreLength, (i) => (

                <Grid.Column key={i}>
                    <MovieTile 
                        title={this.state.items.genre_result[i].title} 
                        poster={this.state.items.genre_result[i].poster} 
                        release={this.state.items.genre_result[i].release_date} 
                        rating={this.state.items.genre_result[i].rating} 
                        description={this.state.items.genre_result[i].description} 
                        movieId={this.state.items.genre_result[i].id}
                    />
                </Grid.Column>
            ))
        }
        else if(genreLength === 0){

            columnsGenre = _.times(12, (i) => (
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

                    <Header as='h1'>Search Results by Movie Genre: {this.props.match.params.searchText}</Header>
                    <Divider section />
                    {/* <Grid columns='equal'>{columnsGenre}</Grid> */}
                    {   y >= 4 

                        ? <Grid columns='equal'>{columnsGenre}</Grid>
                        : <Grid columns='equal'>{columnsGenre}
                            <GridColumn></GridColumn>

                            </Grid>
                    }
                </Container>
            </>
        )
    }

}