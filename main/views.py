# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render, redirect
from django.contrib import auth
from django.contrib.auth import login, authenticate
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from models import *
from forms import *


def index_view(request):
    return render(request, "main/index.html")


def user_select_view(request):
    return render(request, "main/choose_user.html")


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

            student.profile_id = '%s_%s' % (student.name
                                            , user_form.cleaned_data.get('username'))

            # Create form with instance student and data from POST
            student_form = StudentSignUpForm(instance=student, data=request.POST)
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

            professor.profile_id = '%s_%s' % (professor.name
                                            , user_form.cleaned_data.get('username'))

            # Create form with instance professor and data from POST
            professor_form = ProfessorSignUpForm(instance=professor, data=request.POST)
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


def job_position_list_view(request):

    job_list = StudentPosition.objects.order_by('-duration__start_date')

    return render(request, 'main/job_list.html', context={
        'job_list': job_list
    })


def conference_list_view(request):
    """
    gets all conferences, sorted by date and pass them to HTML
    """
    conference_list = Conference.objects.order_by('-duration__start_date')

    return render(request, "main/conference_list.html", context={
        'conference_list': conference_list
    })


def scholarship_list_view(request):
    """
    Gets all scholarships and sort them by date
    """
    scholarship_list = Scholarship.objects.order_by('-duration__start_date')

    return render(request, 'main/scholarship_list.html', context={
        'scholarship_list': scholarship_list
    })


def get_conference_by_id(request, conf_id):

    """
    Get conference using id.

    :param request: HTTP request
    :param conf_id: the id against which conference is searched
    :return: detail page, or redirects if not found
    """
    try:
        conference = Conference.objects.get(id=conf_id)

        return render(request
                      , "main/conference_details.html"
                      , context={
                        'conference': conference}
                      )

    except Conference.DoesNotExist:
        return conference_list_view(request)


def get_job_by_id(request, job_id):

    """
    Get Student Job Position using id.
    """
    try:
        student_job_position = StudentPosition.objects.get(id=job_id)

        return render(request
                      , "main/job_details.html"
                      , context={
                        'student_job_position': student_job_position}
                      )

    except StudentPosition.DoesNotExist:
        return job_position_list_view(request)


def get_scholarship_by_id(request, sch_id):
    """
    Get Scholarship based on id.
    """

    try:
        scholarship = Scholarship.objects.get(id=sch_id)

        request.session['conf'] = scholarship.id

        return render(request, 'main/scholarship_details.html', context={
            'scholarship': scholarship
        })
    except Scholarship.DoesNotExist:
        return scholarship_list_view(request)




