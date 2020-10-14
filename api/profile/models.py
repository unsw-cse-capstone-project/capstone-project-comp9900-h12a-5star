import uuid
from django.db import models
from user.models import User
from multiselectfield import MultiSelectField


class UserProfile(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    username = models.CharField(max_length=30, blank=False, unique=True)
    first_name = models.CharField(max_length=50, unique=False)
    last_name = models.CharField(max_length=50, unique=False)
    GENDER_CHOICES = (
        ('Male', 'Male'),
        ('Female', 'Female'),
    )
    Gender = models.CharField(max_length=6, choices=GENDER_CHOICES,default=None)

    Genre_CHOICES = (
        ('Horror', 'Horror'),
        ('Fiction', 'Fiction'),
        ('Comedy', 'Comedy'),
        ('Action', 'Action'),
     )
    Genres = MultiSelectField(choices = Genre_CHOICES,blank=True,null=True)

    Language_CHOICES = (
        ('English', 'English'),
        ('Spanish', 'Spanish'),
        ('Chinkish', 'Chinkish'),
        ('Hindhi', 'Hindhi'),
     )
    Languages = MultiSelectField(choices = Language_CHOICES, default= None)

    class Meta:
        '''
        to set table name in database
        '''
        db_table = "profile"
