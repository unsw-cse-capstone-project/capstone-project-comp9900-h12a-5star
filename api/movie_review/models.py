from djongo import models
from user.models import User
from profile.models import UserProfile

class movies(models.Model):
    movie_id = models.IntegerField(unique=True,default=0)

class reviews(models.Model):
    class Meta:
        unique_together = (('review_user', 'movie'),)

    review_user = models.ForeignKey(UserProfile,to_field='username', related_name='review_user', on_delete=models.CASCADE, default=None)
    movie = models.ForeignKey(movies,to_field='movie_id', related_name='movie', on_delete=models.CASCADE, default=None)
    review = models.CharField(max_length=300, blank=True, unique=False)
    rating=models.FloatField()
    wishlist=models.BooleanField(default=False)
    liked=models.BooleanField(default=False)
    watched=models.BooleanField(default=False)
