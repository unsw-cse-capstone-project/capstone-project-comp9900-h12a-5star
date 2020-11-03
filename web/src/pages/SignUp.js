import React , { Component, createRef } from 'react'
import { Tab, Segment, Container, Grid, Card, Icon, Image, Button, Input, Header, Divider,Form, Label, Ref, Dropdown } from 'semantic-ui-react'
import NavBar from '../components/NavBar';


export default class SignUp extends Component {

    
    genderOptions = [
        { key: 'Male', text: 'Male', value: 'Male' },
        { key: 'Female', text: 'Female', value: 'Female' },
    ]
    
    genreOptions = [
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

    languageOptions = [
        { key: 'english', text: 'English', value: 'english' },
        { key: 'gujrati', text: 'Gujrati', value: 'gujrati' },
        { key: 'hindi', text: 'Hindi', value: 'hindi' },
        { key: 'kannada', text: 'Kannada', value: 'kannada' },
        { key: 'marathi', text: 'Marathi', value: 'marathi' },
        { key: 'mandarinchinese', text: 'Mandarin Chinese', value: 'mandarinchinese' },
        { key: 'punjabi', text: 'Punjabi', value: 'punjabi' },
        { key: 'spanish', text: 'Spanish', value: 'spanish' },
        { key: 'telugu', text: 'Telugu', value: 'telegu' },
        { key: 'urdu', text: 'Urdu', value: 'urdu' },
        
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
                alert(body.response);
            }
        }
        else{
            alert("Please check all fields are filled correctly!")
        }

            
    }

    render() {

        return(
            <>
            <NavBar/>
            <div style={{ backgroundImage: `url(${require("../images/loginsignup.jpg")})` }}>
            
              <Grid>
                <Grid.Column width={5}></Grid.Column>
                <Grid.Column width={5} stretched>
          
                <Segment  inverted style={{margin: 15 }}>
                
                  <h1 style={{textAlign:"center", color:"white"}}>Sign Up</h1>
                  <Form >
                    <Form.Group >
                      <Form.Field width={16}>
                        <label style={{color:"white"}}>First Name</label>
                        <input value = {this.state.firstName} onChange={(event) =>  this.setState({firstName : event.target.value})}  required />
                      </Form.Field>
                    </Form.Group>
          
                    <Form.Group >
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
                    </Form.Group>
          
                    <Form.Group >
                    
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
                    </Form.Group>
          
                    <Form.Group >
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
                    </Form.Group>
          
                    <Form.Group >
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
                
                </Grid>
                </div>
              </>
            );  
    }
}
