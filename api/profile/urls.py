from django.conf.urls import url
from profile.views import UserProfileView, BanView, watchlistView, followUser, unfollowUser


urlpatterns = [
    url(r'^profile', UserProfileView.as_view(), name='profile'),
    url(r'^banUsername', BanView.as_view(), name='Banning'),
    url(r'^watchMovie', watchlistView.as_view(), name='Watchlist'),
    url(r'^followUser', followUser.as_view(), name='follow'),
    url(r'^unfollowUser', unfollowUser.as_view(), name='unfollow'),
    ]
