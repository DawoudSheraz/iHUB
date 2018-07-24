# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render, redirect
from django.contrib import auth
from models import *


def index_view(request):
    return render(request, "main/index.html")


def login_view(request):
    """
    Returns html page to take user input, redirects to index if session exist

    """
    if request.user.is_authenticated():
        return render(request, "main/index.html")
    return render(request, "main/login.html")


def user_login(request):

    """
    Checks if a user exists and login the valid user
    """

    if request.user.is_authenticated():
        return render(request, "main/index.html")
    try:
        username = request.POST['username']
        password = request.POST['password']
        user = auth.authenticate(request, username=username, password=password)
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




