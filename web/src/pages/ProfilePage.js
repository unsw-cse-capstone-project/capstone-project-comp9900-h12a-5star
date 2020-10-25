import React , { Component } from 'react'
import { Tab, Container, Grid, Card, Icon, Image, Button, Input, Header, Divider } from 'semantic-ui-react'
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
                            
                            <Header as= "h1">Mathew Wade</Header>
                            <Input transparent={this.state.editTransparent} disabled={this.state.editDisabled} placeholder='Mathew'  />
                                {
                                    (this.state.edit) &&
                                    <div>
                                        <br/>
                                        <Button size={"small"} circular color={"red"} onClick={this.handleClick_cancelEdit}> 
                                            <Icon name='close' /> 
                                            Cancel 
                                        </Button>
                                    </div>
                                }
                                <br />
                                <br />
                                <Divider />
                            <Button color={"purple"} onClick={this.handleClick_edit}>
                                <center>
                                    <br />
                                    <Icon name='pencil' size="big" /> <br /> <br /> Edit Profile
                                </center>
                            </Button>
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
                            
                        </center>
                    </div>
                </Container>
            </React.Fragment>
        );
    }
}
