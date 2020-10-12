from django import forms
from django.contrib.auth.models import User
from django.forms.models import ModelForm
from django_select2.forms import Select2MultipleWidget

from .models import UserProfile

User._meta.get_field('email')._unique = True


class ProfileForm(ModelForm):
    class Meta:
        model = UserProfile
        fields = ('Gender','Languages','Genre')
        widgets = {
            'interests': Select2MultipleWidget,
        }


class UserForm(ModelForm):
    password = forms.CharField(widget=forms.PasswordInput)

    class Meta:
        model = User
        fields = ('username', 'password', 'email','first_name','last_name')

    def save(self, commit=True):
        new_user = User.objects.create_user(self.cleaned_data['username'],
                                            self.cleaned_data['email'],
                                            self.cleaned_data['password'])
        if commit:
            new_user.save()
        return new_user
