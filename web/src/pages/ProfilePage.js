import React , { Component, createRef } from 'react'
import { Tab, Container, Grid, Card, Icon, Image, Button, Input, Header, Divider,Form, Label, Ref, Dropdown } from 'semantic-ui-react'
import NavBar from '../components/NavBar';
import SignUpPage from '../pages/SignUpPage';


export default class ProfilePage extends Component {

    genderOptions = [
        { key: 'm', text: 'Male', value: 'male' },
        { key: 'f', text: 'Female', value: 'female' },
    ]
    
    genreOptions = [
        { key: 'Action', text: 'Action', value: 'Action' },
        { key: 'Adventure', text: 'Adventure', value: 'Adventure' },
        { key: 'Comedy', text: 'Comedy', value: 'Comedy' },
        { key: 'Crime', text: 'Crime', value: 'Crime' },
        { key: 'Crama', text: 'Drama', value: 'Drama' },
        { key: 'Family', text: 'Family', value: 'Family' },
        { key: 'Fantasy', text: 'Fantasy', value: 'Fantasy' },
        { key: 'Horror', text: 'Horror', value: 'Horror' },
        { key: 'Mystery', text: 'Mystery', value: 'Mystery' },
        { key: 'Romance', text: 'Romance', value: 'Romance' },
        { key: 'Sciencefiction', text: 'Science Fiction', value: 'Sciencefiction' },
        { key: 'Thriller', text: 'Thriller', value: 'Thriller' },
        
    ]

    languageOptions = [
        { key: 'English', text: 'English', value: 'English' },
        { key: 'Gujrati', text: 'Gujrati', value: 'Gujrati' },
        { key: 'Hindi', text: 'Hindi', value: 'Hindi' },
        { key: 'Kannada', text: 'Kannada', value: 'Kannada' },
        { key: 'Marathi', text: 'Marathi', value: 'Marathi' },
        { key: 'Mandarin Chinese', text: 'Mandarin Chinese', value: 'Mandarin Chinese' },
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
            editTransparent: true,
            editDisabled: true,
            edit: false
        };
        if (window.sessionStorage.getItem('username') === null){
            window.sessionStorage.setItem('username', 'guest');
        }
        this.user = window.sessionStorage.getItem('username')
    }

    componentDidMount() {

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: this.user, reviewerUsername: this.props.match.params.userId })
        };

        // const username = "roko1234"

        fetch("http://127.0.0.1:8000/api/profile/"+{"username":this.user}, requestOptions)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    handleClick_edit = () =>{
        this.setState({edit: true})
        this.setState({editTransparent: false})
        this.setState({editDisabled: false})
    }
    handleClick_cancelEdit = () =>{
        this.setState({edit: false})
        this.setState({editTransparent: true})
        this.setState({editDisabled: true})
    }

    // contextRef = createRef()

    render() {

        return(
            <React.Fragment>
                
                <NavBar />
                <Container>
                    <div style={{backgroundImage: `url(${require("../images/profileBackground.jpg")})`, height: 300}}>
                        <br />
                        <br />
                        <br /><br /><br /><br />
                        <center>
                            <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' circular size={"medium"} spaced={"left"}/>
                            <br />
                            <br />
                            {
                            (!this.state.edit) ?
                                (this.state.items.data) &&
                                <div>
                                    <Header as= "h1">
                                        {this.state.items.data.firstname.charAt(0).toUpperCase()+this.state.items.data.firstname.slice(1)+" "+this.state.items.data.lastname.charAt(0).toUpperCase()+this.state.items.data.lastname.slice(1)}
                                    </Header>
                                    
                                    <Label as='a' color='teal' >
                                        Gender
                                        <Label.Detail>
                                            {
                                                (this.state.items.data.gender === "Male")?
                                                <Icon name='man'  />
                                                :
                                                <Icon name='woman'  />
                                            }
                                            {this.state.items.data.gender}
                                        </Label.Detail>
                                    </Label>
                                    <br />
                                    <br />
                                    <Label as='a' color='red' >
                                        <Icon name="hashtag" />
                                        Username
                                        <Label.Detail>{this.user}</Label.Detail>
                                    </Label>
                                    <Label as='a' color='red' >
                                        <Icon name="at" />
                                        Email
                                        <Label.Detail>placeholder@gmail.com</Label.Detail>
                                    </Label>
                                    <br />
                                    <br />
                                    <Label as='a' color='blue' >
                                        <Icon name="globe" />
                                        Genere Preference
                                        {
                                            this.state.items.data.genres.map((item)=>
                                            <Label.Detail>{item}</Label.Detail>
                                            )
                                        }
                                    </Label>
                                    <Label as='a' color='blue' >
                                        <Icon name="language" />
                                        Language Preference
                                        {
                                            this.state.items.data.languages.map((item)=>
                                            <Label.Detail>{item}</Label.Detail>
                                            )
                                        }
                                    </Label>
                                    <br />
                                </div>
                                :
                                <div>
                                    <br />

                                    {
                                    <Form>
                                        <Form.Field width={5}>
                                            <label>Username</label>
                                            <input defaultValue={this.user} disabled required/>
                                        </Form.Field>
                                        <Form.Field width={5}>
                                            <label>Email</label>
                                            <input defaultValue='placeholder@gmail.com' disabled required/>
                                        </Form.Field>
                                        <Form.Field width={5}>
                                            <label>First Name</label>
                                            <input defaultValue={this.state.items.data.firstname} required />
                                        </Form.Field>
                                        <Form.Field width={5}>
                                            <label>Last Name</label>
                                            <input defaultValue={this.state.items.data.lastname} required/>
                                        </Form.Field>
                                        
                                        <Form.Field width={5}>
                                            <label>Gender</label>
                                            <Dropdown defaultValue={this.state.items.data.gender} placeholder={this.state.items.data.gender} fluid selection options={this.genderOptions} required/>
                                        </Form.Field>
                                        <Form.Field width={5}>
                                            <label>Favorite Languages</label>
                                            <Dropdown  defaultValue={this.state.items.data.languages} placeholder='Favorite Languages' fluid selection multiple options={this.languageOptions} required/>
                                        </Form.Field>
                                        <Form.Field width={5}>
                                            <label>Favorite Genere </label>
                                            <Dropdown  defaultValue={this.state.items.data.genres} placeholder='Favorite Genres' fluid selection multiple options={this.genreOptions} required/>
                                        </Form.Field>
                                        
                                        <Button primary type='submit'><Icon name="save" />Save Changes</Button>
                                    </Form>
                                    }
                                </div>
                        }
                        
                                
                                <br />
                                <Divider />
                            {
                                (!this.state.edit)?
                            <Button color={"purple"} onClick={this.handleClick_edit}>
                                <center>
                                    <br />
                                    <Icon name='pencil' size="big" /> <br /> <br /> Edit Profile
                                </center>
                            </Button>
                            
                                 :
                                <Button color={"red"} onClick={this.handleClick_cancelEdit}>
                                    <center>
                                        <br />
                                        <Icon name='pencil square' size="big" /> <br /> <br /> Cancel Edit
                                    </center>
                                </Button>
                            }
                            <Button color={"purple"} onClick={event => window.location.href = `/bannedlist/${this.user}`}>
                                <center>
                                    <br />
                                    <Icon name='remove user' size="big" /> <br /> <br /> Baned User
                                </center>
                            </Button>
                            <Button color={"purple"} onClick={event => window.location.href = `/watchlist/${this.user}`}>
                                <center>
                                    <br />
                                    <Icon name='eye' size="big" /> <br /> <br /> Watch list
                                </center>
                            </Button>
                            <br />
                            <br />
                        </center>
                    </div>
                    
                </Container>
                
            </React.Fragment>
        );
    }
}
