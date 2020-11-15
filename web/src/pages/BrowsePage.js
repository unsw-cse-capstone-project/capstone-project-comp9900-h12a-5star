import React, { Component } from 'react';
import _ from 'lodash'
import {  Form,  Button, Dropdown, GridColumn} from 'semantic-ui-react';
import { Container, Header, Divider, Grid, Card, Placeholder} from 'semantic-ui-react';
import MovieTile from '../components/MovieTile';
import {directorList,genreList} from '../components/genericLists';

export default class BrowsePage extends Component {

    genreOptions=genreList
    directorOptions=directorList
    
    //Constructor called at the time of page load
    constructor() {
        super();
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            directors : [],
            genres : [],
            flag : 0
        };
    }

    // function called when the components are loaded onto the page.It gets executed right after the constructor.
    // Performs an operation to pull the movies ordered based on rating from high to low.
    componentDidMount() {
        const requestOptions = {
            method: 'POST',
            headers: { 'Accept': 'application/json',
            'Content-Type': 'application/json'},
            body: JSON.stringify({})
        };

        fetch("http://127.0.0.1:8000/api/browse/",requestOptions)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result.name_results
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

    // function called when user clicks on browse button. Movies are searched based on user selection of genre or director or both.
    checkGenreDirector = () => {
        
        this.setState({ isLoaded: true })
        var obj = {"genre_id":this.state.genres,"director_id":this.state.directors};
   
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(obj)
        };
        //Movies searched on user selection of both genre and director
        if (this.state.genres.length >0 & this.state.directors.length >0){
            this.setState({flag: 1})
            
            fetch("http://127.0.0.1:8000/api/browse/",requestOptions)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result.browse_result
                    });
                },
                
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
            this.setState({isLoaded:false})
        }
        //Movies searched on user selection of only genres
        else if (this.state.genres.length >0){
            this.setState({flag: 2})
            
            fetch("http://127.0.0.1:8000/api/browse/",requestOptions)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result.genre_result
                    });
                },
                
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
            this.setState({isLoaded:false})
        }
        //Movies searched on user selection of only directors
        else if (this.state.directors.length > 0){
            this.setState({flag: 3})
            
            fetch("http://127.0.0.1:8000/api/browse/",requestOptions)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result.director_result
                    });
                },
                
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
            this.setState({isLoaded:false})
        }


    }

    render() {


        
        var columnsMovie = null
        var movieLength=0;
        if (this.state.items){
            movieLength=this.state.items.length;
        }
        
        var x = Math.floor(movieLength/4);

        var y= x*4;
        if (movieLength>0 && movieLength<4){
            y=movieLength
        }

        //Count of movies returned are greater than equal to 4
        if ( movieLength >=4 ) {
           
            columnsMovie = _.times(x, (i) => (
                <Grid.Row key={i}>{
                    _.times(4, (j) => (
                        <Grid.Column>
                            <MovieTile 
                                title={this.state.items[i*4+j].title} 
                                poster={this.state.items[i*4+j].poster} 
                                release={this.state.items[i*4+j].release_date} 
                                rating={this.state.items[i*4+j].rating} 
                                description={this.state.items[i*4+j].description} 
                                movieId={this.state.items[i*4+j].id}
                            />
                        </Grid.Column>
                    ))
                }
                </Grid.Row>
                ))
        }
        //Count of movies returned are between 0 and less than 4
        else if(movieLength>0 & movieLength<4){
            
            columnsMovie = _.times(movieLength, (i) => (
                <Grid.Column key={i}>
                    <MovieTile 
                        title={this.state.items[i].title} 
                        poster={this.state.items[i].poster} 
                        release={this.state.items[i].release_date} 
                        rating={this.state.items[i].rating} 
                        description={this.state.items[i].description} 
                        movieId={this.state.items[i].id} 
                    />
                </Grid.Column>
                
            ))
        }
        //Count of movies returned are zero when browse button is clicked
        else if(movieLength ===0 & this.state.flag!==0){
           
            columnsMovie=null
        }
        //On page load show empty movie tiles (placeholder)
        if(this.state.isLoaded === false){
            
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
    
                    <Header as='h1'>Browse Movies</Header>
                <Divider section />
                <Form>
                    <Form.Group >
                 
                      <Form.Field width={12}>
                        
                        <Dropdown placeholder="Genres"
                         onChange={(event, {value}) =>  this.setState({genres : value})} 
                         search 
                         fluid selection multiple options={this.genreOptions} 
                         required/>
                      </Form.Field>
              
    
              
                      <Form.Field width={12}>
                     
                        <Dropdown placeholder="Directors" 
                        onChange={(event, {value}) =>  this.setState({directors : value})} 
                        search 
                        fluid selection multiple options={this.directorOptions} 
                        required/>
                      </Form.Field>
             
          
                        <Form.Field width={4}>
                            <Button  onClick={this.checkGenreDirector} color={"blue"} fluid type='submit' floated='left'>Browse </Button>
                        </Form.Field>
                    </Form.Group >
                </Form> 
                <Divider section />
                { this.state.flag===1 &&
                    <Grid.Column>
                        <Header as='h1'>Browse Results by Genres and Directors: {y} </Header>
                        <Divider section />
                    </Grid.Column>
                }
                { this.state.flag===2 &&
                    <Grid.Column>
                        <Header as='h1'>Browse Results by Genres: {y}</Header>
                        <Divider section />
                    </Grid.Column>
                }
                { this.state.flag===3 &&
                    <Grid.Column>
                        <Header as='h1'>Browse Results by Directors: {y}</Header>
                        <Divider section />
                    </Grid.Column>
                }
            
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