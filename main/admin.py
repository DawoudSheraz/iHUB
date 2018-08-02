# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.contrib import admin
from django.contrib.admin import ModelAdmin
from django.http import HttpResponseRedirect
from django.shortcuts import render
from .models import *
from forms import SelectGenderForm

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

    actions = ['convert_into_part_time', 'convert_into_full_time']

    def convert_into_part_time(self, request, queryset):
        rows_changed = queryset.update(type='part time')
        if rows_changed == 1:
            message = "1 job was"
        else:
            message = "%s jobs were" % rows_changed

        self.message_user(request, '%s updated successfully' % message)

    def convert_into_full_time(self, request, queryset):
        rows_changed = queryset.update(type='full time')
        if rows_changed == 1:
            message = "1 job was"
        else:
            message = "%s jobs were" % rows_changed

        self.message_user(request, '%s updated successfully' % message)

    convert_into_part_time.short_description = \
        "Change selected Jobs' type into part time"

    convert_into_full_time.short_description = \
        "Change selected Jobs' type into full time"


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

    actions = ['change_gender']

    def change_gender(self, request, queryset):
        form = None
        # For submitted form
        if 'update' in request.POST:
            form = SelectGenderForm(request.POST)
            if form.is_valid():
                # Get value of new gender and update query set
                gender = form.cleaned_data['gender']
                rows_updated = queryset.update(gender=gender)

                if rows_updated == 1:
                    message = "1 user was"
                else:
                    message = "%s users were" % rows_updated
                self.message_user(request, "%s updated Successfully" % message)

                return HttpResponseRedirect(request.get_full_path())

        if form is None:
            form = SelectGenderForm(initial={'_selected_action': request.POST.getlist(admin.ACTION_CHECKBOX_NAME)})

        return render(request, 'admin/change_gender.html', {
            'users': queryset
            , 'select_form': form,
        })

    change_gender.short_description = "Change Gender of Selected Users"


@admin.register(Student)
class StudentAdmin(ProfileAdmin):

    list_filter = ('gender', 'age', 'experience',)


@admin.register(Professor)
class ProfessorAdmin(ProfileAdmin):

    list_filter = ('related_university',)
    list_display = ('name', 'gender', 'institute')
    raw_id_fields = ('related_university', )


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

    search_fields = ('job__title', 'job_location__name'
                     , 'skills_covered__title')





