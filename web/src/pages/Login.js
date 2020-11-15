import React from 'react';
import {useState} from 'react';
import { Grid, Form, Segment, Button,Divider} from 'semantic-ui-react';
import './style.css'

const Login = () => {

    // Set the states for the input variables
    const [email, setUsername] = useState('');
    const [password, setpassword] = useState('')
    const [error, setError] = useState('');

    // Function to perform the login operation for the user
    const checkLogin = async () => {

        // Check if the values have been entered
        if (email !== '' && password !== ''){

            const result = await fetch(`http://127.0.0.1:8000/api/signin`, {
                method: 'post',
                body: JSON.stringify({email, password}),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            });
            const body = await result.json();

            if (body.response.statusCode === 200){
                window.sessionStorage.setItem('username', body.response.username);

                window.location.href='/welcome';
            }
            else{
                setError(body.response)
            }
        }
    };
    return(

    <React.Fragment>
        <div className='account' >

            <Grid>
                <Grid.Column width={5}></Grid.Column>
                <Grid.Column width={5} stretched>
                <br />
                <br />
                <br />
                <br />
                    <Segment inverted style={{margin: 15}}>
                        <h1 style={{textAlign: "center"}}>Log In</h1>
                        {
                        (error) &&

                        <p className="errorMessage">
                            {error}
                        </p>
                        
                        }
                        <Form inverted>
                            <Form.Group>
                                <Form.Field width={16}>
                                    <label>Email</label>
                                    <input type='email' value = {email} onChange= {(event) => setUsername(event.target.value)} placeholder='joe@schmoe.com' required/>
                                </Form.Field>
                            </Form.Group>

                            <Form.Group>
                                <Form.Field width={16}>
                                    <label>Password</label>
                                    <input value = {password} onChange= {(event) => setpassword(event.target.value)} type='password' placeholder='Password' required/>
                                </Form.Field>
                            </Form.Group>


                            <br></br>

                            <Button onClick={checkLogin} color={"blue"} fluid type='submit' floated='left'>Log In</Button>
                            <p>&nbsp;</p>
                            <Divider horizontal inverted>Or</Divider>


                            <center>
                                <Button color={"blue"} animated='fade'
                                        onClick={event => window.location.href = '/signup'}>
                                    <Button.Content visible>New to Film Finder</Button.Content>
                                    <Button.Content hidden>Sign up Now!</Button.Content>
                                </Button></center>


                        </Form>

                    </Segment>
                </Grid.Column>

            </Grid>
        </div>
    </React.Fragment>
    );


};

export default Login;