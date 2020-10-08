from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import HttpResponse
from django.shortcuts import redirect
# Create your views here.
from django.views.generic import TemplateView
from django.views.generic.base import View
from tmdbv3api import TMDb
import requests
from collections import defaultdict
from .forms import ProfileForm
from .forms import UserForm
import json
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response

class Index(TemplateView):
    template_name = 'index.html'

    def get_context_data(self, **kwargs):
        ctx = {}
        ctx['loggedIn'] = False
        if self.request.user.is_authenticated:
            ctx['loggedIn'] = True
        return ctx
class Homepage(APIView):
    def get(self, request):
            required=['popular','top_rated','now_playing']
            #Tmdb provides maximum of 20 results for each page and we can't send Multiple page requests in single Query so using For loop
            intial_homepage=defaultdict(list)
            final_homepage=defaultdict(list)
            poster_url='http://image.tmdb.org/t/p/w780/'
            for i in range(1,4):
                for j in required:
                    url='https://api.themoviedb.org/3/movie/'+j+'?api_key=c8b243a9c923fff8227feadbf8e4294e&language=en-US&page='+str(i)
                    response=requests.get(url)
                    intial_homepage[j].extend(response.json()['results'])
            #intial_homepage consistis of all the details of movies returned from the movie , but we require only ID, RELASEDATE , POSTER, DESCRIPTION, TITLE of every movie in each Required list. so forming our final home_page
            for i in required:
                for j in range(0,50):
                    d={}
                    d['id']=intial_homepage[i][j]['id']
                    d['title']=intial_homepage[i][j]['title']
                    d['rating']=int(intial_homepage[i][j]['vote_average'])/2
                    d['description']=intial_homepage[i][j]['overview']
                    d['poster']=poster_url+intial_homepage[i][j]['poster_path']
                    d['release_date']=intial_homepage[i][j]['release_date']
                    final_homepage[i].append(d)
            home_page=json.dumps(final_homepage)
            return JsonResponse(home_page)
class SignUpView(TemplateView):
    template_name = 'signup.html'

    def get_context_data(self, **kwargs):
        ctx = super(SignUpView, self).get_context_data(**kwargs)
        ctx['user_form'] = UserForm(prefix='user')
        ctx['profile_form'] = ProfileForm(prefix='profile')
        return ctx

    def post(self, request, *args, **kwargs):
        user_form = UserForm(request.POST, prefix='user')
        profile_form = ProfileForm(request.POST, request.FILES, prefix='profile')
        if profile_form.is_valid() and user_form.is_valid():
            user = user_form.save(commit=False)
            profile = profile_form.save(commit=False)
            user.save()
            profile.user = user
            profile.save()
            return HttpResponse("Signed Up!<br><a href='/'>Go to home</a>")
        else:
            return HttpResponse("Error : <a href='/signup'>Try again</a>!")


class LoginView(TemplateView):
    template_name = 'login.html'

    def post(self, request, *args, **kwargs):
        username = request.POST.get('username', False)
        password = request.POST.get('password', False)
        if username and password:
            user = authenticate(request, username=username, password=password)
            if user is not None:
                login(request, user)
                return redirect('/homepage')
            else:
                return HttpResponse('Error: User authentication error <a href="/login"">Try again</a>')
        else:
            return HttpResponse('Error: Username or password is empty <a href="/login">Try again</a>')


class LogoutView(View, LoginRequiredMixin):
    def get(self, request):
        logout(request)
        return redirect('/')
