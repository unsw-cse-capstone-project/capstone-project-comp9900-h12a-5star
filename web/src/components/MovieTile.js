import React, { Component } from 'react'
import { Card, Image } from 'semantic-ui-react'
import { Button, Dimmer, Rating } from 'semantic-ui-react'



  export default class MovieTile extends Component {

    
    state ={}
    // state = this.setState(this.props.value)
    // mut  = this.props.mutateState()
    // 
  
    handleShow = () => this.setState({ active: true })
    handleHide = () => this.setState({ active: false })
  
    clickViewDetails = () => {
        window.location.href='/movieDetails'
    }

    render() {
      console.log('I was triggered during render')
      const { active } = this.state
      
      const content = (
        <div>
          <Button primary onClick={this.clickViewDetails}>View Details</Button>
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
        <Card.Header>{this.props.title}</Card.Header>
        <Card.Meta><Rating icon='star' defaultRating={1} maxRating={1} disabled/> {this.props.rating}  </Card.Meta>
        <Card.Description>
        The Avengers, is a 2012 American superhero film based on the Marvel Comics superhero team of the same name. 
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <a>
        Released in 2012
        </a>
      </Card.Content>
    </Card> 
        </React.Fragment>
        
      )
    }
  }