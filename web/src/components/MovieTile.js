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
        <Card.Meta>Released in 2012 </Card.Meta>
        <Card.Description>
        The Avengers, is a 2012 American superhero film based on the Marvel Comics superhero team of the same name. 
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <a>
            <Rating icon='star' defaultRating={4} maxRating={5} disabled/>
        </a>
      </Card.Content>
    </Card> 
        </React.Fragment>
        
      )
    }
  }