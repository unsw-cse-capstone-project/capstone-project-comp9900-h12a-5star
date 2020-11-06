from django.db import models

# Create your models here.
class notifications(models.Model):
    toUsername = models.CharField(max_length=30, blank=False, unique=False)
    fromUsername = models.CharField(max_length=30, blank=False, unique=False)
    type = models.CharField(max_length=30, blank=False, unique=False)
    movieId = models.IntegerField(default=0, blank=False)
    status = models.BooleanField(default=False)

    addTime=models.TimeField(auto_now=True)
    addDate=models.DateField(auto_now=True)
