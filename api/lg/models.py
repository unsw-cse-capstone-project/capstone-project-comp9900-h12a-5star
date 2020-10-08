from django.contrib.auth.models import User
from django.db import models
from multiselectfield import MultiSelectField


class UserProfile(models.Model):
    Genre_CHOICES = (
        ('Horror', 'Horror'),
        ('Fiction', 'Fiction'),
        ('Comedy', 'Comedy'),
        ('Action', 'Action'),
     )
    Genre = MultiSelectField(choices = Genre_CHOICES, default= None)

    Language_CHOICES = (
        ('English', 'English'),
        ('Spanish', 'Spanish'),
        ('Chinkish', 'Chinkish'),
        ('Hindhi', 'Hindhi'),
     )
    Languages = MultiSelectField(choices = Language_CHOICES, default= None)

    Gender_choices = (
        ('Male', 'Male'),
        ('Female', 'Female'),
    )
    Gender = models.CharField(max_length=6,choices=Gender_choices,default=None)

