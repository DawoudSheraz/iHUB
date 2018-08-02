# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.contrib import admin
from django.contrib.admin import ModelAdmin
from .models import *

# app = apps.get_app_config('main')
#
# for model_name, model in app.models.items():
#     admin.site.register(model)

admin.site.register(About)
admin.site.register(Location)
admin.site.register(Fee)
admin.site.register(Salary)
admin.site.register(Grant)
admin.site.register(Expense)
admin.site.register(SubmissionForm)
admin.site.register(Sponsor)
admin.site.register(Specialization)
admin.site.register(Schedule)


@admin.register(Conference)
class ConferenceAdmin(ModelAdmin):

    date_hierarchy = 'duration__start_date'
    search_fields = ['info__title', 'ranking', 'duration__start_date']
    list_filter = ('ranking', 'call_for_paper_deadline', 'duration__start_date')

    list_display = ('conference_title', 'start_date',
                    'ranking', 'location', 'call_for_paper_deadline')

    filter_horizontal = ('contacts', 'sponsors'
                         , 'fields_of_interest', 'covered_expenses')


@admin.register(Tenure)
class TenureAdmin(ModelAdmin):

    date_hierarchy = 'start_date'

    search_fields = ['start_date', ]

    list_display = ('start_date', 'get_end_date')

    list_filter = ('start_date', )


@admin.register(Job)
class JobAdmin(ModelAdmin):

    list_filter = ('type', )
    search_fields = ('type', 'title')

    list_display = ['title', 'type']


@admin.register(Qualifications)
class QualificationAdmin(ModelAdmin):

    search_fields = ('minimum', )
    list_display = ['minimum', 'preferred']


@admin.register(Contact)
class ContactAdmin(ModelAdmin):

    search_fields = ('email', )
    list_display = ['email', 'phone']


@admin.register(Profile)
class ProfileAdmin(ModelAdmin):

    list_filter = ('gender', 'age', 'skills')
    search_fields = ('name', )
    list_display = ('name', 'gender')


@admin.register(Student)
class StudentAdmin(ProfileAdmin):

    list_filter = ('gender', 'age', 'experience',)


@admin.register(Professor)
class ProfessorAdmin(ProfileAdmin):

    list_filter = ('related_university',)
    list_display = ('name', 'gender', 'institute')


@admin.register(Scholarship)
class ScholarshipAdmin(ModelAdmin):

    list_filter = ('duration__start_date', 'deadline',)
    search_fields = ('information__title', 'host_universities__name'
                     , 'fields_of_interest__title',)

    list_display = ('scholarship_title', 'start_date')


@admin.register(StudentPosition)
class StudentPositionAdmin(ModelAdmin):

    list_filter = ('job__type', 'experience_required', 'job_provider__name'
                   , 'deadline')

    list_display = ('job_title', 'deadline', 'experience_required')

    search_fields = ('job__title', 'job_location__name', 'skills_covered__title')





