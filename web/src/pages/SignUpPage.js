import React, { Component } from 'react';
import { Grid, Form, Segment,  Button, Dropdown} from 'semantic-ui-react'
import NavBar from '../components/NavBar';
import {useState} from 'react';
import Select from 'react-select';


const SignUpPage = () => {
  const genderOptions = [
      {  label:'Male' ,value: 'Male'},
      { label:'Female', value: 'Female'},
    ]
  const languageOptions = [
    {  label: 'English', value: 'english' },
    {  label: 'Gujrati', value: 'gujrati' },
    { label: 'Hindi', value: 'hindi' },
    {  label: 'Kannada', value: 'kannada' },
    { label: 'Marathi', value: 'marathi' },
    { label: 'Mandarin Chinese', value: 'chinese' },
    {  label: 'Punjabi', value: 'punjabi' },
    {  label: 'Spanish', value: 'spanish' },
    {  label: 'Telugu', value: 'telegu' },
    { label: 'Urdu', value: 'urdu' },
    
  ]

  const genreOptions = [
    {  label: 'Action', value: 'action' },
    {  label: 'Adventure', value: 'adventure' },
    { label: 'Comedy', value: 'comedy' },
    {  label: 'Crime', value: 'crime' },
    { label: 'Drama', value: 'drama' },
    { label: 'Family', value: 'family' },
    {  label: 'Fantasy', value: 'fantasy' },
    { label: 'Horror', value: 'horror' },
    { label: 'Mystery', value: 'mystery' },
    { label: 'Romance', value: 'romance' },
    { label: 'Science Fiction', value: 'sciencefiction' },
    { label: 'Thriller', value: 'thriller' },
    
  ]
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [firstname, setfirstname] = useState('');
  const [lastname, setlastname] = useState('');
  const [username, setusername] = useState('');
  const [gender, setgender] = useState({});
  const [genre, setgenre] = useState([]);
  const [language, setlanguage] = useState([]);
  const [error, setError] = useState('');
  const genreSelected=[]
  const languageSelected=[]
  
  if (genre){

    for (var i=0; i<genre.length;i++){
     
      genreSelected.push(genre[i].value)
    }
    
  }
  if (language){
    for (var i=0; i<language.length;i++){
      
      languageSelected.push(language[i].value)
    }
  }
  
  const genderSelected=gender.value
  
  var obj = {"email": email, "password": password, "genre": genreSelected, "language": languageSelected,
              "profile": {"firstname": firstname, "lastname": lastname, "username": username,
            "gender": genderSelected, "genres": "", "languages":"English"}};
  
  const checkSignUp = async () => {
    
    if (email !== '' & password !== '' & genderSelected !== '' & languageSelected !== [] &
    firstname !== '' & lastname !== '' & username !== '' & genreSelected !== []){

        const result = await fetch(`http://127.0.0.1:8000/api/signup`, {
            method: 'post',
            body: JSON.stringify(obj),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        });
        const body = await result.json();

        if (body.status_code === 200){

            window.location.href='/login';
        }
        else{
            setError(body.error);
        }
    }
    else{
        setError('Check all fields are filled');
    }
};

return(
  <>
  <NavBar/>
  <div style={{ backgroundImage: `url(${require("../images/loginsignup.jpg")})` }}>
  
    <Grid>
      <Grid.Column width={5}></Grid.Column>
      <Grid.Column width={5} stretched>

      <Segment  style={{backgroundColor:'black', margin: 15 }}>
      
        <h1 style={{textAlign:"center", color:"white"}}>Sign Up</h1>
        <Form >
          <Form.Group >
            <Form.Field width={16}>
              <label style={{color:"white"}}>First Name</label>
              <input value = {firstname} onChange= {(event) => setfirstname(event.target.value)}  required />
            </Form.Field>
          </Form.Group>

          <Form.Group >
            <Form.Field width={16}>
              <label style={{color:"white"}}>Last Name</label>
              <input value = {lastname} onChange= {(event) => setlastname(event.target.value)}  required/>
            </Form.Field>
          </Form.Group>

          <Form.Group >
            <Form.Field width={16}>
              <label style={{color:"white"}}>Gender</label>
              <Select 
                options = {genderOptions} 
                onChange= {setgender}
                isSearchable 
                required/>
                
            </Form.Field>
          </Form.Group>

          <Form.Group >
          
            <Form.Field width={16}>
              <label style={{color:"white"}}> Username</label>
              <input value = {username} onChange= {(event) => setusername(event.target.value)}  required/>
            </Form.Field>
          </Form.Group>
      
          <Form.Group >
            <Form.Field width={16}>
              <label style={{color:"white"}}>Email</label>
              <input type='email' value = {email} onChange= {(event) => setemail(event.target.value)}  required/>
            </Form.Field>
          </Form.Group>

          <Form.Group >
            <Form.Field width={16}>
              <label style={{color:"white"}}>Password</label>
              <input type='password' value = {password} onChange= {(event) => setpassword(event.target.value)}  required/>
            </Form.Field>
          </Form.Group>

          

          <Form.Group >
            <Form.Field inverted width={16}>
              <label style={{color:"white"}}>Favorite Languages</label>
             
              <Select
              options = {languageOptions} 
              onChange= {setlanguage} 
              isMulti
              autoFocus
              isSearchable 
              required
              />
            </Form.Field>
          </Form.Group>

          <Form.Group >
            <Form.Field width={16}>
              <label style={{color:"white"}}>Favorite Genres</label>
              <Select 
              
              options = {genreOptions} 
              onChange= {setgenre} 
              isMulti
              autoFocus
              isSearchable 
              required
              />
            </Form.Field>
          </Form.Group>
          <br></br>

          <Button onClick={checkSignUp} color={"blue"} fluid type='submit' floated='left'>Join Now</Button>
        </Form>
      
      </Segment>
      </Grid.Column>
      
      </Grid>
      </div>
    </>
  );  
};

export default SignUpPage;