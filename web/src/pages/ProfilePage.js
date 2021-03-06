import React , { Component } from 'react'
import { Container, Icon, Image, Button, Header, Divider,Form, Label, Modal, Dropdown, List } from 'semantic-ui-react'
import './style.css'
import {gender,genres,languages, maleProfile, femaleProfile} from '../components/genericLists';

export default class ProfilePage extends Component {

    // Store the values for teh dropdown menues
    genderOptions = gender
    genreOptions = genres
    languageOptions = languages
    maleProfile = maleProfile
    femaleProfile = femaleProfile

    //Constructor called at the time of page load
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
            profilePic : "",
            open: false 
        };
        if (window.sessionStorage.getItem('username') === null){
            window.sessionStorage.setItem('username', 'guest');
        }
        this.user = window.sessionStorage.getItem('username')
    }

    // Toggle the popup window for changing the profile avatar 
    setOpen(val){
        this.setState({open: val})
    }

    // function called when the components are loaded onto the page.It gets executed right after the constructor.
    // Performs an operation to pull the profile details of the user from the database.
    componentDidMount() {

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: this.user })
        };

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

    // Function to toggle the edit profle button 
    handleClick_edit = () =>{
        this.setState({edit: true})
        this.setState({editTransparent: false})
        this.setState({editDisabled: false})
    }

    // Function to toggle the cancel edit profile button
    handleClick_cancelEdit = () =>{
        this.setState({edit: false})
        this.setState({editTransparent: true})
        this.setState({editDisabled: true})
    }

    // Function to handle the updating of teh user profile
    handle_edit_profile= () =>{
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: this.user, 
                                    firstname: this.state.firstName, 
                                    lastname: this.state.lastName, 
                                    gender: this.state.gender,
                                    genres: this.state.generes,
                                    languages: this.state.languages,
                                    profilePic: this.state.profilePic })
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

    // Function to handle the edit profile avatar button
    handleClick_editAvatar = (val) => {
        this.setState({profilePic: val})
        this.setOpen(false)
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
                        {
                            (!this.state.edit) ?
                                (this.state.items.data) &&
                                <div>
                                    <Image src={this.state.items.data.profilePic} circular size={"medium"} spaced={"left"}/>
                                    <br />
                                    <br />
                            
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
                                    <Image src={this.state.profilePic} circular size={"medium"} spaced={"left"}/>
                                    <br />
                                    <Modal
                                        basic
                                        onClose={() => this.setOpen(false)}
                                        onOpen={() => this.setOpen(true)}
                                        open={this.state.open}
                                        size='small'
                                        trigger={<Button className="avatarEdit" >Change Avatar</Button>}
                                    >
                                        <Modal.Content>
                                            {
                                                (this.state.gender === "Male")?
                                                    this.maleProfile.map((item) =>
                                                        (item !== this.state.profilePic) &&
                                                        <Button className="avatarEdit" onClick={()=> this.handleClick_editAvatar(item)}><Image src={item} size="small"/></Button>
                                                )

                                                :
                                                this.femaleProfile.map((item) =>
                                                    (item !== this.state.profilePic) &&
                                                    <Button className="avatarEdit" onClick={()=> this.handleClick_editAvatar(item)}><Image src={item} size="small"/></Button>
                                                )
                                            }
                                            
                                        </Modal.Content>
                                        <Modal.Actions>
                                            <Button color='red' inverted onClick={() => this.setOpen(false)}>
                                                <Icon name='remove' /> Cancel
                                            </Button>
                                        </Modal.Actions>
                                    </Modal>
                                    <br />
                                    <br />
                                    {
                                    <Form>
                                        <Form.Field width={5}>
                                            <label>Username</label>
                                            <input defaultValue={this.user} disabled required/>
                                        </Form.Field>
                                        <Form.Field width={5}>
                                            <label>Email</label>
                                            <input defaultValue={this.state.items.data.email} disabled required/>
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
                            <Button className="profileEdit" color={"purple"} onClick={this.handleClick_edit}>
                                <center>
                                    <br />
                                    <Icon name='pencil' size="big" /> <br /> <br /> Edit Profile
                                </center>
                            </Button>
                            
                                 :
                                <Button className="profileEdit" color={"red"} onClick={this.handleClick_cancelEdit}>
                                    <center>
                                        <br />
                                        <Icon name='pencil square' size="big" /> <br /> <br /> Cancel Edit
                                    </center>
                                </Button>
                            }
                            <Button className="profileEdit" color={"purple"} onClick={event => window.location.href = `/bannedlist/${this.user}`}>
                                <center>
                                    <br />
                                    <Icon name='remove user' size="big" /> <br /> <br /> Banned Users
                                </center>
                            </Button>
                            <Button className="profileEdit" color={"purple"} onClick={event => window.location.href = `/watchlist/${this.user}`}>
                                <center>
                                    <br />
                                    <Icon name='eye' size="big" /> <br /> <br /> Watch List
                                </center>
                            </Button>
                            <Button className="profileEdit" color={"purple"} onClick={event => window.location.href = `/FollowUser/${this.user}`}>
                                <center>
                                    <br />
                                    <Icon name='add user' size="big" /> <br /> <br /> Follow List
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
