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
            'status code' : status.HTTP_200_OK,
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
                'status code' : status.HTTP_200_OK,
                'message': 'User logged in  successfully',
                'id':str(user_profile),
                'first_name':user_profile.first_name,
                'last_name':user_profile.last_name
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
            poster_url='http://image.tmdb.org/t/p/w780/'
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
                    d['rating']=int(intial_homepage[i][j]['vote_average'])/2
                    d['description']=intial_homepage[i][j]['overview']
                    if intial_homepage[i][j]['poster_path'] is None:
                        d['poster']='https://i.stack.imgur.com/Q3vyk.png'
                    else:
                        d['poster']=poster_url+intial_homepage[i][j]['poster_path']
                    d['release_date']=intial_homepage[i][j]['release_date']
                    final_homepage[i].append(d)
            home_page=json.dumps(final_homepage)
            return JsonResponse(json.loads(home_page), safe=False)
#request should be "https://127.0.0.1:8000/search/?query='movie name'
class MovieSearch(APIView):
    def get(self, request):
        query=request.GET.get('query', '')
        if len(query)>=1:
            initial_search=defaultdict(list)
            for i in range(1,4):
                url='https://api.themoviedb.org/3/search/movie?api_key=c8b243a9c923fff8227feadbf8e4294e&language=en-US&query='+str(query)+'&page='+str(i)+'&include_adult=false'
                response=requests.get(url)
                initial_search['result'].extend(response.json()['results'])
             final_search=defaultdict(list)
             poster_url='http://image.tmdb.org/t/p/w780/'
             for i in initial_search['result']:
                 d={}
                 d['id']=i['id']
                 d['title']=i['title']
                 d['rating']=int(i['vote_average'])/2
                 d['description']=i['overview']
                 if i['poster_path'] is None:
                        d['poster']='https://i.stack.imgur.com/Q3vyk.png'
                 else:
                        d['poster']=poster_url+i['poster_path']
                 d['release_date']=i['release_date']
                 final_search['result'].append(d)
             search_page=json.dumps(final_search)
             return JsonResponse(json.loads(search_page), safe=False)
         else:
              return redirect('/homepage')
