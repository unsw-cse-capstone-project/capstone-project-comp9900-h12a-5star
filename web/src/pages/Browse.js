import React, { Component } from 'react';
import _ from 'lodash'
import {  Form, Segment,  Button, Dropdown} from 'semantic-ui-react';
import { Container, Header, Divider, Grid, Label, Card, Placeholder} from 'semantic-ui-react';
import NavBar from '../components/NavBar';
import MovieTile from '../components/MovieTile';
import {useState, useEffect} from 'react';
import Select from 'react-select';
import {genresList, directorsList} from './DirectorsGenres'

const Browse = () => {

    const directorOptions = directorsList
        
    const genreOptions = genresList
    
    const [genre, setgenre] = useState([]);
    const [director, setdirector] = useState([]);
    const [hasError, setErrors] = useState(false);
      
    const genreSelected=[]
    const directorSelected=[]

    const [data, setData] = useState({ });
    
    var flag = 0;
    
    const checkGenreDirector = async () => {
        if (genre){
  
            for (var i=0; i<genre.length;i++){
             
              genreSelected.push(genre[i].value)
            }
            
          }
          if (director){
            for (var i=0; i<director.length;i++){
              
              directorSelected.push(director[i].value)
            }
          }
          
        // console.log(director)
        // console.log(genre)
        var obj = {"genre_id":genreSelected,"director_id":directorSelected};
        // console.log(genreSelected)
        // console.log(directorSelected)
        if (genreSelected.length > 0 & directorSelected.length > 0){
            var flag = 1;
            const result = await fetch(`http://127.0.0.1:8000/api/browse/`, {
              method: 'post',
              body: JSON.stringify(obj),
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
              }
            });
            const body = await result.json();
            setData(body.browse_result);
            // console.log(obj)
            // console.log('i am inside both genre and director')
       
        }
        else if(genreSelected.length > 0){
            var flag = 1;
            const result = await fetch(`http://127.0.0.1:8000/api/browse/`, {
              method: 'post',
              body: JSON.stringify(obj),
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
              }
            });
            const body = await result.json();
            setData(body.genre_result);
            // console.log(obj)
            // console.log('i am inside genre')
        }
        else if(directorSelected.length > 0){
            var flag = 1;
            const result = await fetch(`http://127.0.0.1:8000/api/browse/`, {
              method: 'post',
              body: JSON.stringify(obj),
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
              }
            });
            const body = await result.json();
            setData(body.director_result);
            // console.log(obj)
            // console.log('i am inside director')
        }
        else{
            var flag = 0;
            const result = await fetch(`http://127.0.0.1:8000/api/browse/`, {
              method: 'post',
              body: JSON.stringify({}),
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
              }
            });
            const body = await result.json();
            setData(body.name_results);
            
        }
    
    }

    

    // const [name_results
    
    const requestOptions = {
            method: 'POST',
            headers: { 'Accept': 'application/json',
            'Content-Type': 'application/json'},
            body: JSON.stringify({})
        };
    
    // useEffect(() =>
    //     fetch("http://127.0.0.1:8000/api/browse/",requestOptions)
    //       .then(res => res.json())
    //       .then(res => this.setState({ data: res }))
    //       .catch(() => this.setState({ hasErrors: true }))
    //   );
    useEffect(async () => {
        const result = await fetch("http://127.0.0.1:8000/api/browse/",requestOptions);
        // console.log(result)
        const body = await result.json();
        // console.log(body.name_results)
            setData(body.name_results);
        },[]);
   
    
    
    // console.log(data.length)
    
    

    
    
        var columnsMovie = null
        var movieLength=0;
        if (data){
            movieLength=data.length;
           
        }
        var x = Math.floor(movieLength/4);
        
        var y = x*4;


        if (data) {
            columnsMovie = _.times(x, (i) => (
                <Grid.Row key={i}>{
                    _.times(4, (j) => (
                        <Grid.Column>
                            <MovieTile 
                                title={data[i*4+j].title} 
                                poster={data[i*4+j].poster} 
                                release={data[i*4+j].release_date} 
                                rating={data[i*4+j].rating} 
                                description={data[i*4+j].description} 
                                movieId={data[i*4+j].id}
                            />
                        </Grid.Column>
                    ))
                }
                </Grid.Row>
                ))
        }
        // else{

        //     columnsMovie = _.times(12, (i) => (
        //         <Grid.Row key={i}>{
        //             _.times(4, (j) => (
        //                 <Grid.Column>
        //                     <Card.Group>
        //                         <Card>
        //                             <Placeholder>
        //                                 <Placeholder.Image square />
        //                             </Placeholder>
        //                         </Card>
        //                         <Card.Content>
        //                             <Placeholder>
        //                                 <Placeholder.Header>
        //                                     <Placeholder.Line length='very short' />
        //                                     <Placeholder.Line length='medium' />
        //                                 </Placeholder.Header>
        //                                 <Placeholder.Paragraph>
        //                                     <Placeholder.Line length='short' />
        //                                 </Placeholder.Paragraph>
        //                             </Placeholder>
        //                         </Card.Content>
        //                     </Card.Group>
        //                 </Grid.Column>
        //             ))
        //         }
        //         </Grid.Row>
        //     ))
        // }
        return (
        <>
            <NavBar />

            <Container style={{ margin: 20 }}>

                <Header as='h1'>Browse Movies</Header>
            <Divider section />
            <Form>
                <Form.Group >
                    <Form.Field inverted width={16}>
                    
                    
                        <Select placeholder="Genre"
                        options = {genreOptions} 
                        onChange= {setgenre} 
                        isMulti
                        autoFocus
                        isSearchable 
                        
                        />
                    </Form.Field>
          

          
                    <Form.Field width={16}>
                    
                        <Select placeholder="Director"
                        
                        options = {directorOptions} 
                        onChange= {setdirector} 
                        isMulti
                        autoFocus
                        isSearchable 
                        
                        />
                    </Form.Field>
         
      
                    <Form.Field width={4}>
                        <Button onClick={checkGenreDirector} color={"blue"} fluid type='submit' floated='left'>Browse</Button>
                    </Form.Field>
                </Form.Group >
            </Form> 
        
            { flag == 1 &&
                <Grid.Column>
                    <Header as='h1'>Browse Results: {y}</Header>
                    <Divider section />
                </Grid.Column>
                
            }
        
            <Divider section />
        
            <Grid columns='equal'>{columnsMovie}</Grid>
            </Container>
        </>
        )
}

export default Browse;