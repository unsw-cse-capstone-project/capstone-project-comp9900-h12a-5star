import React, { Component } from 'react'
import { Card, Image } from 'semantic-ui-react'
import { Button, Dimmer, Rating } from 'semantic-ui-react'

import {
  Link,
} from "react-router-dom";

  export default class MovieTile extends Component {

    
    state ={}
    // state = this.setState(this.props.value)
    // mut  = this.props.mutateState()
    // 
  
    handleShow = () => this.setState({ active: true })
    handleHide = () => this.setState({ active: false })
  
    clickViewDetails = () => {
        // window.location.href={`/movieDetails/${this.props.MovieTile}`}
    }

    render() {
      const { active } = this.state
      
      const content = (
        <div>
          <Button primary><Link style={{ color: '#FFF' }} className="MovieDetails" key={this.props.movieId} to= {`/movieDetails/${this.props.movieId}`}>
            View Details
        </Link></Button>
        </div>
      )
  
      return (
        <React.Fragment>
            <Card>
      <Dimmer.Dimmable
          as={Image}
          dimmed={active}
          dimmer={{ active, content }}
          onMouseEnter={this.handleShow}
          onMouseLeave={this.handleHide}
          size='medium'
          src= {this.props.poster}
        />
      <Card.Content>
        <Card.Header>{this.props.title.substring(0,24)}</Card.Header>
        <Card.Meta><Rating icon='star' defaultRating={1} maxRating={1} disabled/> {this.props.rating}  </Card.Meta>
        <Card.Description>
          {this.props.description.substring(0,100)} ... 
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        Released in {this.props.release.substring(0,4)} 
      </Card.Content>
    </Card> 
        </React.Fragment>
        
      )
    }
  }