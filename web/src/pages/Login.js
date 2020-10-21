import React from 'react';
import {useState} from 'react';
import { Grid, Form, Segment, Button,Divider} from 'semantic-ui-react';
import NavBar from '../components/NavBar';

const Login = () => {
    const [email, setUsername] = useState('');
    const [password, setpassword] = useState('')
    const [error, setError] = useState('');

    const checkLogin = async () => {
        if (email !== '' || password !== ''){

            const result = await fetch(`http://127.0.0.1:8000/api/signin`, {
                method: 'post',
                body: JSON.stringify({email, password}),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }



            });
            const body = await result.json();

            if (body.response.status_code === 200){
                window.sessionStorage.setItem('username', body.response.username);

                window.location.href='/welcome';
            }
            else{
                setError(body.error);
            }
        }
        else{
            setError('Either username or password not filled');
        }


    };
    return(

    <React.Fragment>
        <NavBar/>


        <div style={{backgroundImage: `url(${require("../images/loginsignup.jpg")})`, height: 800}}>

            <Grid>
                <Grid.Column width={5}></Grid.Column>
                <Grid.Column width={5} stretched>

                    <Segment inverted style={{margin: 15}}>


                        <h1 style={{textAlign: "center"}}>Log In</h1>
                        <Form inverted>


                            <Form.Group>
                                <Form.Field width={16}>
                                    <label>Email</label>
                                    <input type='email' value = {email} onChange= {(event) => setUsername(event.target.value)} placeholder='joe@schmoe.com'/>
                                </Form.Field>
                            </Form.Group>

                            <Form.Group>
                                <Form.Field width={16}>
                                    <label>Password</label>
                                    <input value = {password} onChange= {(event) => setpassword(event.target.value)} type='password' placeholder='Password'/>
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