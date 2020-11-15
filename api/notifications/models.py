from django.db import models

# Create your models here.
class notifications(models.Model):
    toUsername = models.CharField(max_length=30, blank=True, unique=False)
    fromUsername = models.CharField(max_length=30, blank=True, unique=False)
    type = models.CharField(max_length=30, blank=True, unique=False) #type of notification
    movieId = models.IntegerField(default=0, blank=False)
    movieTitle = models.CharField(max_length=30, blank=True, unique=False)
    status = models.BooleanField(default=False) #read=True or unread=False
    sent = models.BooleanField(default=False)

    Time=models.TimeField(auto_now=False, default=None)
    Date=models.DateField(auto_now=False, default=None)

    addTime=models.TimeField(auto_now=True)
    addDate=models.DateField(auto_now=True)
