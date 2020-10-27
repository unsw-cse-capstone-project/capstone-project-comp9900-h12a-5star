import React , { Component, createRef } from 'react'
import { Tab, Container, Grid, Card, Icon, Image, Button, Input, Header, Divider,Sticky, Label, Ref } from 'semantic-ui-react'
import NavBar from '../components/NavBar';



export default class WishListPage extends Component {

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

    contextRef = createRef()

    render() {

        return(
            <React.Fragment>
                
                <NavBar />
                <Ref innerRef={this.contextRef}>
                <Container>
                
                    <div style={{backgroundImage: `url(${require("../images/profileBackground.jpg")})`, height: 300}}>
                        <br />
                        <br />
                        <br /><br /><br /><br />
                        <center>
                            <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' circular size={"medium"} spaced={"left"}/>

                            <br />
                            
                            <Header as= "h1">Mathew Wade</Header>
                            {/* <Label as='a' color='teal'>
                            <Icon name='man'  />
                                Male
                            </Label> 
                            <br />
                            <br />*/}
                            <Label as='a' color='teal' >
                                Gender
                                <Label.Detail>
                                    <Icon name='man'  />
                                    Male
                                </Label.Detail>
                            </Label>
                            <br />
                            <br />
                            <Label as='a' color='red' >
                                <Icon name="hashtag" />
                                Username
                                <Label.Detail>roko@1234</Label.Detail>
                            </Label>
                            <Label as='a' color='red' >
                                <Icon name="at" />
                                Email
                                <Label.Detail>mathew@gmail.com</Label.Detail>
                            </Label>
                            <br />
                            <br />
                            <Label as='a' color='blue' >
                                <Icon name="globe" />
                                Genere Preference
                                <Label.Detail>Horror</Label.Detail>
                                <Label.Detail>Action</Label.Detail>
                            </Label>
                            {/* <Label as='a' color='blue'>
                                <Icon name='smile outline'  />
                                Genere
                            </Label>
                            <Label as='a' color='blue'>
                                
                                Action
                            </Label>
                            <Label as='a' color='blue'>
                            
                                Horror
                            </Label>
                            <br />
                            <br /> */}
                            <Label as='a' color='blue' >
                                <Icon name="language" />
                                Language Preference
                                <Label.Detail>Hindi</Label.Detail>
                                <Label.Detail>English</Label.Detail>
                            </Label>
                            {/* <Label as='a' color='yellow'>
                                <Icon name='language'  />
                                Language Preference
                            </Label>
                            <Label as='a' color='yellow'>
                                
                                Hindi
                            </Label>
                            <Label as='a' color='yellow'>
                            
                                English
                            </Label> */}
                            <br />
                            {/* <Input transparent={this.state.editTransparent} disabled={this.state.editDisabled} placeholder='Mathew'  />
                            <br />
                            <Input transparent={this.state.editTransparent} disabled={this.state.editDisabled} placeholder='Mathew'  />
                            <br />
                            <Input transparent={this.state.editTransparent} disabled={this.state.editDisabled} placeholder='Mathew'  /> */}
                                
                                <br />
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
                            <Button color={"purple"} onClick={this.handleClick_edit}>
                                <center>
                                    <br />
                                    <Icon name='remove user' size="big" /> <br /> <br /> Baned User
                                </center>
                            </Button>
                            <Button color={"purple"} onClick={this.handleClick_edit}>
                                <center>
                                    <br />
                                    <Icon name='eye' size="big" /> <br /> <br /> Watch list
                                </center>
                            </Button>
                            <br />
                            <br />
                                
                        </center>
                    </div>
                    
                                {/* <Sticky context={this.contextRef} >
                                    <Grid  >
                                        <Grid.Column width={2}>
                                            <Grid.Row padded>
                                                <Button color={"purple"} onClick={this.handleClick_edit} fluid>
                                                    <center>
                                                        <br />
                                                        <Icon name='remove user' size="big" /> <br /> <br /> Baned User
                                                    </center>
                                                </Button>
                                                <br></br>
                                            </Grid.Row>
                                            <Grid.Row>
                                                <Button color={"purple"} onClick={this.handleClick_edit} fluid>
                                                    <center>
                                                        <br />
                                                        <Icon name='eye' size="big" /> <br /> <br /> Watch list
                                                    </center>
                                                </Button>
                                            </Grid.Row>
                                        </Grid.Column>
                                    </Grid>
                                </Sticky> */}
                            
                    
                </Container>
                </Ref>
                
            </React.Fragment>
        );
    }
}
