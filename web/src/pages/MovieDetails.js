import React, { Component } from 'react';
import _ from 'lodash'
import { Divider, Grid, Container, Image, Segment, Card, Placeholder, Icon, List, Button, Comment, Form, Header, Rating, Popup, Label, Message, Modal, Embed, Dropdown } from 'semantic-ui-react'
import { gender, featureList } from '../components/genericLists';
import MovieTile from '../components/MovieTile';
import {
    DatesRangeInput
  } from 'semantic-ui-calendar-react';


export default class MovieDetails extends Component {

    // Loading options for the dropdown
    featureList = featureList
    genderOptions = gender

    //Constructor called at the time of page load
    constructor() {
        super();

        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            open: false,
            review: "",
            rating: "0",
            datesRange:"",
            gender: "",
            features: [],
            shareUser: "",
            firstOpen: false,
            secondOpen: false,
            isLoadedUser: false,
            errorUser: false,
            userList: []

        };
        this.handleReview = this.handleReview.bind(this);
        if (window.sessionStorage.getItem('username') === null) {
            window.sessionStorage.setItem('username', 'guest');
        }
        this.user = window.sessionStorage.getItem('username')
    }

    // function called when the components are loaded onto the page.It gets executed right after the constructor.
    // Performs an operation to pull the movie details from the database.
    componentDidMount() {

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: this.props.match.params.movieId, user: this.user, selection: this.state.features })
        };

        fetch("http://127.0.0.1:8000/api/moviedetail", requestOptions)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result,
                        active_like: result.liked,
                        active_seen: result.watched,
                        active_wishlist: result.wishlist
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

    // Function to mark the movie as liked
    handleClick_like = () => {
        this.setState((prevState) => ({ active_like: !prevState.active_like }))

        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ movieId: this.props.match.params.movieId, username: this.user, likeMovie: !this.state.items.liked })
        };

        fetch("http://127.0.0.1:8000/api/likeMovie/", requestOptions)

        var itemTemp = this.state.items
        itemTemp.liked = !itemTemp.liked

        this.setState({ items: itemTemp })
    }

    // Function to handle the recommendation prefrences
    handleClickRecommend = () => {
        console.log(this.state.features)

        var obj = { id: this.props.match.params.movieId, user: this.user, selection: this.state.features };

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(obj)
        };
        if (this.state.features.length > 0) {
            this.setState({ flag: 1 })

            fetch("http://127.0.0.1:8000/api/moviedetail/", requestOptions)
                .then(res => res.json())
                .then(
                    (result) => {
                        this.setState({
                            isLoaded: true,
                            items: result
                        });
                    },

                    (error) => {
                        this.setState({
                            isLoaded: true,
                            error
                        });
                    }
                )
            this.setState({ isLoaded: false })
        }
    }

    // Function to mark the movie as seen
    handleClick_seen = () => {
        this.setState((prevState) => ({ active_seen: !prevState.active_seen }))
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: this.user, movieID: this.props.match.params.movieId, movieStatus: !this.state.items.watched })
        };
        fetch("http://127.0.0.1:8000/api/watchMovie/", requestOptions)

        var itemTemp = this.state.items
        itemTemp.watched = !itemTemp.watched
        this.setState({ items: itemTemp })
    }

    // Function to add the movie in wishlist
    handleClick_wishlist = () => {
        this.setState((prevState) => ({ active_wishlist: !prevState.active_wishlist }))

        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ movieId: this.props.match.params.movieId, username: this.user, wishlist: !this.state.items.wishlist })
        };

        fetch("http://127.0.0.1:8000/api/addWishlist/", requestOptions)

        var itemTemp = this.state.items
        itemTemp.wishlist = !itemTemp.wishlist
        this.setState({ items: itemTemp })
    }

    // Funtcion to toggle the watch trailer popup window
    setOpen(val) {
        this.setState({ open: val })
    }

    // Function to open the menu the to select the username for sharing the movie
    async setFirstOpen(val) {
        this.setState({ firstOpen: val })

        if (this.state.userList.length === 0) {
            await fetch("http://127.0.0.1:8000/api/users/")
                .then(res => res.json())
                .then(
                    (result) => {
                        this.setState({
                            isLoadedUser: true,
                            userList: result.users
                        });
                    },
                    // Note: it's important to handle errors here
                    // instead of a catch() block so that we don't swallow
                    // exceptions from actual bugs in components.
                    (errorUser) => {
                        this.setState({
                            isLoadedUser: true,
                            errorUser
                        });
                    }
                )

            var tmpList = []

            this.state.userList.map((item) =>
                (item !== this.user) &&
                tmpList.push({
                    key: item,
                    text: item,
                    value: item
                })
            )

            this.setState({ userList: tmpList })
        }
    }

    // Function to open the menu for displaying the sharing confirmation
    setSecondOpen(val) {
        this.setState({ secondOpen: val })
        if (!val) {
            this.setState({ firstOpen: false, shareUser: '' })
        }
    }

    // Function to handle teh following a review writer
    handle_click_follow_user = (val) => {

        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ follower: this.user, followee: val })
        };

        fetch("http://127.0.0.1:8000/api/followUser", requestOptions)

        alert("User Followed Successfully");
        window.location.reload(false);
    }

    // Function to handle the banning of a review writer
    handle_click_ban_user = (val) => {

        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ bannedUsername: val, username: this.user, banStatus: true })
        };

        fetch("http://127.0.0.1:8000/api/banUsername", requestOptions)

        alert("User Banned Successfully");
        window.location.reload(false);
    }

    // Function to handle the liking of a review
    handleClickLikeReview = (val, j) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ movieId: this.props.match.params.movieId, reviewerUsername: val, likerUsername: this.user })
        };

        fetch("http://127.0.0.1:8000/api/upvote", requestOptions)

        var itemTemp = this.state.items
        if (itemTemp.upvoteStatus[j]) {
            itemTemp.upvote[j] = itemTemp.upvote[j] - 1
        }
        else {
            itemTemp.upvote[j] = itemTemp.upvote[j] + 1
        }
        itemTemp.upvoteStatus[j] = !itemTemp.upvoteStatus[j]
        this.setState({ items: itemTemp })

    }

    // Function to handle storing of the review text 
    handleReview = (event) => {
        this.setState({ review: event.target.value })
    }

    // Function to handle storing of the review rating
    handleRate = (e, { rating, maxRating }) => {
        this.setState({ rating: rating })
    }

    // Function to handle adding of a new review
    handle_adding_review = async () => {
        const movie = this.props.match.params.movieId;
        const user = this.user
        const review = this.state.review;
        const rating = this.state.rating;
        const movieTitle = this.state.items.title
        if (user !== "guest") {

            const result = await fetch(`http://127.0.0.1:8000/api/addreview`, {
                method: 'post',
                body: JSON.stringify({ movie, user, review, rating, movieTitle }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            });
            const body = await result.json();

            if (body.statusCode === 200) {
                window.location.reload(false);
            }
        }
        else {
            window.location.href = '/movieDetails';
        }

    }

    // Function to handle sharing of a movie to a user
    handle_share_movie = (val) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                fromUser: this.user,
                toUser: this.state.shareUser,
                movieId: this.props.match.params.movieId,
                movieTitle: val
            })
        }

        fetch("http://127.0.0.1:8000/api/suggestMovie", requestOptions).then(res => res.json())

        this.setState({ secondOpen: true, shareUser: '' })
    }

    // Function to handle the calander dropdown
    handleChange = (event, { name, value }) => {
        if (this.state.hasOwnProperty(name)) {
            this.setState({ [name]: value });
        }
    }

    // Function to handle filtering of reviews
    handleFilterReviews = () => {

        this.setState({ items: [] })
        var fromDate = "";
        var toDate = "";
        if (this.state.datesRange) {

            var date = this.state.datesRange.split(" - ")
            fromDate = date[0].split("-").reverse().join("-");
            toDate = date[1].split("-").reverse().join("-");
        }

        var obj = { "user": this.user, "id": this.props.match.params.movieId, "from_date": fromDate, "to_date": toDate, "gender_sort": this.state.gender }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(obj)
        };

        fetch("http://127.0.0.1:8000/api/moviedetail/", requestOptions)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result,
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


    render() {

        // Load the states and initialize variables
        const { active_like } = this.state
        const { active_seen } = this.state
        const { active_wishlist } = this.state
        var recommendSimilar = null

        // Load recomendations
        if (this.state.items.recomendations) {
            recommendSimilar = _.times(4, (i) => (
                <Grid.Column key={i}>
                    <MovieTile
                        title={this.state.items.recomendations[i].movieTitle}
                        poster={this.state.items.recomendations[i].poster}
                        release={this.state.items.recomendations[i].releaseDate}
                        rating={this.state.items.recomendations[i].rating}
                        description={this.state.items.recomendations[i].description}
                        movieId={this.state.items.recomendations[i].movieID}
                    />
                </Grid.Column>
            ))
        }
        else {
            // Placeholder for the recomendations
            recommendSimilar = _.times(4, (i) => (
                <Grid.Column key={i}>
                    <Card.Group>
                        <Card>
                            <Placeholder>
                                <Placeholder.Image square />
                            </Placeholder>
                        </Card>
                        <Card.Content>
                            <Placeholder>
                                <Placeholder.Header>
                                    <Placeholder.Line length='very short' />
                                    <Placeholder.Line length='medium' />
                                </Placeholder.Header>
                                <Placeholder.Paragraph>
                                    <Placeholder.Line length='short' />
                                </Placeholder.Paragraph>
                            </Placeholder>
                        </Card.Content>
                    </Card.Group>
                </Grid.Column>
            ))
        }

        const style = {
            opacity: 1
        }

        return (

            <React.Fragment>
                <Container >

                    <Segment >
                        <Grid columns='equal' divided={'vertically'} padded style={{ margin: 20 }}>
                            <Grid.Row >
                                <Grid.Column >
                                    {
                                        (this.state.items.title) ?
                                            <Header as='h1'>
                                                {this.state.items.title}
                                            </Header>
                                            :
                                            <Header as='h1'></Header>
                                    }
                                    <p>
                                        {
                                            (this.state.items.title) ?
                                                <div>
                                                    <Icon name='star' color={"yellow"} /> {this.state.items.avg_rating}&nbsp;&nbsp;&nbsp;
                                            <Icon name='chart pie' color={(this.state.items.tmdb_rating > 4) ? 'green' : ((this.state.items.tmdb_rating > 2.5) ? 'yellow' : 'orange')} />  {this.state.items.tmdb_rating * 20}%
                                        </div> :
                                                <div>
                                                    <Icon name='star' color={"yellow"} />
                                                    <Icon name='chart pie' color={(this.state.items.tmdb_rating > 4) ? 'green' : ((this.state.items.tmdb_rating > 2.5) ? 'yellow' : 'orange')} />
                                                </div>
                                        }
                                    </p>
                                </Grid.Column>

                                <Grid.Column textAlign={"right"} >
                                    <Popup
                                        trigger={<Button circular icon='thumbs up' size={'big'} toggle active={active_like} onClick={this.handleClick_like} disabled={window.sessionStorage.getItem('username') === 'guest' ? true : false} />}>
                                        Like the movie?
                                        </Popup>
                                    <Popup
                                        trigger={<Button circular icon='eye' size={'big'} toggle active={active_seen} onClick={this.handleClick_seen} disabled={window.sessionStorage.getItem('username') === 'guest' ? true : false} />}>
                                        Watched the movie?
                                        </Popup>
                                    <Popup
                                        trigger={<Button circular icon='bookmark' size={'big'} toggle active={active_wishlist} onClick={this.handleClick_wishlist} disabled={window.sessionStorage.getItem('username') === 'guest' ? true : false} />}>
                                        Add to wishlist?
                                        </Popup>
                                    <Popup
                                        trigger={<Button circular icon='share alternate' size={'big'} onClick={() => this.setFirstOpen(true)} disabled={window.sessionStorage.getItem('username') === 'guest' ? true : false} />
                                        }
                                    >
                                        Share with a user? <br />
                                    </Popup>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>


                                <Modal
                                    onClose={() => this.setFirstOpen(false)}
                                    onOpen={() => this.setFirstOpen(true)}
                                    open={this.state.firstOpen}
                                    size='small'
                                >
                                    <Modal.Header><Icon name="share alternate" />Share with a user</Modal.Header>
                                    <Modal.Content image>
                                        <Form>
                                            <Form.Field >
                                                <Header as="h1">Please enter the username</Header>
        
                                                <Dropdown placeholder='Select user' onChange={(event, { value }) => this.setState({ shareUser: value })} fluid selection options={this.state.userList} search required />
                                            </Form.Field>
                                        </Form>
                                        <Modal.Description>

                                        </Modal.Description>
                                    </Modal.Content>
                                    <Modal.Actions>
                                        <Button onClick={() => this.setSecondOpen(false)} color="red">
                                            <Icon name='close' /> Cancel
                                        </Button>
                                        <Button onClick={() => this.handle_share_movie(this.state.items.title)} primary disabled={this.state.shareUser === '' ? true : false}>
                                            Share <Icon name='right chevron' />
                                        </Button>
                                    </Modal.Actions>

                                    <Modal
                                        onClose={() => this.setSecondOpen(false)}
                                        onOpen={() => this.setSecondOpen(true)}
                                        open={this.state.secondOpen}
                                        size='small'
                                    >
                                        <Modal.Header>Movie Shared!!</Modal.Header>
                                        <Modal.Content>
                                            <p>Your friend will be notified about the movie. Happy sharing!!</p>
                                        </Modal.Content>
                                        <Modal.Actions>
                                            <Button
                                                icon='check'
                                                content='All Done'
                                                onClick={() => this.setSecondOpen(false)}
                                            />
                                        </Modal.Actions>
                                    </Modal>
                                </Modal>

                                <Grid.Column >
                                    <Modal
                                        basic
                                        onClose={() => this.setOpen(false)}
                                        onOpen={() => this.setOpen(true)}
                                        open={this.state.open}
                                        size='small'
                                        trigger={<Button color="youtube" icon="youtube" ><Icon name="youtube" />Watch Trailer</Button>}
                                    >
                                        <Modal.Content>
                                            {
                                                (this.state.items.trailers) ?
                                                    (!this.state.items.trailers[0]) ?
                                                        <Header as='h1' inverted>There are no trailers to show at the moment!</Header>
                                                        :
                                                        <Embed
                                                            active={this.state.open}
                                                            id={this.state.items.trailers[0].split("=")[1]}
                                                            placeholder='https://react.semantic-ui.com/images/image-16by9.png'
                                                            source='youtube'
                                                        />
                                                    :
                                                    <Header as='h1' inverted>There are no trailers to show at the moment!</Header>
                                            }
                                        </Modal.Content>
                                        <Modal.Actions>
                                            <Button color='red' inverted onClick={() => this.setOpen(false)}>
                                                <Icon name='remove' /> Close
                                                </Button>
                                        </Modal.Actions>
                                    </Modal>
                                    <List >


                                        <List.Item as='a'>
                                            <Icon name='calendar alternate outline' />
                                            <List.Content>
                                                <List.Header>Release Date</List.Header>
                                                <List.Description>
                                                    {
                                                        (this.state.items.release_date) ?
                                                            <div>
                                                                {this.state.items.release_date} <br /><br />
                                                            </div>
                                                            :
                                                            <p>Release date not available</p>
                                                    }


                                                </List.Description>
                                            </List.Content>
                                        </List.Item>
                                        <List.Item as='a'>
                                            <Icon name='map outline' />
                                            <List.Content>
                                                <List.Header>Director</List.Header>
                                                <List.Description>
                                                    <Label.Group>
                                                        {
                                                            (this.state.items.director) ?
                                                                this.state.items.director.map((item) =>
                                                                    <Label as='a'>{item}</Label>
                                                                )
                                                                :
                                                                <div><p>Director information not available</p></div>
                                                        }
                                                    </Label.Group>
                                                </List.Description>
                                            </List.Content>
                                        </List.Item>
                                        <List.Item as='a'>
                                            <Icon name='film' />
                                            <List.Content>
                                                <List.Header>Producer</List.Header>
                                                <List.Description>
                                                    <Label.Group>
                                                        {
                                                            (this.state.items.producer) ?
                                                                this.state.items.producer.map((item) =>
                                                                    <Label as='a'>{item}</Label>
                                                                )
                                                                :
                                                                <div><p>Producer information not available</p></div>
                                                        }
                                                    </Label.Group>
                                                </List.Description>
                                            </List.Content>
                                        </List.Item>
                                        <List.Item as='a'>
                                            <Icon name='globe' />
                                            <List.Content>
                                                <List.Header>Genre</List.Header>
                                                <List.Description>
                                                    <Label.Group>
                                                        {
                                                            (this.state.items.genres) ?
                                                                this.state.items.genres.map((item) =>
                                                                    <Label as='a'>{item}</Label>
                                                                )
                                                                :
                                                                <div><p>Genre information not available</p></div>

                                                        }
                                                    </Label.Group>
                                                </List.Description>
                                            </List.Content>
                                        </List.Item>
                                        <List.Item as='a'>
                                            <Icon name='address book outline' />
                                            <List.Content>
                                                <List.Header>Cast</List.Header>
                                                <List.Description>
                                                    <Label.Group>
                                                        {

                                                            (this.state.items.cast) ?
                                                                this.state.items.cast.map((item) =>
                                                                    <Label as='a'>{item}</Label>
                                                                )
                                                                :
                                                                <div><p>Cast information not available</p></div>

                                                        }
                                                    </Label.Group>
                                                </List.Description>
                                            </List.Content>
                                        </List.Item>
                                        <List.Item>
                                        </List.Item>
                                    </List>

                                </Grid.Column>
                                <Grid.Column width={4}>
                                    <Image src={`${this.state.items.poster}`} />

                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column>
                                    <Header as='h3' >
                                        About the Movie
                                    </Header>
                                    <p>
                                        {this.state.items.description}
                                    </p>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column stretched>
                                    <Comment.Group>
                                        <Header as='h3' >
                                            User Reviews
                                </Header>

                                        <Message>
                                            <Message.Header>Filter Reviews</Message.Header>
                                            <br></br>
                                            <Form>
                                                <Form.Group >

                                                    <Form.Field width={12}>

                                                        <Dropdown placeholder="Gender"
                                                            onChange={(event, { value }) => this.setState({ gender: value })}
                                                            search
                                                            fluid selection
                                                            clearable
                                                            options={this.genderOptions}
                                                        />
                                                    </Form.Field>


                                                    <Form.Field width={12}>

                                                        <DatesRangeInput
                                                            name="datesRange"
                                                            placeholder="From - To"
                                                            value={this.state.datesRange}
                                                            iconPosition="left"
                                                            onChange={this.handleChange}
                                                            clearable
                                                        />
                                                    </Form.Field>


                                                    <Form.Field width={4}>
                                                        <Button onClick={this.handleFilterReviews} color={"blue"} fluid type='submit' floated='left' >Filter</Button>
                                                    </Form.Field>
                                                </Form.Group >
                                            </Form>
                                        </Message>


                                        {
                                            (this.state.items.review) ?
                                                (this.state.items.review.length === 0) ?
                                                    <Message>
                                                        <Message.Header>There are no reviews to show yet!</Message.Header>
                                                        <p>
                                                            Be the first one to review {this.state.items.title}
                                                        </p>
                                                    </Message> : <div></div>
                                                :
                                                <div></div>
                                        }

                                        {

                                            (this.state.items.review) ?
                                                (this.state.items.review.length > 0) &&
                                                <div>

                                                    {
                                                        _.times(this.state.items.review.length, (j) => (
                                                            <Comment>
                                                                <Comment.Avatar src={this.state.items.profilePics[j]} />
                                                                <Comment.Content>
                                                                    {
                                                                        (this.state.items.user[j] !== this.user) ?
                                                                            <Popup trigger={<Comment.Author as='a'>{this.state.items.user[j]}</Comment.Author>}
                                                                                flowing
                                                                                hoverable
                                                                                style={style}
                                                                                inverted
                                                                                position='top center'
                                                                                on={['hover', 'click']}>
                                                                                <Popup trigger={<Button secondary onClick={event => window.location.href = `/Wishlist/${this.state.items.user[j]}`} icon="bookmark" size={'big'} />}>
                                                                                    View Wishlist
                                                                                </Popup>
                                                                                <Popup trigger={<Button disabled={window.sessionStorage.getItem('username') === 'guest' ? true : false} value={this.state.items.user[j]} onClick={() => this.handle_click_ban_user(this.state.items.user[j])} secondary icon='user close' size={'big'} />}>
                                                                                    Ban User
                                                                                </Popup>
                                                                                <Popup trigger={<Button disabled={(window.sessionStorage.getItem('username') === 'guest') ? true : (this.state.items.follow[j] ? true : false)} secondary icon='add user' size={'big'} onClick={() => this.handle_click_follow_user(this.state.items.user[j])} />}>
                                                                                    Follow User
                                                                                </Popup>
                                                                            </Popup>
                                                                            :
                                                                            <Comment.Author as='a'>{this.state.items.user[j]}</Comment.Author>
                                                                    }

                                                                    <Comment.Metadata>
                                                                        <div>{this.state.items.date_modified[j]}</div>
                                                                    </Comment.Metadata>
                                                                    <Comment.Text>
                                                                        <Rating icon='star' defaultRating={this.state.items.rating[j]} maxRating={5} disabled /><br />
                                                                        {this.state.items.review[j]}
                                                                    </Comment.Text>
                                                                    <Comment.Actions>
                                                                        <Icon name={this.state.items.upvoteStatus[j] ? 'heart' : 'heart outline'} color='red' onClick={() => this.handleClickLikeReview(this.state.items.user[j], j)} disabled={window.sessionStorage.getItem('username') === 'guest' ? true : false} />{this.state.items.upvote[j]}
                                                                    </Comment.Actions>
                                                                </Comment.Content>
                                                            </Comment>
                                                        ))
                                                    }

                                                </div>

                                                :
                                                <div></div>
                                        }

                                        <Form reply>
                                            How was this Movie?  <Rating disabled={window.sessionStorage.getItem('username') === 'guest' ? true : false} onRate={this.handleRate} icon='star' defaultRating={0} maxRating={5} />
                                            <Form>
                                                <textarea onChange={(event) => this.handleReview(event)} placeholder='What do you think about the movie?' disabled={window.sessionStorage.getItem('username') === 'guest' ? true : false} />
                                                <input type="hidden" value={this.state.review} />

                                            </Form>
                                            <br></br>
                                            <br></br>
                                            <Button disabled={window.sessionStorage.getItem('username') === 'guest' ? true : false} onClick={this.handle_adding_review} content='Add Review' labelPosition='left' icon='edit' primary />
                                        </Form>

                                    </Comment.Group>

                                    <Divider />

                                    <Header as='h1'>
                                        <center>Personalize your Recommendations</center></Header>
                                    <Form>
                                        <Form.Group >
                                            <Form.Field width={12}>
                                                <Dropdown placeholder="Select your Preferences"
                                                    onChange={(event, { value }) => this.setState({ features: value })}
                                                    search
                                                    fluid selection multiple options={this.featureList}
                                                    required />
                                            </Form.Field>
                                            <Form.Field width={4}>
                                                <Button onClick={this.handleClickRecommend} color={"blue"} fluid type='submit' floated='right'>Set Preferences </Button>
                                            </Form.Field>
                                        </Form.Group >
                                    </Form>

                                    <Divider hidden />
                                    <Divider />
                                    <Divider hidden />
                                    <Divider hidden />
                                    <Grid columns="equal">
                                        <Grid.Column>
                                            
                                        </Grid.Column>
                                    </Grid>
                                    <Grid columns='equal'>{recommendSimilar}</Grid>
                                    <br>
                                    </br>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Segment>
                </Container>
            </React.Fragment>
        )
    }
}