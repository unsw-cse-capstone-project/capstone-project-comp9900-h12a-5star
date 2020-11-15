import React, { Component } from 'react'
import { Card, Image } from 'semantic-ui-react'
import { Button, Dimmer, Rating } from 'semantic-ui-react'
import './style.css'

import {
  Link,
} from "react-router-dom";

  export default class MovieTile extends Component {

    
    state ={}
  
    handleShow = () => this.setState({ active: true })
    handleHide = () => this.setState({ active: false })

    render() {
      const { active } = this.state
      
      const content = (
        <div>
          <Button primary onClick={event => window.location.href = `/movieDetails/${this.props.movieId}`}>
              View Details
        </Button>
        </div>
      )
  
      return (
        <React.Fragment>
            <Card className='movie_card'>
            <Dimmer.Dimmable
                as={Image}
                dimmed={active}
                dimmer={{ active, content }}
                onMouseEnter={this.handleShow}
                onMouseLeave={this.handleHide}
                size='medium'
                src= {this.props.poster}
                className='movie_image'
              />
            <Card.Content>
              <Card.Header>{this.props.title}</Card.Header>
              <Card.Meta><Rating icon='star' defaultRating={1} maxRating={1} disabled/> {this.props.rating}  </Card.Meta>
              <Card.Description>
                {
                  (this.props.description)?
                  <p>
                    {this.props.description} ... 
                  </p>
                  :
                  <p>
                    Description not available
                  </p>
                }
                
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              {
                (this.props.release)?
                <p>
                  Released in {this.props.release.substring(0,4)}
                </p>
                :
                <p>
                  Release date not available
                </p>
              }
              
            </Card.Content>
          </Card> 
        </React.Fragment>
        
      )
    }
  }