import React from 'react';
import { Form, Input, TextArea, Button, Select, Checkbox, Dropdown} from 'semantic-ui-react'

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
          <label>Favorite Languages</label>
          <Dropdown placeholder='Favorite Languages' fluid multiple selection options={languageOptions} />
        </Form.Field>
        <Form.Field>
          <Checkbox label='I agree to the Terms and Conditions' />
        </Form.Field>
        <Button type='submit'>Join Now</Button>
      </Form>
    </>
    
    
);

export default SignUpPage;