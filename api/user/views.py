from rest_framework import status
from rest_framework.generics import CreateAPIView, RetrieveAPIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from user.serializers import UserRegistrationSerializer
from user.serializers import UserLoginSerializer
from rest_framework.decorators import api_view
from django.contrib.auth import authenticate
from profile.models import UserProfile
from movie_review.models import movies,reviews
import requests
from collections import defaultdict
import json
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from profile.models import UserProfile
from requests import get
from requests.exceptions import RequestException
from contextlib import closing
from bs4 import BeautifulSoup

'''
Json input format for user registration. Do not change genres and languages inside profile
{
    "email":"123@gmail.com",
    "password":"rohithkorupalli",
    "genre":["Horror","Action"],
    "Language":["Chinlish","Hindi"],
    "profile": 
        {
            "first_name":"rohith",
            "last_name":"korupalli",
            "username":"roko123",
            "Gender":"Male",
            "Genres":"",
            "Languages":"English"
        }
}
'''

@api_view(['POST', ])
def UserRegistrationView(request):
    if request.method == 'POST':
        serializer_class = UserRegistrationSerializer
        permission_classes = (AllowAny,)

        #print(request.data)
        serializer = serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        response = {
            'success' : 'True',
            'status_code' : status.HTTP_200_OK,
            'message': 'User registered  successfully',
            }
        status_code = status.HTTP_200_OK
        print(response)
        return Response(response, status=status_code)


@api_view(['POST', ])
def UserLoginView(request):
    print(request.data)
    context = {}
    email = request.data['email']
    password = request.data['password']
    print(email,password)
    user = authenticate(request,email=email, password=password)
    if user is None:
            context['response'] = 'A user with this email and password is not found.'
    #if user.DoesNotExist:
     #   context['response'] = 'User with given email and password does not exists'
    else:
        user_profile = UserProfile.objects.get(user=user)
        context['response'] = {
                'success' : 'True',
                'status_code' : status.HTTP_200_OK,
                'message': 'User logged in  successfully',
                'id':str(user_profile),
				'email':email,
                'firstname':user_profile.firstname,
                'lastname':user_profile.lastname,
		'username':user_profile.username
                }
    status_code = status.HTTP_200_OK
    return Response(context, status=status_code)
    #return Response(context)

def get_review(user,id,final):
    final['review']=[]
    final['user']=[]
    final['rating']=[]
    final['watched'] = False
    final['liked'] = False
    final['wishlist'] = False
    for i in reviews.objects.filter(movie__movie_id=id):
        final['review'].append(i.review)
        final['user'].append(i.review_user_id)
        final['rating'].append(i.rating)
    if user == 'Guest':
        final['watched']= False
        final['liked']=False
        final['wishlist']=False
    else:
        print("yup")
        #data=serializers.serialize("json", reviews.objects.all(),indent=4 )
        print(id)
        print(user)
        for i in reviews.objects.filter(movie__movie_id=id , review_user_id=user):
            print("entered")
            final['watched'] = i.watched
            final['liked'] = i.liked
            final['wishlist'] = i.wishlist
    return final



class Homepage(APIView):
    def get(self, request):
            required=['popular','top_rated','now_playing']
            #Tmdb provides maximum of 20 results for each page and we can't send Multiple page requests in single Query so using For loop
            intial_homepage=defaultdict(list)
            final_homepage=defaultdict(list)
            poster_url='http://image.tmdb.org/t/p/original/'
            for i in range(1,4):
                for j in required:
                    url='https://api.themoviedb.org/3/movie/'+j+'?api_key=c8b243a9c923fff8227feadbf8e4294e&language=en-US&page='+str(i)
                    response=requests.get(url)
                    intial_homepage[j].extend(response.json()['results'])
            #intial_homepage consistis of all the details of movies returned from the movie , but we require only ID, RELASEDATE , POSTER, DESCRIPTION, TITLE of every movie in each Required list. so forming our final home_page
            #Rating is given out of 10, so for this project rating is maintained in between 0 to 5
            for i in required:
                for j in range(0,50):
                    d={}
                    d['id']=intial_homepage[i][j]['id']
                    d['title']=intial_homepage[i][j]['title']
                    d['rating']=round((intial_homepage[i][j]['vote_average'])/2,1)
                    d['description']=intial_homepage[i][j]['overview']
                    if intial_homepage[i][j]['poster_path'] is None:
                        d['poster']='https://i.stack.imgur.com/Q3vyk.png'
                    else:
                        d['poster']=poster_url+intial_homepage[i][j]['poster_path']
                    d['release_date']=intial_homepage[i][j]['release_date']
                    final_homepage[i].append(d)
            home_page=json.dumps(final_homepage)
            return JsonResponse(json.loads(home_page), safe=False)

#request should be "https://127.0.0.1:8000/api/search/?query='movie name'

def search_func(resp, n):
    final_resp = defaultdict(list)
    poster_url = 'http://image.tmdb.org/t/p/original/'
    for i in resp['result']:
        d = {}
        d['id'] = i['id']
        d['title'] = i['title']
        d['rating'] = round(i['vote_average'] / 2, 1)
        d['description'] = i['overview']
        if i['poster_path'] is None:
            d['poster'] = 'https://i.stack.imgur.com/Q3vyk.png'
        else:
            d['poster'] = poster_url + i['poster_path']
        try:
            d['release_date']=i['release_date']
        except KeyError:
            d['release_date']=0
        if n == 'genre':
            final_resp['genre_result'].append(d)
        elif n=='name':
            final_resp['name_result'].append(d)
        else:
            final_resp['description_result'].append(d)
    return final_resp

def simple_get(url):
    try:
        header = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)\
                                                                Chrome/77.0.3865.90 Safari/537.36'}
        with closing(get(url,stream = True,headers=header)) as resp:
            if 'html' in resp.headers['Content-Type'] and resp.status_code == 200:
                return resp.content
            else:
                return None
    except RequestException:
        print(f'Request for {url} failed')
        return None

class MovieSearch(APIView):
    def get(self, request):
        query=request.GET.get('query', '')
        query_list = query.split()
        #print(query_list)
        genre = requests.get("https://api.themoviedb.org/3/genre/movie/list?api_key=c8b243a9c923fff8227feadbf8e4294e&language=en-US")
        genre_list = genre.json()['genres']
        #print(genre_list)
        genre_id = []
        for q in query_list:
            #print("q is",q)
            for genre in genre_list:
                #print("q in",q.lower())
                #print("name is ",genre['name'].lower())
                if q.lower() == genre['name'].lower():
                   print("entrered")
                   genre_id.append(genre['id'])
                   break
        #print("genre",genre_id)
        if len(genre_id) >= 1:
            print("entered")
            res = requests.get("https://api.themoviedb.org/3/discover/movie?api_key=c8b243a9c923fff8227feadbf8e4294e&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&page=1" + "&with_genres=" + str(genre_id[0]))
            if res.json()['total_pages'] > 4:
                pages = 4
            elif res.json()['total_pages'] < 4 and res.json()['total_pages'] != 0:
                pages = res.json()['total_pages']
            else:
                pages = 2
            genre_resp = defaultdict(list)
            for i in range(1, pages):
                  url = "https://api.themoviedb.org/3/discover/movie?api_key=c8b243a9c923fff8227feadbf8e4294e&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&page=" + str(
                i) + "&with_genres=" + str(genre_id[0])
                  response = requests.get(url)
                  genre_resp['result'].extend(response.json()['results'])
            genre_search = search_func(genre_resp, "genre")
        else:
            genre_search = defaultdict(list)
        if len(query) >= 1:
            initial_search = defaultdict(list)
            res = requests.get('https://api.themoviedb.org/3/search/movie?api_key=c8b243a9c923fff8227feadbf8e4294e&language=en-US&query=' + str(query) + '&page=1' +'&sort_by=popularity.desc'+ '&include_adult=false')
            if res.json()['total_pages'] > 4:
                pages = 4
            elif res.json()['total_pages'] < 4 and res.json()['total_pages'] != 0:
                pages = res.json()['total_pages']
            else:
                pages = 2
            for i in range(1, pages):
                 url = 'https://api.themoviedb.org/3/search/movie?api_key=c8b243a9c923fff8227feadbf8e4294e&language=en-US&query=' + str(query) + '&page=' + str(i)+'&sort_by=popularity.desc' + '&include_adult=false'
                 response = requests.get(url)
                 initial_search['result'].extend(response.json()['results'])
            name_search = search_func(initial_search, "name")
        else:
            name_search = defaultdict(list)
        s = BeautifulSoup(simple_get('https://www.whatismymovie.com/results?text='+query), 'html.parser')
        desc_movies=[]
        for heading in s.find_all(["h3"]):
            #print(s)
            if heading.text.strip().endswith(')'):
                x=len(heading.text.strip())
                if heading.text.strip()[:x-7] not in desc_movies:
                    desc_movies.append(heading.text.strip()[:x-7])
        description_search = defaultdict(list)
        #print(desc_movies)
        for i in desc_movies[:30]:
            initial_search = defaultdict(list)
            res = requests.get('https://api.themoviedb.org/3/search/movie?api_key=c8b243a9c923fff8227feadbf8e4294e&language=en-US&query=' + str(i)+'&sort_by=popularity.desc' + '&page=1' + '&include_adult=false')
            #print(res.json())
            try:
                if res.json()['total_pages'] > 4:
                    pages = 4
                elif res.json()['total_pages'] < 4 and res.json()['total_pages'] != 0:
                    pages = res.json()['total_pages']
                else:
                    pages = 2
                for i in range(1, pages):
                     initial_search['result'].extend(res.json()['results'])
                x_search = search_func(initial_search, "desc")
                #print(x_search)
                if len(x_search) !=0:
                    description_search['description_result'].extend(x_search['description_result'])
            except KeyError:
                continue

        search_page = dict(list(genre_search.items()) + list(name_search.items())+ list(description_search.items()))
        search_page = json.dumps(search_page)
        return JsonResponse(json.loads(search_page), safe=False)


class MovieDetails(APIView):
    def post(self, request):

        id=request.data['id']
        #print("id received",id)
        user=request.data['user']
        youtube_path="https://www.youtube.com/watch?v="
        if id != 0:
            movie_details=defaultdict(list)
            url='https://api.themoviedb.org/3/movie/'+str(id)+'?api_key=c8b243a9c923fff8227feadbf8e4294e&language=en-US&append_to_response=credits,videos'
            response=requests.get(url)
            movie_details['id']=response.json()['id']
            movie_details['imdb_rating']=round((response.json()['vote_average'])/2,1)
            movie_details['description']=response.json()['overview']
            movie_details['title']=response.json()['title']
            for i in range(len(response.json()['genres'])):
                 movie_details['genres'].append(response.json()['genres'][i]['name'])
            for i in range(len(response.json()['videos']['results'])):
                    if response.json()['videos']['results'][i]['type'] == 'Trailer' :
                         movie_details['trailers'].append(youtube_path+str(response.json()['videos']['results'][i]['key']))
            for i in range(len(response.json()['videos']['results'])):
                    if response.json()['videos']['results'][i]['type'] == 'Teaser' :
                         movie_details['teasers'].append(youtube_path+str(response.json()['videos']['results'][i]['key']))
            for i in range(len(response.json()['credits']['cast'])):
                    if i<10:
                           movie_details['cast'].append(response.json()['credits']['cast'][i]['name'])
                    else:
                        break

            for i in range(len(response.json()['credits']['crew'])):
                      if response.json()['credits']['crew'][i]['job'] == 'Director':
                               movie_details['director'].append(response.json()['credits']['crew'][i]['name'])
                      if response.json()['credits']['crew'][i]['job'] == 'Producer':
                               movie_details['producer'].append(response.json()['credits']['crew'][i]['name'])
            movie_details['release_date']=response.json()['release_date']
            if not(movie_details['trailers']):
                        movie_details['trailers'].append(None)
            if not(movie_details['teasers']):
                        movie_details['teasers'].append(None)
            reviews = get_review(user, id,movie_details)
            #if user == 'Guest':
            details_page = json.dumps(reviews)
            return JsonResponse(json.loads(details_page), safe=False)
        else:
            return redirect('/homepage')
