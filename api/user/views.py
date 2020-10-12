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

'''class UserRegistrationView(CreateAPIView):

    serializer_class = UserRegistrationSerializer
    permission_classes = (AllowAny,)

    def post(self, request, **kwargs):
        print(request.data)
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        response = {
            'success' : 'True',
            'status code' : status.HTTP_200_OK,
            'message': 'User registered  successfully',
            }
        status_code = status.HTTP_200_OK
        print(response)
        return self.response(response, status=status_code)'''
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

'''class UserLoginView(RetrieveAPIView):

    permission_classes = (AllowAny,)
    serializer_class = UserLoginSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        print('yes1')
        serializer.is_valid(raise_exception=True)
        print('yes2')
        response = {
            'success' : 'True',
            'status code' : status.HTTP_200_OK,
            'message': 'User logged in  successfully',
            'token' : serializer.data['token'],
            }
        status_code = status.HTTP_200_OK
        return Response(response, status=status_code)'''

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
            for i in required:
                for j in range(0,50):
                    d={}
                    d['id']=intial_homepage[i][j]['id']
                    d['title']=intial_homepage[i][j]['title']
                    d['rating']=int(intial_homepage[i][j]['vote_average'])/2
                    d['description']=intial_homepage[i][j]['overview']
                    d['poster']=poster_url+intial_homepage[i][j]['poster_path']
                    d['release_date']=intial_homepage[i][j]['release_date']
                    final_homepage[i].append(d)
            home_page=json.dumps(final_homepage)
            home_page_josn = json.loads(home_page)
            return JsonResponse(home_page_josn, safe=False)
