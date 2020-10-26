import React , { Component, createRef } from 'react'
import { Tab, Container, Grid, Card, Icon, Image, Button, Input, Header, Divider,Sticky, Rail, Ref } from 'semantic-ui-react'
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
                            <Input transparent={this.state.editTransparent} disabled={this.state.editDisabled} placeholder='Mathew'  />
                            <br />
                            <Input transparent={this.state.editTransparent} disabled={this.state.editDisabled} placeholder='Mathew'  />
                            <br />
                            <Input transparent={this.state.editTransparent} disabled={this.state.editDisabled} placeholder='Mathew'  />
                                
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
                                <br /><br />
                                <br /><br />
                                <br /><br />
                                <br /><br />
                                <br /><br />
                                <br /><br />
                                <br /><br />
                                <br /><br />
                                <br /><br />
                                <br /><br />
                                <br /><br />
                                <br /><br />
                                <br /><br />
                                <br /><br />
                                <br /><br />
                                <br /><br />
                                <br /><br />
                                <br /><br />
                                <br /><br />
                                <br /><br />
                                <br /><br />
                                <br /><br />
                                <br /><br />
                                <br /><br />
                                <br /><br />
                                <br /><br />
                                <br /><br />
                                <br /><br />
                                <br />
                        </center>
                    </div>
                    
                                <Sticky context={this.contextRef} >
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
                                </Sticky>
                            
                    
                </Container>
                </Ref>
                
            </React.Fragment>
        );
    }
}
