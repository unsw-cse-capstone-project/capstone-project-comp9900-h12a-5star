import React, { Component } from 'react';
import { Grid, Form, Segment,  Button, Dropdown} from 'semantic-ui-react'
import NavBar from '../components/NavBar';
import {useState} from 'react';
import { Multiselect } from 'multiselect-react-dropdown';
import makeAnimated from 'react-select/animated';
import Select from 'react-select';

const SignUpPage = () => {
  


  const genderOptions = [
      {  label:'Male' ,value: 'Male'},
      { label:'Female', value: 'Female'},
    ]
  
  
  

  // var obj = {
  //   "email":"kar@gmail.com",
  //   "password":"karan",
  //   "genre":["Horror"],
  //   "language":["Chinlish"],
  //   "profile": 
  //       {
  //           "firstname":"kar",
  //           "lastname":"sin",
  //           "username":"kar",
  //           "gender":"Male",
  //           "genres":"",
  //           "languages":"English"
  //       }
  //     };

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

  // gender=setgender
  

  

  // handleDropdownChange = (event) => {
  //   this.setState({
  //     [event.target.name]: event.target.value
  //   })
  // }
  
  const checkSignUp = async () => {
    
    const genreSelected=[]
    const languageSelected=[]
    for (var i=0; i<genre.length;i++){
     
      genreSelected.push(genre[i].value)
    }
    console.log(genreSelected)
    for (var i=0; i<language.length;i++){
      // console.log(language[i].value)
      languageSelected.push(language[i].value)
    }
    console.log(languageSelected)
    const genderSelected=gender.value
    console.log(genderSelected)
    var obj = {"email": email, "password": password, "genre": genreSelected, "language": languageSelected,
              "profile": {"firstname": firstname, "lastname": lastname, "username": username,
            "gender": genderSelected, "genres": "", "languages":"English"}};
    console.log(obj)
    if (email !== '' & password !== ''){

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
            // window.sessionStorage.setItem('username', email);

            window.location.href='/login';
        }
        else{
            window.location.href='/login'
        }
    }
    else{
        setError('Either username or password not filled');
    }


};

return(



  
  <>
  <NavBar/>
  <div style={{ backgroundImage: `url(${require("../images/loginsignup.jpg")})` }}>
  
    <Grid>
      <Grid.Column width={5}></Grid.Column>
      <Grid.Column width={5} stretched>

      <Segment  inverted style={{margin: 15 }}>
      


        <h1 style={{textAlign:"center"}}>Sign Up</h1>
        <Form inverted>
          <Form.Group >
            <Form.Field width={16}>
              <label>First Name</label>
              <input value = {firstname} onChange= {(event) => setfirstname(event.target.value)} placeholder='First Name' required />
            </Form.Field>
          </Form.Group>

          <Form.Group >
            <Form.Field width={16}>
              <label>Last Name</label>
              <input value = {lastname} onChange= {(event) => setlastname(event.target.value)} placeholder='Last Name' required/>
            </Form.Field>
          </Form.Group>

          <Form.Group >
            <Form.Field width={16}>
              <label>Gender</label>
              <Select 
                options = {genderOptions} 
                onChange= {setgender}
                placeholder='Gender' 
                isSearchable 
                required
                />
                
            </Form.Field>
          </Form.Group>

          <Form.Group >
          
            <Form.Field width={16}>
              <label> Username</label>
              <input value = {username} onChange= {(event) => setusername(event.target.value)} placeholder='Username' required/>
            </Form.Field>
          </Form.Group>
      
          <Form.Group >
            <Form.Field width={16}>
              <label>Email</label>
              <input type='email' value = {email} onChange= {(event) => setemail(event.target.value)} placeholder='joe@schmoe.com' required/>
            </Form.Field>
          </Form.Group>

          <Form.Group >
            <Form.Field width={16}>
              <label>Password</label>
              <input type='password' value = {password} onChange= {(event) => setpassword(event.target.value)} placeholder='Password' required/>
            </Form.Field>
          </Form.Group>

          

          <Form.Group >
            <Form.Field width={16}>
              <label>Favorite Languages</label>
              <Select 
              options = {languageOptions} 
              onChange= {setlanguage} 
              placeholder='Favorite Languages' 
              isMulti
              autoFocus
              isSearchable 
              required
              />
            </Form.Field>
          </Form.Group>

          <Form.Group >
            <Form.Field width={16}>
              <label>Favorite Genres</label>
              <Select 
              options = {genreOptions} 
              onChange= {setgenre} 
              placeholder='Favorite Genres' 
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