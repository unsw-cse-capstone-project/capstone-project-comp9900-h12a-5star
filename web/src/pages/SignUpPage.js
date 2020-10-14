import React from 'react';
import { Grid, Form, Segment,  Button, Dropdown} from 'semantic-ui-react'
import NavBar from '../components/NavBar';
import {useState} from 'react';

const SignUpPage = () => {
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [genre, setgenre] = useState('');
  const [language, setlanguage] = useState('');
  const [firstname, setfirstname] = useState('');
  const [lastname, setlastname] = useState('');
  const [username, setusername] = useState('');
  const [gender, setgender] = useState('');
  const [error, setError] = useState('');


  const genderOptions = [
      { key: 'm', text: 'Male', value: 'male' },
      { key: 'f', text: 'Female', value: 'female' },
    ]
  
  
  var obj = {"email": email, "password": password, "genre": ["Horror"], "language": ["English"],
              "profile": {"firstname": firstname, "lastname": lastname, "username": username,
            "gender": "Male", "genres": "", "languages":"English"}};

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

  const checkSignUp = async () => {
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
              <Dropdown value = {gender} onChange= {(event) => setgender(event.target.value)} placeholder='Gender' fluid selection options={genderOptions} required/>
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
              <Dropdown value = {language} onChange= {(event) => setlanguage(event.target.value)} placeholder='Favorite Languages' fluid selection multiple options={languageOptions} required/>
            </Form.Field>
          </Form.Group>

          <Form.Group >
            <Form.Field width={16}>
              <label>Favorite Genres</label>
              <Dropdown value = {genre} onChange= {(event) => setgenre(event.target.value)} placeholder='Favorite Genres' fluid selection multiple options={genreOptions} required/>
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