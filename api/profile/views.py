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
            response = {
                'success': 'false',
                'status code': status.HTTP_400_BAD_REQUEST,
                'message': 'User does not exists',
                'error': str(e)
                }
        return Response(response, status=status_code)
