from django.conf.urls import url
from django.views.generic import TemplateView
from . import views
from views_api import *

app_name = "main"
urlpatterns = [

    url(r'^$', TemplateView.as_view(template_name='main/index.html')
        , name="index"),

    url(r'^login/$', views.login_view, name="login"),

    url(r'^edit/$', views.edit_user, name="edit_user"),

    url(r'^signup/select/student/$', views.sign_up_student
        , name="signup_student"),

    url(r'^signup/select/professor/$', views.sign_up_professor
        , name="signup_professor"),

    url(r'^signup/select$', TemplateView.as_view(
        template_name="main/choose_user.html")
        , name="user_select"),

    url(r'^login/input/$', views.user_login, name='sign_check'),

    url(r'^logout/$', views.user_logout, name='logout'),

    url(r'^conferences/$'
        , views.ConferenceListView.as_view()
        , name="conference_listing"),

    url(r'^conferences/add$'
        , views.add_conference
        , name="add_conference"),

    url(r'^conference/(?P<id>[0-9a-zA-z_]+)/$'
        , views.ConferenceDetailView.as_view()
        , name="conference_details"),

    url(r'^job_positions/$'
        , views.StudentPositionListView.as_view()
        , name="job_listing"),

    url(r'^job_position/(?P<id>[0-9a-zA-z_]+)/$'
        , views.StudentPositionDetailView.as_view()
        , name="job_details"),

    url(r'^scholarships/$'
        , views.ScholarshipListView.as_view()
        , name="scholarship_listing"),

    url(r'^scholarships/add/$'
        , views.add_scholarship
        , name="add_scholarship"),

    url(r'^scholarship/(?P<id>[0-9a-zA-z_]+)/$'
        , views.ScholarshipDetailView.as_view()
        , name="scholarship_details"),

    # API Urls

    url(r'^api/conferences/'
        , ListConferencesView.as_view()
        , name='get_conferences'),

    url(r'^api/scholarships/'
        , ListScholarshipView.as_view()
        , name='get_scholarships'),

    url(r'^api/student_positions/'
        , ListStudentPositionView.as_view()
        , name='get_student_positions'),

]
