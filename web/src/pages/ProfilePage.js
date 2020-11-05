import React , { Component, createRef } from 'react'
import { Tab, Container, Grid, Card, Icon, Image, Button, Input, Header, Divider,Form, Label, Ref, Dropdown, List } from 'semantic-ui-react'

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
            editTransparent: true,
            editDisabled: true,
            edit: false,
            firstName: "",
            lastName: "",
            gender : "",
            languages : [],
            generes : [],
            profilePic : "" 
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
            body: JSON.stringify({ username: this.user })
        };

        // const username = "roko1234"

        fetch("http://127.0.0.1:8000/api/profile/"+{"username":this.user}, requestOptions)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result,
                        firstName: result.data.firstname,
                        lastName: result.data.lastname,
                        gender : result.data.gender,
                        languages: result.data.languages,
                        generes: result.data.genres,
                        profilePic: result.data.profilePic
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

    handle_edit_profile= () =>{
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: this.user, 
                                    firstname: this.state.firstName, 
                                    lastname: this.state.lastName, 
                                    gender: this.state.gender,
                                    genres: this.state.generes,
                                    languages: this.state.languages })
        }

        fetch("http://127.0.0.1:8000/api/profile/"+{"username":this.user}, requestOptions)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result,
                        firstName: result.data.firstname,
                        lastName: result.data.lastname,
                        gender : result.data.gender,
                        languages: result.data.languages,
                        generes: result.data.genres,
                        profilePic: result.data.profilePic
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )

            window.location.reload(false)
    }

    render() {

        return(
            <React.Fragment>
                <Container>
                    <div style={{backgroundImage: `url(${require("../images/profileBackground.jpg")})`, height: 300}}>
                        <br />
                        <br />
                        <br /><br /><br /><br />
                        <center>
                            <Image src={this.state.profilePic} circular size={"medium"} spaced={"left"}/>
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
                                                (this.state.items.data.gender === "male")?
                                                <Icon name='man'  />
                                                :
                                                <Icon name='woman'  />
                                            }
                                            {this.state.items.data.gender.charAt(0).toUpperCase()+this.state.items.data.gender.slice(1)}
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
                                        <Label.Detail>{this.state.items.data.email}</Label.Detail>
                                    </Label>
                                   

                                    <List className='profile'>
                                            <List.Item>
                                                <List.Content>
                                                    <List.Header><Icon name='globe' />Genre Preference</List.Header>
                                                    <List.Description>
                                                        <Label.Group>
                                                            {
                                                                this.state.items.data.genres.map((item)=>
                                                                <Label as='a' color='blue'>{item}</Label>
                                                                )
                                                            }
                                                        </Label.Group>
                                                    </List.Description>
                                                </List.Content>
                                            </List.Item>
                                        </List>

                                        <List className='profile'>
                                            <List.Item>
                                                <List.Content>
                                                    <List.Header><Icon name='language' />Language Preference</List.Header>
                                                    <List.Description>
                                                        <Label.Group>
                                                            {
                                                                this.state.items.data.languages.map((item)=>
                                                                <Label as='a' color='blue'>{item}</Label>
                                                                )
                                                            }
                                                        </Label.Group>
                                                    </List.Description>
                                                </List.Content>
                                            </List.Item>
                                        </List>
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
                                            <input defaultValue={this.state.items.data.firstname} onChange={(event) =>  this.setState({firstName : event.target.value})} required />
                                        </Form.Field>
                                        <Form.Field width={5}>
                                            <label>Last Name</label>
                                            <input defaultValue={this.state.items.data.lastname} onChange={(event) =>  this.setState({lastName : event.target.value})} required/>
                                        </Form.Field>
                                        
                                        <Form.Field width={5}>
                                            <label>Gender</label>
                                            <Dropdown defaultValue={this.state.items.data.gender} onChange={(event, {value}) =>  this.setState({gender : value})} placeholder={this.state.items.data.gender} fluid selection options={this.genderOptions} required/>
                                        </Form.Field>
                                        <Form.Field width={5}>
                                            <label>Favorite Languages</label>
                                            <Dropdown  defaultValue={this.state.items.data.languages} onChange={(event, {value}) =>  this.setState({languages : value})} placeholder='Favorite Languages' fluid selection multiple options={this.languageOptions} required/>
                                        </Form.Field>
                                        <Form.Field width={5}>
                                            <label>Favorite Genere</label>
                                            <Dropdown  defaultValue={this.state.items.data.genres} onChange={(event, {value}) =>  this.setState({generes : value})} placeholder='Favorite Genres' fluid selection multiple options={this.genreOptions} required/>
                                        </Form.Field>
                                        
                                        <Button primary type='submit' onClick={this.handle_edit_profile}><Icon name="save" />Save Changes</Button>
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
