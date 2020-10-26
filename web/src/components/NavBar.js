import React, { Component } from 'react'
import { Icon, Button, Menu, Segment, Search, Image } from 'semantic-ui-react'
import _ from 'lodash'
import faker from 'faker'

const source = _.times(6, () => ({
  title: faker.company.companyName(),
  description: faker.company.catchPhrase(),
  image: faker.internet.avatar(),
}))

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

  render() {
    const { activeItem, isLoading, value, results } = this.state

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
              input={{ icon: 'search', iconPosition: 'left' }}
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
            </Menu.Item>
            <Menu.Item>

            </Menu.Item>
            {(window.sessionStorage.getItem('username') === null || window.sessionStorage.getItem('username') === "guest") &&
              <Menu.Item
                name='notification'
                active={activeItem === 'notification'}
                onClick={this.handleItemClick}
              >
                <Icon name='bell' size='large'/>
              </Menu.Item>
            }
            {(window.sessionStorage.getItem('username') === null || window.sessionStorage.getItem('username') === "guest") &&
              <Menu.Item
                name='my profile'
                active={activeItem === 'my profile'}
                onClick={this.handleItemClick}
              >
                <Icon name='user circle' size='large'/>
              </Menu.Item>
            }
            {(window.sessionStorage.getItem('username') === null || window.sessionStorage.getItem('username') === "guest") ?
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