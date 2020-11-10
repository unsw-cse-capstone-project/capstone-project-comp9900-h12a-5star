import React, { Component } from 'react'
import {moviesList} from './genericLists'
import { Icon, Button, Menu, Segment, Search, Image, Popup, Feed, Label } from 'semantic-ui-react'
import _ from 'lodash'


const source = moviesList

// const source =  _.times(10, (i) => ({
  
//           title: moviesList[i].title,
//           description: moviesList[i].description,
//           image: moviesList[i].image,
//           price: moviesList[i].price,
// }       
// ))

// const source = _.times(3, () => ({
//   title: faker.company.companyName(),
//   description: faker.company.catchPhrase(),
//   image: faker.internet.avatar(),
// }))

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
              noResultsDescription="Don't worry! We will check other parameters once you click search icon!"
            
            />
          
            <Button  secondary circular onClick={event =>  window.location.href=`/search/${this.state.value}` } icon>
              <Icon name="search"  fitted="true"/>
              
            </Button>
            
            </Menu.Item>
            {(window.sessionStorage.getItem('username') !== null && window.sessionStorage.getItem('username') !== "guest") &&
              <Popup trigger={
                <Menu.Item
                name='notification'
                active={activeItem === 'notification'}
                onClick={this.handleItemClick}
                >
                  <Icon.Group>
                    <Icon name='bell' size='large'/>
                    {
                      // (this.state.newNotifications > 0) &&
                        <Label circular color="red" floating size="small">
                          {this.state.newNotifications}
                      </Label>
                    }
                  </Icon.Group>
                
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