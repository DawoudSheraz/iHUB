from django.forms import ModelForm
from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from main.models import *


class StudentForm(ModelForm):

    class Meta:
        model = Student
        fields = ['name', 'age', 'gender', 'experience', 'skills']


class ProfessorForm(ModelForm):

    class Meta:
        model = Professor
        fields = ['name', 'age', 'gender', 'related_university', 'skills']


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
                  'skills']


class TenureForm(ModelForm):

    start_date = forms.DateTimeField(widget=forms.DateTimeInput)

    duration = forms.DurationField()

    class Meta:
        model = Tenure
        fields = ['start_date', 'duration']


class AboutForm(ModelForm):

    class Meta:
        model = About
        fields = ['title', 'description']


class LocationForm(ModelForm):

    class Meta:
        model = Location
        fields = ['name', 'city', 'country']


class SubmissionFormView(ModelForm):

    class Meta:
        model = SubmissionForm
        fields = ['required_docs', 'steps_to_apply']


class QualificationsForm(ModelForm):

    class Meta:
        model = Qualifications
        fields = ['minimum', 'preferred']


class GrantForm(ModelForm):

    class Meta:
        model = Grant
        fields = ['amount']


class ConferenceForm(ModelForm):

    class Meta:
        model = Conference
        fields = ['call_for_paper_deadline', 'key_speakers'
                  , 'source', 'ranking', 'fields_of_interest'
                  , 'sponsors', 'contacts', 'covered_expenses']


class ScholarshipForm(ModelForm):

    class Meta:
        model = Scholarship
        fields = ['funding', 'number_of_positions', 'deadline', 'source'
                  , 'scholarship_maintenance_criteria', 'perks_offered'
                  , 'fields_of_interest', 'contacts', 'sponsors'
                    , 'host_universities']


class SelectGenderForm(forms.Form):

    _selected_action = forms.CharField(widget=forms.MultipleHiddenInput)
    gender = forms.ChoiceField((
            ('Male', 'Male')
            , ('Female', 'Female')
            , ('X', 'X')))






