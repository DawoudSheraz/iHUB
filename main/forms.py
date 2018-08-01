from django.forms import ModelForm
from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from main.models import Student, Professor


class StudentForm(ModelForm):

    class Meta:
        model = Student
        fields = ['name', 'age', 'gender', 'experience', 'skills']


class ProfessorForm(ModelForm):

    class Meta:
        model = Professor
        fields = ['name', 'age', 'gender', 'related_university', 'expertise']


class UserSignUpForm(UserCreationForm):

    email = forms.EmailField(max_length=150, help_text="Required")

    class Meta:
        model = User
        fields = ['username', 'email', 'password1', 'password2']


class StudentSignUpForm(ModelForm):

    class Meta:
        model = Student
        fields = ['name', 'age', 'gender', 'experience',
                  'skills']


class ProfessorSignUpForm(ModelForm):

    class Meta:
        model = Professor
        fields = ['name', 'age', 'gender', 'related_university',
                  'expertise']



