import React, { Component } from 'react';
import _ from 'lodash'
import { Button, Container, Grid, Header, Icon, Image, Divider, Message} from 'semantic-ui-react';

export default class WishListPage extends Component {

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

    revoveElement = (val) => {
        delete this.state.items.data[this.state.items.data.indexOf(val)]
        //console.log(this.state.items.data)
        // this.state.items = this.state.items
        this.setState({item: this.state.items.data})
        var len = 0
        this.state.items.data.map(()=>
            len = len+1
        )
        if (len === 0){
            window.location.reload(false)
        }
        
    }
    removeFromBanlist = (val) => {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            // body: JSON.stringify({ id: this.props.match.params.movieId, user: this.user })
            body: JSON.stringify({ username: this.user, bannedUsername:val.username, banStatus: false})
        };

        fetch("http://127.0.0.1:8000/api/banUsername/", requestOptions)
        this.revoveElement(val)
        // window.location.reload(false
    }

    render() {

        if (this.props.match.params.userId === "guest"){
            window.location.href='/login'
        }

        return (
            <>
                <Container>
                    {/* <Header as='h1'>{this.props.match.params.userId}'s Wishlist</Header> */}
                    <Divider horizontal></Divider>
                    <Divider horizontal>
                        <Header as='h1'>
                            {this.props.match.params.userId.charAt(0).toUpperCase() + this.props.match.params.userId.slice(1)}'s List of banned users
                    </Header>
                    </Divider>
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
                                                <Button circular floated='center' color='red' icon='close' onClick={() => this.removeFromBanlist(item)} />
                                            </Grid.Column>
                                        </Grid.Row>
                                    )
                                }

                            </Grid>
                            :
                            <Message>
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