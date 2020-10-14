import React, { Component } from 'react';
import _ from 'lodash'
import { Button, Container, Grid, Header, Icon, Item, Segment, Image, List , Divider} from 'semantic-ui-react';
import NavBar from '../components/NavBar';
import MovieTile from '../components/MovieTile';
import {
    Link,
  } from "react-router-dom";

export default class WishListPage extends Component {

    

    render() {

        if (this.props.match.params.userId === "guest"){
            window.location.href='/login'
        }

        return (
            <>
                <NavBar />
                <Container>
                    {/* <Header as='h1'>{this.props.match.params.userId}'s Wishlist</Header> */}
                    <Divider horizontal></Divider>
                    <Divider horizontal>
      <Header as='h1'>
        {this.props.match.params.userId.charAt(0).toUpperCase() + this.props.match.params.userId.slice(1)}'s Wishlist
      </Header>
    </Divider>
                    <Grid columns='equal' divided={'vertically'}>
                        <Grid.Row>
                            <Grid.Column width={2}>
                            <Image src='https://upload.wikimedia.org/wikipedia/en/8/8a/The_Avengers_%282012_film%29_poster.jpg' size='tiny'  />
                            </Grid.Column>
                            <Grid.Column width={2}>
                            <br/>
                            <Icon name='star' color={"yellow"}/> 4.7 <br/><br/>
                            <Icon name='calendar alternate outline' /> 2012
                            </Grid.Column>
                            <Grid.Column width={8}>
                            <br/><br/>
                                <Link style={{ color: 'black', fontSize:30}} className="MovieDetails" key={this.props.movieId} to= {`/movieDetails/${this.props.movieId}`}>
                                    <b>The Avengers</b>
                                </Link>
                            </Grid.Column>
                            <Grid.Column>
                                <br/><br/>
                                <Button primary floated='right'>View Details<Icon name='right chevron' />
                                </Button>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width={2}>
                            <Image src='https://upload.wikimedia.org/wikipedia/en/8/8a/The_Avengers_%282012_film%29_poster.jpg' size='tiny'  />
                            </Grid.Column>
                            <Grid.Column width={2}>
                            <br/>
                            <Icon name='star' color={"yellow"}/> 4.7 <br/><br/>
                            <Icon name='calendar alternate outline' /> 2012
                            </Grid.Column>
                            <Grid.Column width={8}>
                            <br/><br/>
                                <Link style={{ color: 'black', fontSize:30}} className="MovieDetails" key={this.props.movieId} to= {`/movieDetails/${this.props.movieId}`}>
                                    <b>The Avengers</b>
                                </Link>
                            </Grid.Column>
                            <Grid.Column>
                                <br/><br/>
                                <Button primary floated='right'>View Details<Icon name='right chevron' />
                                </Button>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width={2}>
                            <Image src='https://upload.wikimedia.org/wikipedia/en/8/8a/The_Avengers_%282012_film%29_poster.jpg' size='tiny'  />
                            </Grid.Column>
                            <Grid.Column width={2}>
                            <br/>
                            <Icon name='star' color={"yellow"}/> 4.7 <br/><br/>
                            <Icon name='calendar alternate outline' /> 2012
                            </Grid.Column>
                            <Grid.Column width={8}>
                            <br/><br/>
                                <Link style={{ color: 'black', fontSize:30}} className="MovieDetails" key={this.props.movieId} to= {`/movieDetails/${this.props.movieId}`}>
                                    <b>The Avengers</b>
                                </Link>
                            </Grid.Column>
                            <Grid.Column>
                                <br/><br/>
                                <Button primary floated='right'>View Details<Icon name='right chevron' />
                                </Button>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
                
                
            </>

        )
    }

}