# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render, redirect, render_to_response
from django.contrib import auth
from django.http import Http404
from django.views.generic import ListView, DetailView
from django.contrib.auth import login, authenticate
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from models import *
from forms import *
from . import forms


def login_view(request):
    """
    Returns html page to take user input, redirects to index if session exist

    """
    if request.user.is_authenticated():
        return render(request, "main/index.html")
    return render(request, "main/login.html")


@login_required
def edit_user(request):
    """
    Editing the logged in user through ModelForm.
    """
    user = User.objects.get(username=request.user.username)

    # If user is admin, redirect
    if user.is_staff:
        return redirect('/main/')

    # Check if user is Student/Professor
    # and assign instance and form accordingly
    try:
        instance = user.profile.student
        form = StudentForm
    except:
        instance = user.profile.professor
        form = ProfessorForm

    # If previously submitted data, save update
    if request.POST:
        form = form(instance=instance, data=request.POST)
        if form.is_valid():
            form.save()
    else:
        form = form(instance=instance)

    return render(request, 'main/user_edit.html', {'form': form})


def sign_up_student(request):
    """
    New Student is created, verified and redirected
    """

    if request.method == 'POST':

        student_form = StudentSignUpForm(request.POST)
        user_form = UserSignUpForm(request.POST)

        # If both user and student forms have data
        if user_form.is_valid() and student_form.is_valid():
            # Save Auth USer
            user = user_form.save()

            # Create Empty student and set its credentials
            student = Student()
            student.user = user

            # Create form with instance student and data from POST
            student_form = StudentSignUpForm(instance=student,
                                             data=request.POST)
            student_form.save()

            # Authenticate the User
            username = user_form.cleaned_data.get('username')
            raw_password = user_form.cleaned_data.get('password1')
            user = authenticate(username=username, password=raw_password)
            login(request, user)
            return render(request, 'main/index.html')
    else:
        student_form = StudentSignUpForm()
        user_form = UserSignUpForm()

    return render(request, 'main/signup_student.html'
                  , {'student_form': student_form, 'user_form': user_form})


def sign_up_professor(request):
    """
    New Professor is created, verified and redirected
    """

    if request.method == 'POST':

        professor_form = ProfessorSignUpForm(request.POST)
        user_form = UserSignUpForm(request.POST)

        # If both user and professor forms have data
        if user_form.is_valid() and professor_form.is_valid():
            # Save Auth USer
            user = user_form.save()

            # Create Empty professor and set its credentials
            professor = Professor()
            professor.user = user

            # Create form with instance professor and data from POST
            professor_form = ProfessorSignUpForm(instance=professor,
                                                 data=request.POST)
            professor_form.save()

            # Authenticate the User
            username = user_form.cleaned_data.get('username')
            raw_password = user_form.cleaned_data.get('password1')
            user = authenticate(username=username, password=raw_password)
            login(request, user)
            return render(request, 'main/index.html')
    else:
        professor_form = ProfessorSignUpForm()
        user_form = UserSignUpForm()

    return render(request, 'main/signup_professor.html'
                  , {'professor_form': professor_form, 'user_form': user_form})


@login_required
def add_conference(request):
    """
    New Conference Addition
    """
    if request.method == 'POST':

        # Create Forms with data from POST request
        about_form = AboutForm(request.POST)
        conference_form = ConferenceForm(request.POST)
        duration_form = TenureForm(request.POST)
        location_form = LocationForm(request.POST)

        # Check if entered data is valid
        if about_form.is_valid()\
            and conference_form.is_valid()\
            and duration_form.is_valid()\
            and location_form.is_valid():

            # Duration & Location are checked through get_or_create
            # as they are 1-M related to Conference
            tenure = Tenure.objects.get_or_create(start_date=duration_form.cleaned_data.get('start_date')
                                                  , duration=duration_form.cleaned_data.get('duration'))[0]

            venue = Location.objects.get_or_create(name=location_form.cleaned_data.get('name')
                                                   , country=location_form.cleaned_data.get('country')
                                                   , city=location_form.cleaned_data.get('city'))[0]

            # About instance is created, populated with id
            # and then passed to form to save the object
            # about = About()
            # about_form = AboutForm(instance=about, data=request.POST)
            about = about_form.save()

            # Conference object created, the relationship objects are defined
            # and then, the instance is passed to form with POST data
            conf = Conference()
            conf.conference_venue = venue
            conf.duration = tenure
            conf.info = about
            conference_form = ConferenceForm(instance=conf, data=request.POST)
            conf = conference_form.save()
            return render_to_response('main/index.html')

    else:
        about_form = AboutForm()
        conference_form = ConferenceForm()
        duration_form = TenureForm()
        location_form = LocationForm()

    return render(request, 'main/add_conf.html'
                  , {'about_form': about_form
                     , 'conference_form': conference_form
                     , 'duration_form': duration_form
                     , 'location_form': location_form})


@login_required
def add_scholarship(request):

    if request.method == 'POST':

        about_form = AboutForm(request.POST)
        duration_form = TenureForm(request.POST)
        grant_form = GrantForm(request.POST)
        app_form = SubmissionFormView(request.POST)
        requirements_form = QualificationsForm(request.POST)
        scholarship_form = ScholarshipForm(request.POST)

        if about_form.is_valid()\
            and duration_form.is_valid()\
            and grant_form.is_valid()\
            and app_form.is_valid()\
            and requirements_form.is_valid()\
            and scholarship_form.is_valid():

            tenure = Tenure.objects.get_or_create(start_date=duration_form.cleaned_data.get('start_date')
                                                  , duration=duration_form.cleaned_data.get('duration'))[0]

            grant = Grant.objects.get_or_create(amount=grant_form.cleaned_data.get('amount'))[0]

            qualifications = Qualifications.objects.get_or_create(
                minimum=requirements_form.cleaned_data.get('minimum')
                , preferred=requirements_form.cleaned_data.get('preferred')
            )[0]

            # about = About()
            # about.id = about_form.cleaned_data.get('title')
            # about_form = AboutForm(instance=about, data=request.POST)
            about = about_form.save()

            application = SubmissionForm()
            application.title = about.title
            requirements_form = forms.SubmissionFormView(instance=application, data=request.POST)
            application = requirements_form.save()

            scholarship = Scholarship()
            scholarship.duration = tenure
            scholarship.amount_granted = grant
            scholarship.information = about
            scholarship.application_form = application
            scholarship.criteria = qualifications

            scholarship_form = ScholarshipForm(instance=scholarship, data=request.POST)
            scholarship = scholarship_form.save()
            return render_to_response('/main/index.html')

    else:
        about_form = AboutForm()
        duration_form = TenureForm()
        grant_form = GrantForm()
        app_form = SubmissionFormView()
        requirements_form = QualificationsForm()
        scholarship_form = ScholarshipForm()

    return render(request, 'main/add_sch.html',
                  {'about_form': about_form
                      , 'duration_form': duration_form
                   , 'grant_form': grant_form
                   , 'app_form': app_form
                   , 'requirements_form': requirements_form
                   , 'scholarship_form': scholarship_form
                   })


def user_login(request):
    """
    Checks if a user exists and login the valid user
    """
    if request.user.is_authenticated():
        return render(request, "main/index.html")
    try:
        username = request.POST['username']
        password = request.POST['password']
        user = auth.authenticate(request
                                 , username=username
                                 , password=password
                                 , email=username)
        if user:
            auth.login(request, user)
            return redirect('/main/')
        else:
            return render(request, 'main/login.html', context={
                'error': True
            })
    # If value not defines
    except KeyError:
        return render(request, 'main/login.html')


def user_logout(request):
    """
    logs out a user
    """

    auth.logout(request)
    return redirect('/main/')


# Listing and Details done via Class Based Views


class ScholarshipListView(ListView):

    queryset = Scholarship.objects.order_by('-duration__start_date')
    paginate_by = 5
    context_object_name = 'scholarship_list'


class ConferenceListView(ListView):

    queryset = Conference.objects.order_by('-duration__start_date')
    paginate_by = 5
    context_object_name = 'conference_list'


class StudentPositionListView(ListView):

    queryset = StudentPosition.objects.order_by('-duration__start_date')
    paginate_by = 5
    context_object_name = 'job_list'
    template_name = 'main/job_list.html'


class ConferenceDetailView(DetailView):

    context_object_name = 'conference'
    template_name = 'main/conference_details.html'
    model = Conference
    pk_url_kwarg = 'id'

    # To redirect in case the object is not found
    def get(self, request, *args, **kwargs):

        try:
            self.object = self.get_object()
        except Http404:
            return redirect('/main/conferences/')

        context = self.get_context_data(object=self.object)
        return self.render_to_response(context)


class ScholarshipDetailView(DetailView):

    context_object_name = 'scholarship'
    template_name = 'main/scholarship_details.html'
    model = Scholarship
    pk_url_kwarg = 'id'

    # To redirect in case the object is not found
    def get(self, request, *args, **kwargs):

        try:
            self.object = self.get_object()
        except Http404:
            return redirect('/main/scholarships/')

        context = self.get_context_data(object=self.object)
        return self.render_to_response(context)


class StudentPositionDetailView(DetailView):

    context_object_name = 'student_job_position'
    template_name = 'main/job_details.html'
    model = StudentPosition
    pk_url_kwarg = 'id'

    # To redirect in case the object is not found
    def get(self, request, *args, **kwargs):

        try:
            self.object = self.get_object()
        except Http404:
            return redirect('/main/job_positions/')

        context = self.get_context_data(object=self.object)
        return self.render_to_response(context)
