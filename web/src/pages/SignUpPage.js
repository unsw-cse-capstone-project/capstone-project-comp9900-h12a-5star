import React from 'react';
import { Form, Input, TextArea, Button, Select, Checkbox, Dropdown,Icon} from 'semantic-ui-react'

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


const SignUpPage = () => (
    <>
      <h1>Sign Up</h1>
      <Form>
        <Form.Field>
          <label>First Name</label>
          <input placeholder='First Name' />
        </Form.Field>

        <Form.Field>
          <label>Last Name</label>
          <input placeholder='Last Name' />
        </Form.Field>

        <Form.Field>
          <label>Gender</label>
          <Dropdown placeholder='Gender' fluid selection options={genderOptions} />
        </Form.Field>

        <Form.Field>
          <label>Favorite Languages</label>
          <Dropdown placeholder='Favorite Languages' fluid multiple selection options={languageOptions} />
        </Form.Field>

        <Form.Field>
          <label>Favorite Genres</label>
          <Dropdown placeholder='Favorite Genres' fluid multiple selection options={genreOptions} />
        </Form.Field>

        <Form.Field>
          <Checkbox label='I agree to the Terms and Conditions' />
        </Form.Field>

        <Button type='submit'>Join Now</Button>
      </Form>
    </>
    
    
);

export default SignUpPage;