from django.conf.urls import url
from django.views.generic import TemplateView
from . import views
from views_api import *

app_name = "main"

api_param_url = '(?P<skills_list>[a-zA-z0-9,+_]+)(?P<start_date>[0-9]{4}-[0-9]{2})'
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
        , ListConferencesApiView.as_view()
        , name='get_conferences'),

    url(r'^api/conferences/%s(?P<country>[a-zA-z]+)'
        r'(?P<paper_deadline_date>[0-9]{4}-[0-9]{2})/' % api_param_url
        , ListConferencesApiView.as_view()
        , name='get_conferences_by_skill'),

    url(r'^api/scholarships/'
        , ListScholarshipApiView.as_view()
        , name='get_scholarships'),

    url(r'^api/scholarships/%s(?P<locations_list>[a-zA-z]+)'
        r'(?P<deadline_date>[0-9]{4}-[0-9]{2})'
        r'(?P<position_min>[0-9]+)(?P<position_max>[0-9]+)'
        r'(?P<amount_min>^\$[0-9]+?.[0-9]+$)'
        r'(?P<amount_max>^\$[0-9]+?.[0-9]+$)/' % api_param_url
        , ListScholarshipApiView.as_view()
        , name='get_scholarships_by_skill'),

    url(r'^api/student_positions/'
        , ListStudentPositionApiView.as_view()
        , name='get_student_positions'),

    url(r'^api/student_positions/%s(?P<country>[a-zA-z]+)'
        r'(?P<deadline_date>[0-9]{4}-[0-9]{2})'
        r'(?P<experience>.*)'
        r'(?P<salary_min>^\$[0-9]+?.[0-9]+$)'
        r'(?P<salary_max>^\$[0-9]+?.[0-9]+$)/' % api_param_url
        , ListStudentPositionApiView.as_view()
        , name='get_student_positions_by_skill'),

    url(r'^api/suggestions'
        , PostSuggestionView.as_view()
        , name='post_suggestion'),

    url(r'^api/skills'
        , SkillsView.as_view()
        , name='get_all_skills')

]
