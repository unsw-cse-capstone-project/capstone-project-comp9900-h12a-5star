import React, { Component } from 'react';
import { Button, Container, Grid, Header, Image, Divider, Message} from 'semantic-ui-react';

export default class WishListPage extends Component {

    //Constructor called at the time of page load
    constructor() {
        super();
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
        if (window.sessionStorage.getItem('username') === null){
            window.sessionStorage.setItem('username', 'guest');
        }
        this.user = window.sessionStorage.getItem('username')
    }

    // function called when the components are loaded onto the page.It gets executed right after the constructor.
    // Performs an operation to pull the banned user list from the database.
    componentDidMount() {

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({username: this.user})
        };

        fetch("http://127.0.0.1:8000/api/banUsername/", requestOptions)
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

    // Removes the banned user from the state so that it is instantly loaded on the page and a refresh is not required.
    revoveElement = (val) => {
        delete this.state.items.data[this.state.items.data.indexOf(val)]
        this.setState({item: this.state.items.data})
        var len = 0
        this.state.items.data.map(()=>
            len = len+1
        )
        if (len === 0){
            window.location.reload(false)
        }
        
    }

    // unban a user and send the request to the database
    removeFromBanlist = (val) => {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: this.user, bannedUsername:val.username, banStatus: false})
        };

        fetch("http://127.0.0.1:8000/api/banUsername/", requestOptions)
        this.revoveElement(val)
    }

    render() {
        return (
            <>
                <Container>
                    {/* title section of the application */}
                    <Divider horizontal></Divider>
                    <Divider horizontal>
                        <Header as='h1'>
                            {this.props.match.params.userId.charAt(0).toUpperCase() + this.props.match.params.userId.slice(1)}'s List of banned users
                    </Header>
                    </Divider>
                    {/* User list is loaded dynamically from the data received from the database */}
                    {
                        (this.state.items.data && this.state.items.data.length !== 0) ?
                            <Grid columns='equal' divided={'vertically'}>
                                {
                                    this.state.items.data.map((item) =>
                                        <Grid.Row>
                                            <Grid.Column width={2}>
                                                <Image src={item.profilePic} size='tiny' />
                                            </Grid.Column>
                                            <Grid.Column width={2}>
                                                <br />
                                                <p>{item.firstname.charAt(0).toUpperCase() + item.firstname.slice(1)}</p>
                                                <p>{item.lastname.charAt(0).toUpperCase() + item.lastname.slice(1)}</p>
                                            </Grid.Column>
                                            <Grid.Column width={8}>
                                                <p></p>
                                                <Header as="h1">{item.username.charAt(0).toUpperCase() + item.username.slice(1)}</Header>
                                            </Grid.Column>
                                            <Grid.Column>
                                                <p><br /></p>
                                                <Button circular floated='center' color='red' icon='close' onClick={() => this.removeFromBanlist(item)} />
                                            </Grid.Column>
                                        </Grid.Row>
                                    )
                                }
                            </Grid>
                            :
                            <Message>
                                {/* Message incase there are no users who are banned */}
                                <Message.Header>Your Banned List is Empty</Message.Header>
                                <p>
                                </p>
                            </Message>
                    }
                </Container>
                
                
            </>

        )
    }

}