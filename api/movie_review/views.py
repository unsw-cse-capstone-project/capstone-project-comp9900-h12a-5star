from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from profile.models import UserProfile
from movie_review.models import movies,reviews
from movie_review.helper import verify_user

@api_view(['POST', ])
def add_review(request):
    #print(request.data)
    a,b = verify_user(request.data['user'])
    if a==False:return Response(b)
    try:
        e = reviews()
        e.movie_id = request.data['movie']
        e.review_user_id = request.data['user']
        if 'review' in request.data.keys():
            e.review = request.data['review']
        if 'rating' in request.data.keys():
            e.rating=request.data['rating']
        e.save()
        response = {
                'success': 'True',
                'status code': status.HTTP_200_OK,
                'message': 'Review added for a particular user and movie',
                }
    except Exception:
        for i in reviews.objects.filter(movie__movie_id=request.data['movie'] , review_user_id=request.data['user']):
            if 'review' in request.data.keys():
                i.review = request.data['review']
            if 'rating' in request.data.keys():
                i.rating=request.data['rating']
            i.save()
        response = {
                'success': 'True' ,
                'status code': status.HTTP_200_OK,
                'message': 'Review updated',
                }
    return Response(response)

@api_view(['GET', ])
def get_review(request):
    #print(request.data.keys())
    #print(request.data)
    if 'movie' in request.data.keys() and 'user' in request.data.keys():
        for i in reviews.objects.filter(movie__movie_id=request.data['movie'] , review_user_id=request.data['user']):
            response = {
                'success': 'True',
                'status code': status.HTTP_200_OK,
                'review':i.review,
                'rating':i.rating,
                'watched':i.watched,
                'liked':i.liked,
                'wishlist':i.wishlist
                }
    elif 'movie' in request.data.keys():
        response = {
                'success': 'True',
                'status code': status.HTTP_200_OK,
                'review':[],
                'user':[],
                'rating':[]
                }
        for i in reviews.objects.filter(movie__movie_id=request.data['movie']):
            response['review'].append(i.review)
            response['user'].append(i.review_user_id)
            response['rating'].append(i.rating)
    else:
        response = {
                'success': 'True',
                'status code': status.HTTP_200_OK,
                'review':[],
                'movie':[],
                'rating': [],
                'liked': [],
                'wishlist': [],
                'watched': []
                }
        for i in reviews.objects.filter(review_user_id=request.data['user']):
            response['review'].append(i.review)
            response['rating'].append(i.rating)
            response['movie'].append(i.movie_id)
            response['liked'].append(i.liked)
            response['wishlist'].append(i.wishlist)
            response['watched'].append(i.watched)
    return Response(response)

@api_view(['POST', ])
def add_rating(request):
    print(request.data)
    try:
        for i in reviews.objects.filter(movie__movie_id=request.data['movie'] , review_user_id=request.data['user']):
            i.rating = request.data['rating']
            i.save()
        response = {
                'success': 'True',
                'status code': status.HTTP_200_OK,
                'message': 'rating updated for a new user and movie',
                }
    except Exception:
        e = reviews()
        e.movie_id = request.data['movie']
        e.review_user_id = request.data['user']
        if 'rating' in request.data.keys():
            e.rating=request.data['rating']
        e.save()
        response = {
                'success': 'True',
                'status code': status.HTTP_200_OK,
                'message': 'rating added for a new user and movie',
                }
    return Response(response)

##adding or updating wishlist
@api_view(['POST', ])
def add_to_wishlist(request):
    print(request.data)
    a,b = verify_user(request.data['user'])
    if a==False:
        return Response(b)
    try:
        for i in reviews.objects.filter(movie__movie_id=request.data['movie'] , review_user_id=request.data['user']):
            i.wishlist = request.data['wishlist']
            i.save()
        response = {
                'success': 'True',
                'status code': status.HTTP_200_OK,
                'message': 'wishlist updated for a new user and movie',
                }
    except Exception:
        e = reviews()
        e.movie_id = request.data['movie']
        e.review_user_id = request.data['user']
        if 'wishlist' in request.data.keys():
            e.wishlist=request.data['wishlist']
        e.save()
        response = {
                'success': 'True',
                'status code': status.HTTP_200_OK,
                'message': 'wishlist added for a new user and movie',
                }
    return Response(response)

##getting all movies with wishlisted by a user
@api_view(['GET', ])
def get_wishlist(request):
    print(request.data)
    a,b = verify_user(request.data['user'])
    if a==False:
        return Response(b)
    response = {
                'success': 'True',
                'status code': status.HTTP_200_OK,
                'wishlist': []
                }
    for i in reviews.objects.filter(review_user_id=request.data['user']):
        if i.wishlist == True:
            response['wishlist'].append(i.movie_id)
    return Response(response)
