# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from models import *


def index_view(request):
    return render(request, "main/index.html")


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

        return render(request, 'main/scholarship_details.html', context={
            'scholarship': scholarship
        })
    except Scholarship.DoesNotExist:
        return scholarship_list_view(request)




