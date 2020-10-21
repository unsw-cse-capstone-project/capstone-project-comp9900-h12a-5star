from rest_framework import status
from rest_framework.generics import RetrieveAPIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
#from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from profile.models import UserProfile

statusCode = status.HTTP_400_BAD_REQUEST
RESPONSE = {
    'success': 'false',
    'status code': status.HTTP_400_BAD_REQUEST,
    'message': 'User does not exists',
    }

class UserProfileView(RetrieveAPIView):
    def get(self, request, *args, **kwargs):
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
                    'languages':user_profile.languages}}
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
                    'languages':user_profile.languages,}}
        except Exception as e:
            RESPONSE['error']= str(e)
            return Response(RESPONSE, status=statusCode)
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

    def get(self, request, *args, **kwargs):
        user_profile = UserProfile.objects.get(username=request.data['username'])
        response = {
            'success': 'true',
            'data': {
                'banned':user_profile.banned}}
        return Response(response, status=status.HTTP_200_OK)

class watchlistView(RetrieveAPIView):
    def put(self, request, *args, **kwargs):
        user_profile = UserProfile.objects.get(username=request.data['username'])
        if str(request.data['movieID']) not in user_profile.watched:
            user_profile.watched.append(request.data['movieID'])
            message = 'movie watched'
        else:
            user_profile.watched.remove(str(request.data['movieID']))
            message = 'Movie unwatched'
        user_profile.save()
        statusCode = status.HTTP_200_OK
        response = {
            'success': 'true',
            'statusCode': statusCode,
            'message': message,
            'data': {
                'banned':list(map(int, list(user_profile.watched)))}}
        return Response(response, status=status.HTTP_200_OK)

    def get(self, request, *args, **kwargs):
        user_profile = UserProfile.objects.get(username=request.data['username'])
        response = {
            'success': 'true',
            'data': {
                'banned':list(map(int, list(user_profile.watched)))}}
        return Response(response, status=status.HTTP_200_OK)
