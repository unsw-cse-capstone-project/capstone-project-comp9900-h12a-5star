from django.contrib.auth import authenticate
from rest_framework import serializers, fields
from profile.models import UserProfile
from user.models import User
from django_select2.forms import Select2MultipleWidget
import random

pictures = {'Female': ['https://react.semantic-ui.com/images/avatar/large/molly.png',
'https://react.semantic-ui.com/images/avatar/large/jenny.jpg',
'https://react.semantic-ui.com/images/avatar/large/stevie.jpg',
'https://react.semantic-ui.com/images/avatar/large/helen.jpg',
'https://react.semantic-ui.com/images/avatar/large/laura.jpg'],
'Male': ['https://react.semantic-ui.com/images/avatar/large/elliot.jpg',
'https://react.semantic-ui.com/images/avatar/large/matthew.png',
'https://react.semantic-ui.com/images/avatar/large/steve.jpg',
'https://react.semantic-ui.com/images/avatar/large/daniel.jpg',
'https://react.semantic-ui.com/images/avatar/large/joe.jpg',
'https://react.semantic-ui.com/images/avatar/large/christian.jpg',
'https://react.semantic-ui.com/images/avatar/large/matt.jpg']}

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ('firstname', 'lastname','username', 'gender','languages','genres')
        widgets = {
            'interests': Select2MultipleWidget,
        }

#user registers here. Create func. creates a user object and returns
class UserRegistrationSerializer(serializers.ModelSerializer):

    profile = UserSerializer(required=False)
    genre = serializers.ListField(
        child = serializers.CharField()
    )
    language = serializers.ListField(
        child = serializers.CharField()
    )

    class Meta:
        model = User
        fields = ('email', 'password','profile','genre',"language")
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
#        print('yes!!!!',validated_data)
        profile_data = validated_data.pop('profile')
        #print(profile_data)
        user = User.objects.create_user(validated_data['email'],validated_data['password'])
        UserProfile.objects.create(
            user=user,
            username = profile_data['username'],
            firstname=profile_data['firstname'],
            lastname=profile_data['lastname'],
            gender=profile_data['gender'],
            languages=validated_data['language'],
            genres=validated_data['genre'],
            profilePic = random.choice(pictures[profile_data['gender']])
        )
        return user

#user login handled here.
class UserLoginSerializer(serializers.Serializer):

    email = serializers.CharField(max_length=255)
    password = serializers.CharField(max_length=128, write_only=True)

    def validate(self, data):
        email = data.get("email", None)
        password = data.get("password", None)
        #print('yess',data)
        user = authenticate(email=email, password=password)
        if user is None:
            raise serializers.ValidationError(
                'A user with this email and password is not found.'
            )
        if User.DoesNotExist:
            raise serializers.ValidationError(
                'User with given email and password does not exists'
            )
        return {
            'email':user.email
        }
