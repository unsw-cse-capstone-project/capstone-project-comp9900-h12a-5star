from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from notifications.models import notifications


@api_view(['POST', ])
def suggestMovie(request):
    new = notifications()
    new.toUsername = request.data['toUser']
    new.fromUsername = request.data['fromUser']
    new.movieId = request.data['movieId']
    new.type = 'SUGGESTION'
    new.save()

    response = {
            'success': 'true',
    }
    return Response(response, status=status.HTTP_200_OK)
