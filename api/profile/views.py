from rest_framework import status
from rest_framework.generics import RetrieveAPIView
from rest_framework.response import Response
from profile.models import UserProfile
from movie_review.helper import get_movie_details
import random

statusCode = status.HTTP_400_BAD_REQUEST
RESPONSE = {
    'success': 'false',
    'status code': status.HTTP_400_BAD_REQUEST,
    'message': 'User does not exists',
    }

pictures = {'Female': ['https://react.semantic-ui.com/images/avatar/small/elliot.jpg',
'https://react.semantic-ui.com/images/avatar/small/jenny.jpg'],
'Male': ['https://react.semantic-ui.com/images/avatar/small/matt.jpg',
'https://react.semantic-ui.com/images/avatar/small/joe.jpg']}

class UserProfileView(RetrieveAPIView):
    def post(self, request, *args, **kwargs):
        try:
            user_profile = UserProfile.objects.get(username=request.data['username'])
            statusCode = status.HTTP_200_OK
            response = {
                'success': 'true',
                'status code': statusCode,
                'message': 'User profile fetched successfully',
                'data': {
                    'firstname': user_profile.firstname,
                    'lastname': user_profile.lastname,
                    'gender': user_profile.gender,
                    'genres':user_profile.genres,
                    'languages':user_profile.languages,
                    'profilePic':user_profile.profilePic
                }}
        except Exception as e:
            RESPONSE['error']= str(e)
            return Response(RESPONSE, status=statusCode)
        return Response(response, status=statusCode)

    def put(self, request, *args, **kwargs):
        #print('PUT called ',request.data)
        try:
            user_profile = UserProfile.objects.get(username=request.data['username'])

            if 'firstname' in request.data.keys():
                user_profile.firstname = request.data['firstname']
            if 'lastname' in request.data.keys():
                user_profile.lastname = request.data['lastname']
            if 'gender' in request.data.keys():
                user_profile.gender = request.data['gender']
            if 'genres' in request.data.keys():
                user_profile.genres = request.data['genres']
            if 'languages' in request.data.keys():
                user_profile.languages = request.data['languages']
            if 'profilePic' in request.data.keys():
                user_profile.profilePic = request.data['profilePic']
            user_profile.save()
            statusCode = status.HTTP_200_OK
            response = {
                'success': 'true',
                'statusCode': statusCode,
                'message': 'User profile updates successfully',
                'data': {
                    'firstname': user_profile.firstname,
                    'lastname': user_profile.lastname,
                    'gender': user_profile.gender,
                    'genres':user_profile.genres,
                    'languages':user_profile.languages,
                    'profilePic':user_profile.profilePic}}
        except Exception as e:
            RESPONSE['error']= str(e)
            return Response(RESPONSE, status=status.HTTP_400_BAD_REQUEST)
        return Response(response, status=statusCode)

class BanView(RetrieveAPIView):
    def put(self, request, *args, **kwargs):
        user_profile = UserProfile.objects.get(username=request.data['username'])
        if request.data['banStatus'] and request.data['bannedUsername'] not in user_profile.banned:
            user_profile.banned.append(request.data['bannedUsername'])
            message = 'user banned'
        elif request.data['banStatus']==False and request.data['bannedUsername'] in user_profile.banned:
            user_profile.banned.remove(request.data['bannedUsername'])
            message = 'user unbanned'
        else:
            response = {
            'success': 'true',
            'statusCode': status.HTTP_200_OK,
            'message': 'doubled request',
            'data': {
                'banned':user_profile.banned}}
            return Response(response, status=status.HTTP_200_OK)
        user_profile.save()
        statusCode = status.HTTP_200_OK
        response = {
            'success': 'true',
            'statusCode': statusCode,
            'message': message,
            'data': {
                'banned':user_profile.banned}}
        return Response(response, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        user_profile = UserProfile.objects.get(username=request.data['username'])
        response = {
            'success': 'true',
            'data': []}
        for i in list(user_profile.banned):
            user = UserProfile.objects.get(username=i)
            response['data'].append({
                    'firstname': user.firstname,
                    'lastname': user.lastname,
                    'gender': user.gender,
                    'profilePic':user.profilePic
                })

        return Response(response, status=status.HTTP_200_OK)

class watchlistView(RetrieveAPIView):
    def put(self, request, *args, **kwargs):
        user_profile = UserProfile.objects.get(username=request.data['username'])
        if request.data['movieStatus'] and str(request.data['movieID']) not in user_profile.watched:
            user_profile.watched.append(request.data['movieID'])
            message = 'movie watched'
        elif request.data['movieStatus']==False and str(request.data['movieID']) in user_profile.watched:
            user_profile.watched.remove(str(request.data['movieID']))
            message = 'Movie unwatched'
        else:
            response = {
            'success': 'true',
            'statusCode': status.HTTP_200_OK,
            'message': 'doubled request',
            'data': {
                'watchlist':list(map(int, list(user_profile.watched)))}}
            return Response(response, status=status.HTTP_200_OK)
        user_profile.save()
        statusCode = status.HTTP_200_OK
        response = {
            'success': 'true',
            'statusCode': statusCode,
            'message': message,
            'data': {
                'watchlist':list(map(int, list(user_profile.watched)))}}
        return Response(response, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        user_profile = UserProfile.objects.get(username=request.data['username'])
        response = {
            'success': 'true',
            'data': []}
        for movie in list(map(int, list(user_profile.watched))):
            response['data'].append(get_movie_details(movie))
        return Response(response, status=status.HTTP_200_OK)
