import React , { Component } from 'react'
import { Tab, Container, Grid, Card, Icon, Image, Button, Input } from 'semantic-ui-react'
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

        const panes = [
            {
              menuItem: 'Ban List',
              render: () => <Button primary onClick={event =>  window.location.href=`/bannedlist/${this.user}` }>View your Banned list</Button>
            },
            {
              menuItem: 'Watch List',
              render: () => 
              <Button primary onClick={event =>  window.location.href=`/Watchlist/${this.user}` }>View your Watch list</Button>
              
              ,
            }
        ]

        return(
            <React.Fragment>
                <NavBar />
                <Container>
                    <Grid >
                        <Grid.Column width={5}>
                        <Card>
                            <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' wrapped ui={false} />
                            <Card.Content>
                            <Card.Header>
                                {this.user}
                                <Button circular floated={"right"} icon='pencil' onClick={this.handleClick_edit}/>
                            </Card.Header>
                            <Card.Meta>
                                <span className='date'>Joined in 2015</span>
                            </Card.Meta>
                            <Card.Description>
                                Matthew is a musician living in Nashville.
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
                            </Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                            <a>
                                <Icon name='user' />
                                22 Friends
                            </a>
                            </Card.Content>
                        </Card>
                        </Grid.Column>
                        <Grid.Column width={10}>
                            <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
                        </Grid.Column>
                    </Grid>
                    

                    
                </Container>
                

                
            </React.Fragment>
        );
    }
}
