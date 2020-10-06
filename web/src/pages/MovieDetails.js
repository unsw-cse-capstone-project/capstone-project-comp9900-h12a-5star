import React, { Component } from 'react';
import { Grid, Container, Image, Segment, Icon, List, Button, Comment, Form, Header } from 'semantic-ui-react'
import NavBar from '../components/NavBar';

export default class MovieDetails extends Component {
    render() {
        return (
            <React.Fragment>
                < NavBar />
                <Container>
                    <Segment>
                        <Image src={'https://upload.wikimedia.org/wikipedia/en/8/8a/The_Avengers_%282012_film%29_poster.jpg'} />
                        <List>
                            <List.Item as='a'>
                                <Icon name='help' />
                                <List.Content>
                                    <List.Header>Floated Icon</List.Header>
                                    <List.Description>
                                        This text will always have a left margin to make sure it sits
                                        alongside your icon
                                    </List.Description>
                                </List.Content>
                            </List.Item>
                            <List.Item as='a'>
                                <Icon name='right triangle' />
                                <List.Content>
                                    <List.Header>Icon Alignment</List.Header>
                                    <List.Description>
                                        Floated icons are by default top aligned. To have an icon top aligned
                                        try this example.
                                    </List.Description>
                                </List.Content>
                            </List.Item>
                            <List.Item>
                                <Icon name='help' />
                                Inline Text
                            </List.Item>
                        </List>


                        <Comment.Group>
                            <Header as='h3' dividing>
                                Reviews
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
                                <Form.TextArea />
                                <Button content='Add Reply' labelPosition='left' icon='edit' primary />
                            </Form>
                        </Comment.Group>


                    </Segment>
                </Container>


            </React.Fragment>
        )
    }
}
