from django.forms import ModelForm
from django import forms
from django.contrib import messages
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


class ChangeExperienceRequiredForm(forms.Form):

    _selected_action = forms.CharField(widget=forms.MultipleHiddenInput)
    experience = forms.ChoiceField(
        (
            ('0-1 Years', '0-1 Years')
            , ('2-3 Years', '2-3 Years')
            , ('4-5 Years', '4-5 Years')
            , ('5+ Years', '5+ Years')
        )
    )


class ScheduleInlineFormset(forms.models.BaseInlineFormSet):

    def save_new(self, form, commit=True):

        schedule = super(ScheduleInlineFormset, self).save_new(form)
        return self.check_schedule_date(schedule, self.request)

    def save_existing(self, form, instance, commit=True):

        schedule = super(ScheduleInlineFormset, self).save_existing(form, instance)
        return self.check_schedule_date(schedule, self.request)

    # Checks the schedule date with conference dates and adjusts it accordingly
    def check_schedule_date(self, schedule, request):
        conf_start_date = schedule.related_conference.duration.start_date
        conf_end_date = schedule.related_conference.duration.get_end_date()

        # If date is b/w the conference start and end date, return object
        if conf_start_date <= schedule.date <= conf_end_date:
            return schedule
        else:
            messages.set_level(request, messages.WARNING)
            messages.warning(request
                             , 'Schedule (%s) date set to conference start date'
                             % schedule.description)
            schedule.date = conf_start_date
            schedule.save()
        return schedule





