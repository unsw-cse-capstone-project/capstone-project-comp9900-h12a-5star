import React, { Component } from 'react'
import {moviesList} from './MovieData'
import { Icon, Button, Menu, Segment, Search, Image, Popup, Label, Grid, Message } from 'semantic-ui-react'
import _ from 'lodash'
import {
  Link,
} from "react-router-dom";

const source = moviesList

const initialState = { isLoading: false, results: [], value: '' }

export default class MenuExampleInvertedSegment extends Component {

  constructor() {
    super();
    this.state = {
      activeItem: '', 
      isLoading: false, 
      results: [], 
      value: '',
      newNotifications : 0,
      error: null,
      isLoaded: false,
      items: []
    }
  }

  componentDidMount() {
    if (window.sessionStorage.getItem('username') === null){
      window.sessionStorage.setItem('username', 'guest');
    }
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userID: window.sessionStorage.getItem('username') })
    };

    fetch("http://127.0.0.1:8000/api/getNotifications", requestOptions)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result,
                        newNotifications: result.newNotifications
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
  }

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
      
    }
    else if (name === 'my profile'){
      if (window.sessionStorage.getItem('username') === null || window.sessionStorage.getItem('username') === "guest"){
        window.location.href='/login'
      }
      else{
        window.location.href='/myprofile' 
      }
    }
    else if (name === 'notification'){
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userID: window.sessionStorage.getItem('username') })
      };
  
      fetch("http://127.0.0.1:8000/api/NotificationRead", requestOptions)

      this.setState({newNotifications : 0})

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
    console.log(value)

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
              minCharacters={4}
              noResultsMessage="No movie title found."
              noResultsDescription="Don't worry! We will check other parameters once you click search icon!"
            
            />
          
            <Button  secondary circular onClick={event =>  window.location.href=`/search/${this.state.value}` } icon>
              <Icon name="search"  fitted="true"/>
              
            </Button>
            
            </Menu.Item>
            {(window.sessionStorage.getItem('username') !== null && window.sessionStorage.getItem('username') !== "guest") &&
              <Popup
              basic
              trigger={
                <Menu.Item
                name='notification'
                active={activeItem === 'notification'}
                onClick={this.handleItemClick}
                >
                  {
                    (this.state.newNotifications > 0)?
                      <Icon.Group>
                      <Icon name='bell' size='large'/>
                      <Label circular color="red" floating size="small">
                        {this.state.newNotifications}
                      </Label>
                    </Icon.Group>
                    :
                    <Icon name='bell' size='large'/>
                  }
              </Menu.Item>
              }
              style={style}
              position='top center'
              flowing
              on={['click']}>
                <div>
                  {
                    (this.state.items.notifications) && 
                      (this.state.items.notifications.length > 0) ?
                        this.state.items.notifications.map((items) => 
                          <Link  key={items.movieID} to= {`/movieDetails/${items.movieID}`}>
                              <Grid className={(items.status)? "oldNotification" : "newNotification"}>
                                <Grid.Column width={2}>
                                  <img className="notification" src={items.profilePic} alt=""/>
                                </Grid.Column>
                                <Grid.Column width={12} stretched>
                                  <Grid.Row className="day">
                                    {items.time}
                                  </Grid.Row>
                                  <Grid.Row className="title">
                                    <b>{items.type}</b>
                                  </Grid.Row>
                                </Grid.Column>
                              </Grid>
                        </Link>
                        )
                        :
                        <Message>
                          <Message.Header>
                            No notification to show yet!
                          </Message.Header> 
                        </Message>
                  }
                </div>
              </Popup>
              
            }
            {(window.sessionStorage.getItem('username') !== null && window.sessionStorage.getItem('username') !== "guest") &&
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