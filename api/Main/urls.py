from django.urls import path, include


urlpatterns = [
    path('api/', include('user.urls')),
    path('api/', include('profile.urls')),
    path('api/', include('movie_review.urls')),
    path('api/', include('notifications.urls'))
]

