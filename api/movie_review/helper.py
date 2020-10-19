from rest_framework.response import Response
from rest_framework import status
from profile.models import UserProfile
from movie_review.models import movies,reviews

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
