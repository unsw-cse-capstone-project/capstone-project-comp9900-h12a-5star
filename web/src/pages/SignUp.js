import React , { Component, createRef } from 'react'
import { Tab, Segment, Container, Grid, Card, Icon, Image, Button, Input, Header, Divider,Form, Label, Ref, Dropdown } from 'semantic-ui-react'
import './style.css'

export default class SignUp extends Component {

    
    genderOptions = [
        { key: 'Male', text: 'Male', value: 'Male' },
        { key: 'Female', text: 'Female', value: 'Female' },
    ]
    
    genreOptions = [
        { key: 'Action', text: 'Action', value: 'Action' },
        { key: 'Adventure', text: 'Adventure', value: 'Adventure' },
        { key: 'Comedy', text: 'Comedy', value: 'Comedy' },
        { key: 'Crime', text: 'Crime', value: 'Crime' },
        { key: 'Drama', text: 'Drama', value: 'Drama' },
        { key: 'Family', text: 'Family', value: 'Family' },
        { key: 'Fantasy', text: 'Fantasy', value: 'Fantasy' },
        { key: 'Horror', text: 'Horror', value: 'Horror' },
        { key: 'Mystery', text: 'Mystery', value: 'Mystery' },
        { key: 'Romance', text: 'Romance', value: 'Romance' },
        { key: 'Science Fiction', text: 'Science Fiction', value: 'Science Fiction' },
        { key: 'Thriller', text: 'Thriller', value: 'Thriller' },
        
    ]

    languageOptions = [
        { key: 'English', text: 'English', value: 'English' },
        { key: 'Mandarin Chinese', text: 'Mandarin Chinese', value: 'Mandarin Chinese' },
        { key: 'Hindi', text: 'Hindi', value: 'Hindi' },
        { key: 'Spanish', text: 'Spanish', value: 'Spanish' },
        { key: 'French', text: 'French', value: 'French' },
        { key: 'Standard Arabic', text: 'Standard Arabic', value: 'Standard Arabic' },
        { key: 'Bengali', text: 'Bengali', value: 'Bengali' },
        { key: 'Russian', text: 'Russian', value: 'Russian' },
        { key: 'Portuguese', text: 'Portuguese', value: 'Portuguese' },
        { key: 'Indonesian', text: 'Indonesian', value: 'Indonesian' },
        { key: 'Korean', text: 'Korean', value: 'Korean' },
      ]


    constructor() {
        super();
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            
            firstName: "",
            lastName: "",
            gender : "",
            userName: "",
            email: "",
            password: "",
            languages : [],
            genres : [],
            
        };
        
    }


    checkSignUp = async() => {
        if (this.state.email !== "" & this.state.password !== "" & this.state.gender !== "" & this.state.languages !== [] &
        this.state.userName !== "" & this.state.firstName !== "" & this.state.lastName !== "" & this.state.genres !== []){
            
            
            var obj = {"email": this.state.email, "password": this.state.password, "genre": this.state.genres, "language": this.state.languages,
                "profile": {"firstname": this.state.firstName, "lastname": this.state.lastName, "username": this.state.userName,
                "gender": this.state.gender, "genres": "", "languages":"English"}};

            const requestOptions = {
                method: 'post',
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                body: JSON.stringify(obj)
            }
        
            

            const result = await fetch(`http://127.0.0.1:8000/api/signup`, requestOptions)
            const body = await result.json();
           
            if (body.statusCode === 200){

                window.location.href='/login';
            }
            else{
                alert("Please enter unique Username and Email!");
            }
        }
        else{
            alert("Please check all fields are filled correctly!")
        }

            
    }

    render() {

        return(
            <>
            <div className='account'>
              <Grid  stretched>
                <Grid.Column width={3}></Grid.Column>
                <Grid.Column width={10} stretched>
                <br />
                <br />
                <br />
                <br />
                <Segment  inverted style={{margin: 15 }}>
                
                  <h1 style={{textAlign:"center", color:"white"}}>Sign Up</h1>
                  <Form >
                    <Form.Group >
                      <Form.Field width={16}>
                        <label style={{color:"white"}}>First Name</label>
                        <input value = {this.state.firstName} onChange={(event) =>  this.setState({firstName : event.target.value})}  required />
                      </Form.Field>
                    
                      <Form.Field width={16}>
                        <label style={{color:"white"}}>Last Name</label>
                        <input value = {this.state.lastName} onChange={(event) =>  this.setState({lastName : event.target.value})}  required/>
                      </Form.Field>
                    </Form.Group>
          
                    <Form.Group >
                      <Form.Field width={16}>
                        <label style={{color:"white"}}>Gender</label>
                        <Dropdown onChange={(event, {value}) =>  this.setState({gender : value})} fluid selection options={this.genderOptions} required/>
                      </Form.Field>
                
                      <Form.Field width={16}>
                        <label style={{color:"white"}}> Username</label>
                        <input value = {this.state.userName} onChange={(event) =>  this.setState({userName : event.target.value})} required/>
                      </Form.Field>
                    </Form.Group>
                
                    <Form.Group >
                      <Form.Field width={16}>
                        <label style={{color:"white"}}>Email</label>
                        <input type='email' value = {this.state.email} onChange={(event) =>  this.setState({email : event.target.value})}  required/>
                      </Form.Field>
                    
                      <Form.Field width={16}>
                        <label style={{color:"white"}}>Password</label>
                        <input type='password' value = {this.state.password} onChange={(event) =>  this.setState({password : event.target.value})}  required/>
                      </Form.Field>
                    </Form.Group>

                    <Form.Group >
                      <Form.Field inverted width={16}>
                        <label style={{color:"white"}}>Favorite Languages</label>
                        <Dropdown  onChange={(event, {value}) =>  this.setState({languages : value})}  fluid selection multiple options={this.languageOptions} required/>
                      </Form.Field>
                    
                      <Form.Field width={16}>
                        <label style={{color:"white"}}>Favorite Genres</label>
                        <Dropdown onChange={(event, {value}) =>  this.setState({genres : value})}  fluid selection multiple options={this.genreOptions} required/>
                      </Form.Field>
                    </Form.Group>
                    <br></br>
          
                    <Button primary type='submit' onClick={this.checkSignUp} color={"blue"} fluid type='submit' floated='left'>Join Now</Button>
                  </Form>
                
                </Segment>
                </Grid.Column>
                <Grid.Column width={3}>

                </Grid.Column>
                
                </Grid>
                </div>
              </>
            );  
    }
}
