import React from 'react';
import { Grid, Container, Form, Segment, Accordion, Input, TextArea, Button, Select, Checkbox, Dropdown,Icon} from 'semantic-ui-react'
import NavBar from '../components/NavBar';
const genderOptions = [
    { key: 'm', text: 'Male', value: 'male' },
    { key: 'f', text: 'Female', value: 'female' },
]


const languageOptions = [
    { key: 'english', text: 'English', value: 'english' },
    { key: 'gujrati', text: 'Gujrati', value: 'gujrati' },
    { key: 'hindi', text: 'Hindi', value: 'hindi' },
    { key: 'kannada', text: 'Kannada', value: 'kannada' },
    { key: 'marathi', text: 'Marathi', value: 'marathi' },
    { key: 'chinese', text: 'Mandarin Chinese', value: 'chinese' },
    { key: 'punjabi', text: 'Punjabi', value: 'punjabi' },
    { key: 'spanish', text: 'Spanish', value: 'spanish' },
    { key: 'telugu', text: 'Telugu', value: 'telegu' },
    { key: 'urdu', text: 'Urdu', value: 'urdu' },

]

const genreOptions = [
    { key: 'action', text: 'Action', value: 'action' },
    { key: 'adventure', text: 'Adventure', value: 'adventure' },
    { key: 'comedy', text: 'Comedy', value: 'comedy' },
    { key: 'crime', text: 'Crime', value: 'crime' },
    { key: 'drama', text: 'Drama', value: 'drama' },
    { key: 'family', text: 'Family', value: 'family' },
    { key: 'fantasy', text: 'Fantasy', value: 'fantasy' },
    { key: 'horror', text: 'Horror', value: 'horror' },
    { key: 'mystery', text: 'Mystery', value: 'mystery' },
    { key: 'romance', text: 'Romance', value: 'romance' },
    { key: 'sciencefiction', text: 'Science Fiction', value: 'sciencefiction' },
    { key: 'thriller', text: 'Thriller', value: 'thriller' },

]


const Login = () => (
    <React.Fragment>
        <NavBar />



        <div style={{ backgroundImage: `url(${require("../images/loginsignup.jpg")})`,height: 800 }}>

            <Grid>
                <Grid.Column width={5}></Grid.Column>
                <Grid.Column width={5} stretched>

                    <Segment  inverted style={{margin: 15 }}>



                        <h1 style={{textAlign:"center"}}>Log In</h1>
                        <Form inverted>





                            <Form.Group >
                                <Form.Field width={16}>
                                    <label>Email</label>
                                    <input type='email' placeholder='joe@schmoe.com' />
                                </Form.Field>
                            </Form.Group>

                            <Form.Group >
                                <Form.Field width={16}>
                                    <label>Password</label>
                                    <input type='password' placeholder='Password' />
                                </Form.Field>
                            </Form.Group>





                            <br></br>

                            <Button fluid type='submit' floated='left' >Log In</Button>

                            <p>&nbsp;</p>

                            New to FilmFinder? <Button  onClick={event => window.location.href = '/signup'}>Sign Up</Button>



                        </Form>

                    </Segment>
                </Grid.Column>

            </Grid>
        </div>
    </React.Fragment>


);

export default Login;