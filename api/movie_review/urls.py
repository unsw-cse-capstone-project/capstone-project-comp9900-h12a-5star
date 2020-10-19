from django.conf.urls import url
from movie_review.views import add_review, get_review, add_rating, add_to_wishlist, get_wishlist


urlpatterns = [
    url(r'^addreview', add_review, name='add_rev'),
    url(r'^getreview', get_review, name='get_rev'),
    url(r'^addrating', add_rating, name='add_rating'),
    url(r'^addWishlist/', add_to_wishlist, name='add_wishlist'),
    url(r'^viewWishlist/', get_wishlist, name='get_wishlist'),
    ]
