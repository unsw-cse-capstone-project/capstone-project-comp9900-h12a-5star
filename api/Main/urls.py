from django.urls import path, include


urlpatterns = [
    path('api/', include('user.urls')),
    path('api/', include('profile.urls'))
]

