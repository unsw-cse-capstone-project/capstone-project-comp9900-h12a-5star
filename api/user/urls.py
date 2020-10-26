from django.conf.urls import url
from user.views import UserRegistrationView
from user.views import UserLoginView, Homepage
from user.views import MovieSearch, MovieDetails,MovieBrowse

urlpatterns = [
    url(r'^signup', UserRegistrationView, name='signup'),
    url(r'^signin', UserLoginView, name='signin'),
    url(r'^homepage', Homepage.as_view(), name='logged_in'),
    url(r'^search', MovieSearch.as_view(), name='logged_in'),
    url(r'^moviedetail', MovieDetails.as_view(), name='logged_in'),
    url(r'^browse',MovieBrowse.as_view(),name='logged_in'),
    ]
