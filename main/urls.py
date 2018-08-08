from django.conf.urls import url
from . import views
from views_api import *

app_name = "main"
urlpatterns = [

    # Template based URLs

    url(r'^$', views.index_view, name="index"),

    url(r'^login/$', views.login_view, name="login"),

    url(r'^edit/$', views.edit_user, name="edit_user"),

    url(r'^signup/select/student/$', views.sign_up_student
        , name="signup_student"),

    url(r'^signup/select/professor/$', views.sign_up_professor
        , name="signup_professor"),

    url(r'^signup/select$', views.user_select_view, name="user_select"),

    url(r'^login/input/$', views.user_login, name='sign_check'),

    url(r'^logout/$', views.user_logout, name='logout'),

    url(r'^conferences/$'
        , views.conference_list_view
        , name="conference_listing"),

    url(r'^conferences/add$'
        , views.add_conference
        , name="add_conference"),

    url(r'^conference/(?P<conf_id>[0-9a-zA-z_]+)/$'
        , views.get_conference_by_id
        , name="conference_details"),

    url(r'^job_positions/$'
        , views.job_position_list_view
        , name="job_listing"),

    url(r'^job_position/(?P<job_id>[0-9a-zA-z_]+)/$'
        , views.get_job_by_id
        , name="job_details"),

    url(r'^scholarships/$'
        , views.scholarship_list_view
        , name="scholarship_listing"),

    url(r'^scholarships/add/$'
        , views.add_scholarship
        , name="add_scholarship"),

    url(r'^scholarship/(?P<sch_id>[0-9a-zA-z_]+)/$'
        , views.get_scholarship_by_id
        , name="scholarship_details"),

    # API Urls

    url(r'^api/conferences/'
        , ListConferencesView.as_view()
        , name='get_conferences'),

    url(r'^api/scholarships/'
        , ListScholarshipView.as_view()
        , name='get_scholarships')

]
