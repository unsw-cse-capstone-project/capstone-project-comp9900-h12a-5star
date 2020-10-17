from django.conf.urls import url
from movie_review.views import add_review, get_review


urlpatterns = [
    url(r'^addreview', add_review, name='add_rev'),
    url(r'^getreview', get_review, name='add_rev'),
    ]
