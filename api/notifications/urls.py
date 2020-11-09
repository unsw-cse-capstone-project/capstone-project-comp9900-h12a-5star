from django.conf.urls import url
from notifications.views import suggestMovie,getNotifications, NotificationRead


urlpatterns = [
    url(r'^suggestMovie', suggestMovie, name='suggestMovie'),
    url(r'^getNotifications', getNotifications, name='getNotifications'),
    url(r'^NotificationRead', NotificationRead, name='statusUpdate')
    ]
