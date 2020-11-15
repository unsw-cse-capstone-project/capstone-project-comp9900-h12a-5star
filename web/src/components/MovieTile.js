import React, { Component } from 'react'
import { Card, Icon, Image, Button, Dimmer } from 'semantic-ui-react'
import './style.css'


// This class component is designed to show movie details in the title format.
// This class will be used on all pages where the movie information has to be shown
export default class MovieTile extends Component {

  state = {}

  //functions to handle the hover effect of movie card
  handleShow = () => this.setState({ active: true })
  handleHide = () => this.setState({ active: false })

  render() {
    const { active } = this.state

    // The content which appears when hovered on the image
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
            src={this.props.poster}
            className='movie_image'
          />
          <Card.Content>
            <Card.Header>{this.props.title}</Card.Header>
            <Card.Meta><Icon name='chart pie' color={(this.props.rating >4) ? 'green' : ((this.props.rating >2.5) ? 'yellow' : 'orange')} />  {this.props.rating * 20}%  </Card.Meta>
            <Card.Description>
              {
                (this.props.description) ?
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
              (this.props.release) ?
                <p>
                  Released in {this.props.release.substring(0, 4)}
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