from rest_framework import status
from rest_framework.generics import CreateAPIView, RetrieveAPIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from user.serializers import UserRegistrationSerializer
from user.serializers import UserLoginSerializer
from rest_framework.decorators import api_view
from django.contrib.auth import authenticate

import requests
from collections import defaultdict
import json
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from profile.models import UserProfile

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
                'first_name':user_profile.first_name,
                'last_name':user_profile.last_name,
		'username':user_profile.username
                }
    status_code = status.HTTP_200_OK
    return Response(context, status=status_code)
    #return Response(context)

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
        d['release_date'] = i['release_date']
        if n == 'genre':
            final_resp['genre_result'].append(d)
        else:
            final_resp['name_result'].append(d)
    return final_resp

class MovieSearch(APIView):
    def get(self, request):
        query=request.GET.get('query', '')
        query_list = query.split(" ")
        genre = requests.get("https://api.themoviedb.org/3/genre/movie/list?api_key=c8b243a9c923fff8227feadbf8e4294e&language=en-US")
        genre_list = genre.json()['genres']
        genre_id = []
        for q in query_list:
            for genre in genre_list:
                if q.lower() == genre['name'].lower():
                   genre_id.append(genre['id'])
                   break
        if len(genre_id) > 1:
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
            res = requests.get('https://api.themoviedb.org/3/search/movie?api_key=c8b243a9c923fff8227feadbf8e4294e&language=en-US&query=' + str(query) + '&page=1' + '&include_adult=false')
            if res.json()['total_pages'] > 4:
                pages = 4
            elif res.json()['total_pages'] < 4 and res.json()['total_pages'] != 0:
                pages = res.json()['total_pages']
            else:
                pages = 2
            for i in range(1, pages):
                 url = 'https://api.themoviedb.org/3/search/movie?api_key=c8b243a9c923fff8227feadbf8e4294e&language=en-US&query=' + str(query) + '&page=' + str(i) + '&include_adult=false'
                 response = requests.get(url)
                 initial_search['result'].extend(response.json()['results'])
            name_search = search_func(initial_search, "name")
        else:
            name_search = defaultdict(list)
        search_page = dict(list(genre_search.items()) + list(name_search.items()))
        search_page = json.dumps(search_page)
        return JsonResponse(json.loads(search_page), safe=False)


class MovieDetails(APIView):
    def get(self, request):
        id=request.GET.get('id', 0)
        #print("id received",id)
        youtube_path="https://www.youtube.com/watch?v="
        if id != 0:
            movie_details=defaultdict(list)
            url='https://api.themoviedb.org/3/movie/'+str(id)+'?api_key=c8b243a9c923fff8227feadbf8e4294e&language=en-US&append_to_response=credits,videos'
            response=requests.get(url)
            movie_details['id']=response.json()['id']
            movie_details['rating']=round((response.json()['vote_average'])/2,1)
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
            details_page=json.dumps(movie_details)
            return JsonResponse(json.loads(details_page), safe=False)
        else:
            return redirect('/homepage')
