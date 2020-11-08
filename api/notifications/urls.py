from django.conf.urls import url
from notifications.views import suggestMovie


urlpatterns = [
    url(r'^suggestMovie', suggestMovie, name='suggestMovie'),
    ]
