import React from 'react';
import { Grid, Form, Segment, Button} from 'semantic-ui-react'
import NavBar from '../components/NavBar';

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