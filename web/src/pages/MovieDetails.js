import React, { Component } from 'react';
import { Grid, Container, Image, Segment, Icon, List, Button, Comment, Form, Header, Rating } from 'semantic-ui-react'
import NavBar from '../components/NavBar';

export default class MovieDetails extends Component {
    render() {
        return (
            <React.Fragment>
                < NavBar />
                <Container >
                    <Segment > 
                        <Grid columns='equal'   divided={'vertically'} padded style={{margin : 20}}>
                            <Grid.Row >
                                <Grid.Column >
                                    <Header as='h1'>
                                        The Avengers
                                </Header>
                                </Grid.Column>
                                    
                                <Grid.Column textAlign={"right"} >
                                        <Button circular icon='thumbs up'  size={'big'}/>
                                        <Button circular icon='eye'  size={'big'}/>
                                        <Button circular icon='plus'  size={'big'}/>
                                        <Button circular icon='share alternate'  size={'big'}/>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>

                                
                                <Grid.Column >
                                    <List >
                                        <List.Item>
                                            <br /><br />
                                        </List.Item>
                                        <List.Item as='a'>
                                            <Icon name='star' color={"yellow"}/>
                                            <List.Content>
                                                <List.Header>Rating</List.Header>
                                                <List.Description>
                                                    4.7<br /><br />
                                                </List.Description>
                                            </List.Content>
                                        </List.Item>
                                        <List.Item as='a'>
                                            <Icon name='calendar alternate outline' />
                                            <List.Content>
                                                <List.Header>Release Date</List.Header>
                                                <List.Description>
                                                    2012<br /><br />
                                                </List.Description>
                                            </List.Content>
                                        </List.Item>
                                        <List.Item as='a'>
                                            <Icon name='map outline' />
                                            <List.Content>
                                                <List.Header>Director</List.Header>
                                                <List.Description>
                                                    Joss Whedon <br /><br />
                                                </List.Description>
                                            </List.Content>
                                        </List.Item>
                                        <List.Item as='a'>
                                            <Icon name='map outline' />
                                            <List.Content>
                                                <List.Header>Genre</List.Header>
                                                <List.Description>
                                                    Comic, Action<br /><br />
                                                </List.Description>
                                            </List.Content>
                                        </List.Item>
                                        <List.Item as='a'>
                                            <Icon name='map outline' />
                                            <List.Content>
                                                <List.Header>Cast</List.Header>
                                                <List.Description>
                                                    Robert Downey Jr., Mark Ruffalo, Chris Evans, Scarlett Johansson
                                                </List.Description>
                                            </List.Content>
                                        </List.Item>
                                    </List>
                                    
                                </Grid.Column>
                                <Grid.Column width={4}>
                                    <Image src={'https://upload.wikimedia.org/wikipedia/en/8/8a/The_Avengers_%282012_film%29_poster.jpg'} />
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column>
                                    <Header as='h3' >
                                        About the Movie
                                    </Header>
                                    <p>
                                        Earth's mightiest heroes must come together and learn to fight as a team if they are going to stop the mischievous Loki and his alien army from enslaving humanity.
                                    </p>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column stretched>
                                <Comment.Group>
                            <Header as='h3' >
                                User Reviews
                        </Header>
                            <Comment>
                                <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
                                <Comment.Content>
                                    <Comment.Author as='a'>Matt</Comment.Author>
                                    <Comment.Metadata>
                                        <div>Today at 5:42PM</div>
                                    </Comment.Metadata>
                                    <Comment.Text>How artistic!</Comment.Text>
                                    <Comment.Actions>
                                        <Comment.Action>Reply</Comment.Action>
                                    </Comment.Actions>
                                </Comment.Content>
                            </Comment>

                            <Comment>
                                <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/elliot.jpg' />
                                <Comment.Content>
                                    <Comment.Author as='a'>Elliot Fu</Comment.Author>
                                    <Comment.Metadata>
                                        <div>Yesterday at 12:30AM</div>
                                    </Comment.Metadata>
                                    <Comment.Text>
                                        <p>This has been very useful for my research. Thanks as well!</p>
                                    </Comment.Text>
                                    <Comment.Actions>
                                        <Comment.Action>Reply</Comment.Action>
                                    </Comment.Actions>
                                </Comment.Content>
                                <Comment.Group>
                                    <Comment>
                                        <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/jenny.jpg' />
                                        <Comment.Content>
                                            <Comment.Author as='a'>Jenny Hess</Comment.Author>
                                            <Comment.Metadata>
                                                <div>Just now</div>
                                            </Comment.Metadata>
                                            <Comment.Text>Elliot you are always so right :)</Comment.Text>
                                            <Comment.Actions>
                                                <Comment.Action>Reply</Comment.Action>
                                            </Comment.Actions>
                                        </Comment.Content>
                                    </Comment>
                                </Comment.Group>
                            </Comment>

                            <Comment>
                                <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/joe.jpg' />
                                <Comment.Content>
                                    <Comment.Author as='a'>Joe Henderson</Comment.Author>
                                    <Comment.Metadata>
                                        <div>5 days ago</div>
                                    </Comment.Metadata>
                                    <Comment.Text>Dude, this is awesome. Thanks so much</Comment.Text>
                                    <Comment.Actions>
                                        <Comment.Action>Reply</Comment.Action>
                                    </Comment.Actions>
                                </Comment.Content>
                            </Comment>

                            <Form reply>
                                How was this Movie?  <Rating icon='star' defaultRating={0} maxRating={5}/>
                                <Form.TextArea />

                                <Button content='Add Reply' labelPosition='left' icon='edit' primary />
                            </Form>
                        </Comment.Group>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>



                        

                       


                    </Segment>
                </Container>


            </React.Fragment>
        )
    }
}
