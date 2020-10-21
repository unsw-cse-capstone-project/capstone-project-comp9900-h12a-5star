from django.conf.urls import url
from profile.views import UserProfileView, BanView


urlpatterns = [
    url(r'^profile', UserProfileView.as_view(), name='profile'),
    url(r'^BanUser', BanView.as_view(), name='Banning'),
    ]
