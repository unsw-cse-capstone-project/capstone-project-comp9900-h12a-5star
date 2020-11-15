import React, { Component } from 'react';
import _ from 'lodash'
import { Container, Header, Divider, Grid, Card, Placeholder,GridColumn} from 'semantic-ui-react';
import MovieTile from '../components/MovieTile';

export default class SearchDetails extends Component {

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
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render() {
        
        var flag=0
        if (this.props.match.params.searchCategory === "searchMovieTitle"){
            flag=1
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
        }
        else if(this.props.match.params.searchCategory === "searchGenre"){
            flag=2
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

        }
        else if(this.props.match.params.searchCategory === "searchDescription"){
            flag=3
            var columnsDesc = null
            var descLength=0;
            if (this.state.items.description_result){
                descLength=this.state.items.description_result.length;
            }
            var x = Math.floor(descLength/4);
            var y= x*4;
            if (descLength>0 && descLength<4){
                y=descLength
            }


            if ( descLength >=4 ) {
                columnsDesc = _.times(x, (i) => (
                    <Grid.Row key={i}>{
                        _.times(4, (j) => (
                            <Grid.Column>
                                <MovieTile 
                                    title={this.state.items.description_result[i*4+j].title} 
                                    poster={this.state.items.description_result[i*4+j].poster} 
                                    release={this.state.items.description_result[i*4+j].release_date} 
                                    rating={this.state.items.description_result[i*4+j].rating} 
                                    description={this.state.items.description_result[i*4+j].description} 
                                    movieId={this.state.items.description_result[i*4+j].id}
                                />
                            </Grid.Column>
                        ))
                    }
                    </Grid.Row>
                    ))
            }
            else if(descLength>0 & descLength<4){
                columnsDesc = _.times(descLength, (i) => (
                    <Grid.Column key={i}>
                        <MovieTile 
                            title={this.state.items.description_result[i].title} 
                            poster={this.state.items.description_result[i].poster} 
                            release={this.state.items.description_result[i].release_date} 
                            rating={this.state.items.description_result[i].rating} 
                            description={this.state.items.description_result[i].description} 
                            movieId={this.state.items.description_result[i].id}
                        />
                    </Grid.Column>
                ))

            }
            else if(descLength===0){

                columnsDesc = _.times(12, (i) => (
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

        }
        return (
            <>
                <Container style={{ margin: 20 }}>
                    {flag==1 &&
                        <Header as='h1'>Search Results by Movie Title: {this.props.match.params.searchText}</Header>
                    }
                    {flag==1 &&
                        <Divider section />
                    }
                    {  flag==1 && y >= 4 

                            ? <Grid columns='equal'>{columnsMovie}</Grid>
                            : <Grid columns='equal'>{columnsMovie}
                                <GridColumn></GridColumn>

                                </Grid>
                    }
                    {flag==2 &&
                        <Header as='h1'>Search Results by Movie Genre: {this.props.match.params.searchText}</Header>
                    }
                    {flag==2 &&
                        <Divider section />
                    }
                    {   flag==2 && y >= 4 

                        ? <Grid columns='equal'>{columnsGenre}</Grid>
                        : <Grid columns='equal'>{columnsGenre}
                            <GridColumn></GridColumn>

                            </Grid>
                    }
                    {flag ==3 &&
                        <Header as='h1'>Search Results by Movie Description: {this.props.match.params.searchText}</Header>
                    }
                    {flag==3 &&
                        <Divider section />
                    }
                    {   flag==3 && y >= 4 

                        ? <Grid columns='equal'>{columnsDesc}</Grid>
                        : <Grid columns='equal'>{columnsDesc}
                            <GridColumn></GridColumn>

                            </Grid>
                    }

                </Container>
            </>
        )
    }
}