from rest_framework import status
from rest_framework.generics import RetrieveAPIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
#from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from profile.models import UserProfile

STATUS_CODE = status.HTTP_400_BAD_REQUEST
RESPONSE = {
    'success': 'false',
    'status code': status.HTTP_400_BAD_REQUEST,
    'message': 'User does not exists',
    }

class UserProfileView(RetrieveAPIView):
    def get(self, request, *args, **kwargs):
        try:
            user_profile = UserProfile.objects.get(username=request.data['username'])
            status_code = status.HTTP_200_OK
            response = {
                'success': 'true',
                'status code': status_code,
                'message': 'User profile fetched successfully',
                'data': {
                    'firstname': user_profile.firstname,
                    'lastname': user_profile.lastname,
                    'gender': user_profile.gender,
                    'genres':user_profile.genres,
                    'languages':user_profile.languages}}
        except Exception as e:
            RESPONSE['error']= str(e)
            return Response(RESPONSE, status=STATUS_CODE)
        return Response(response, status=status_code)

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
            status_code = status.HTTP_200_OK
            response = {
                'success': 'true',
                'status code': status_code,
                'message': 'User profile updates successfully',
                'data': {
                    'firstname': user_profile.firstname,
                    'lastname': user_profile.lastname,
                    'gender': user_profile.gender,
                    'genres':user_profile.genres,
                    'languages':user_profile.languages,}}
        except Exception as e:
            RESPONSE['error']= str(e)
            return Response(RESPONSE, status=STATUS_CODE)
        return Response(response, status=status_code)

class BanView(RetrieveAPIView):
    def put(self, request, *args, **kwargs):
        user_profile = UserProfile.objects.get(username=request.data['username'])
        if request.data['bannedUsername'] not in user_profile.banned:
            user_profile.banned.append(request.data['bannedUsername'])
            message = 'user banned'
        else:
            user_profile.banned.remove(request.data['bannedUsername'])
            message = 'user unbanned'
        user_profile.save()
        status_code = status.HTTP_200_OK
        response = {
            'success': 'true',
            'status code': status_code,
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
