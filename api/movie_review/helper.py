from rest_framework import status
from profile.models import UserProfile
from movie_review.models import movies,reviews
from notifications.models import notifications
from collections import defaultdict
import requests, datetime

def verify_user(user):
    try:
        a = UserProfile.objects.get(username=user)

    except Exception as e:
        response = {
            'success': 'False',
            'status code': status.HTTP_400_BAD_REQUEST,
            'message': str(e),
            }
        return False,response
    return True, None

def get_movie_details(movie):
    movie_details=defaultdict(list)

    #youtube_path="https://www.youtube.com/watch?v="
    poster_url = 'http://image.tmdb.org/t/p/original/'
    url='https://api.themoviedb.org/3/movie/'+str(movie)+'?api_key=c8b243a9c923fff8227feadbf8e4294e&language=en-US&append_to_response=credits,videos'

    response=requests.get(url)
    
    if response.json()['poster_path'] is None:
        movie_details['poster'] = 'https://i.stack.imgur.com/Q3vyk.png'
    else:
        movie_details['poster'] = poster_url + response.json()['poster_path']

    movie_details['rating']=round((response.json()['vote_average'])/2,1)
    movie_details['movieID'] = movie
    movie_details['title']=response.json()['title']
    movie_details['release_date']=response.json()['release_date']
    movie_details["myWishlist"] = True
    return movie_details

def send_notifications(userID, movieID, movieTitle):
    followers = UserProfile.objects.get(username = userID).followed_by

    for follower in followers:
        new = notifications()
        new.toUsername = follower
        new.fromUsername = userID
        new.movieId = movieID
        new.movieTitle = movieTitle
        new.type = userID + ' added a review for ' + movieTitle
        new.Date = datetime.date.today()
        new.Time = datetime.datetime.now().time()
        new.save()

    return
