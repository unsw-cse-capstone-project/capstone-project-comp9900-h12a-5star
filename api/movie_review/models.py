from djongo import models
from user.models import User
from profile.models import UserProfile

class movies(models.Model):
    movie_id = models.IntegerField(unique=True,default=0)

class reviews(models.Model):
    class Meta:
        unique_together = (('review_user_id', 'movie_id'),)

    review_user_id = models.CharField(max_length=30, blank=False, unique=False)
    #movie = models.ForeignKey(movies,to_field='movie_id', related_name='movie', on_delete=models.CASCADE, default=None)
    movie_id = models.IntegerField(unique=False,default=0)
    review = models.CharField(max_length=300, blank=True, unique=False)
    rating=models.FloatField(default=0.0)
    wishlist=models.BooleanField(default=False)
    liked=models.BooleanField(default=False)
    watched=models.BooleanField(default=False)
    review_time=models.TimeField(auto_now=True)
    review_date=models.DateField(auto_now=True)
    upvote_count=models.IntegerField(default=0)
    downvote_count=models.IntegerField(default=0)
    follow=models.BooleanField(default=False)
