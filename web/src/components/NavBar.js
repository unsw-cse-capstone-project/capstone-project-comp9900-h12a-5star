import React, { Component } from 'react'

import { Icon, Button, Menu, Segment, Search, Image, Popup, Feed } from 'semantic-ui-react'

import { Icon, Button, Menu, Segment, Search, Image, Input } from 'semantic-ui-react'

import _ from 'lodash'
import faker from 'faker'


const source=[
  {
    "title": "Gabriel's Inferno Part I",
    "description": "Professor Gabriel Emerson finally learns the truth",
    "image": "https://s3.amazonaws.com/uifaces/faces/twitter/_kkga/128.jpg",
    "price": "4.5"
  },
  {
    "title": "The Shawshank Redemption",
    "description": "Framed in the 1940s for the double",
    "image": "https://s3.amazonaws.com/uifaces/faces/twitter/saschadroste/128.jpg",
    "price": "4.3"
  },
  {
    "title": "The Craft: Legacy",
    "description": "Ameliorated asymmetric open system",
    "image": "https://s3.amazonaws.com/uifaces/faces/twitter/salleedesign/128.jpg",
    "price": "3.4"
  },
  {
    "title": "Hard Kill",
    "description": "User-centric motivating process improvement",
    "image": "https://s3.amazonaws.com/uifaces/faces/twitter/madebyvadim/128.jpg",
    "price": "2.1"
  },
  {
    "title": "Once Upon a Snowman",
    "description": "The previously untold origins of Olaf,",
    "image": "https://s3.amazonaws.com/uifaces/faces/twitter/alevizio/128.jpg",
    "price": "3.9"
  }
]


// const source = _.times(3, () => ({
//   title: faker.company.companyName(),
//   description: faker.company.catchPhrase(),
//   image: faker.internet.avatar(),
// }))

const initialState = { isLoading: false, results: [], value: '' }

export default class MenuExampleInvertedSegment extends Component {
  state = { activeItem: 'home', isLoading: false, results: [], value: '' }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name })
    if (name === 'browse') {
      window.location.href='/browse'
    }
    else if (name === 'home'){
      window.location.href='/welcome'
    }
    else if (name === 'my wishlist'){
      if (window.sessionStorage.getItem('username') === null){
        window.sessionStorage.setItem('username', "guest");
      }

      window.location.href=`/wishlist/${window.sessionStorage.getItem('username')}`
      // if (window.sessionStorage.getItem('username') === null || window.sessionStorage.getItem('username') === "guest"){
      //   window.location.href='/login'
      // }
      // else{
      //   window.location.href='/wishlist'
      // }
    }
    else if (name === 'my profile'){
      if (window.sessionStorage.getItem('username') === null || window.sessionStorage.getItem('username') === "guest"){
        window.location.href='/login'
      }
      else{
        window.location.href='/myprofile' 
      }
    }
  }

  performLogout = async () => {
    window.sessionStorage.setItem('username', "guest");
    window.location.href='/login'
  }

  handleResultSelect = (e, { result }) => this.setState({ value: result.title })

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })

    setTimeout(() => {
      if (this.state.value.length < 1) return this.setState(initialState)

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = (result) => re.test(result.title)

      this.setState({
        isLoading: false,
        results: _.filter(source, isMatch),
      })
    }, 300)
  }
  // handleSubmit = (e, { value }) => {
  //   this.setState({ isLoading: true, value })
  //   window.location.href=`/search/${value}`
    
  // }

  render() {
    const { activeItem, isLoading, value, results } = this.state
    console.log(value)

    const image = 'https://react.semantic-ui.com/images/avatar/large/laura.jpg'
    const date = '3 days ago'
    const summary = 'roku1234 added a new review on Gabriels Inferno Part II'
    const extraText = "Have you seen what's going on in Israel? Can you believe it."

    const style = {
      width: 450
    }

    return (
      <Segment inverted>
        <Menu inverted secondary size='large'>
          <Menu.Item>
            <Image src={require('../images/logo5.png')} size='tiny'  />
          </Menu.Item>
          <Menu.Item
            name='home'
            active={activeItem === 'home'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name='browse'
            active={activeItem === 'browse'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name='my wishlist'
            active={activeItem === 'my wishlist'}
            onClick={this.handleItemClick}
          />
          
          <Menu.Menu position='right'>
          <Menu.Item>
            
            <Search
              input={{ icon: 'film', iconPosition: 'left' }}
              placeholder='Search...'
              loading={isLoading}
              onResultSelect={this.handleResultSelect}
              onSearchChange={_.debounce(this.handleSearchChange, 500, {
                leading: true,
              })}
              results={results}
              value={value}
              minCharacters={1}
              noResultsMessage="No movie title found."
              noResultsDescription="Don't worry! We will check other parameters once you press enter!"
            
            />
          
            <Button  secondary circular onClick={event =>  window.location.href=`/search/${this.state.value}` } icon>
              <Icon name="search"  fitted="true"/>
              
            </Button>
            
            </Menu.Item>
            <Menu.Item>

            </Menu.Item>
            {(window.sessionStorage.getItem('username') !== null || window.sessionStorage.getItem('username') !== "guest") &&
              <Popup trigger={
                <Menu.Item
                name='notification'
                active={activeItem === 'notification'}
                onClick={this.handleItemClick}
                >
                <Icon name='bell' size='large'/>
              </Menu.Item>
              }
              style={style}
              position='top center'
              flowing
              on={['click']}>
                <Feed>
                  <Feed.Event
                    image={image}
                    date={date}
                    summary={summary}
                    extraText={extraText}
                  />

                  <Feed.Event>
                    <Feed.Label image={image} />
                    <Feed.Content date={date} summary={summary} extraText={extraText} />
                  </Feed.Event>

                  <Feed.Event>
                    <Feed.Label image={image} />
                    <Feed.Content>
                      <Feed.Date content={date} />
                      <Feed.Summary content={summary} />
                      <Feed.Extra text content={extraText} />
                    </Feed.Content>
                  </Feed.Event>
                </Feed>
              </Popup>
              
              
              
              
            }
            {(window.sessionStorage.getItem('username') !== null || window.sessionStorage.getItem('username') !== "guest") &&
              <Menu.Item
                name='my profile'
                active={activeItem === 'my profile'}
                onClick={this.handleItemClick}
              >
                <Icon name='user circle' size='large'/>
              </Menu.Item>
            }
            {(window.sessionStorage.getItem('username') == null || window.sessionStorage.getItem('username') === "guest") ?
              <Menu.Item>
                <Button primary onClick={event =>  window.location.href='/login'}>Sign In</Button>
              </Menu.Item>
              :
              <Menu.Item>
                <Button primary onClick={this.performLogout}>Logout</Button>
              </Menu.Item>
            }
          </Menu.Menu>
            
        </Menu>
      </Segment>
    )
  }
}

const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);