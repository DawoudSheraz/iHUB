from django.conf.urls import url
from . import views


app_name = "main"
urlpatterns = [

    url(r'^$', views.index_view, name="index"),

    url(r'^conferences/$'
        , views.conference_list_view
        , name="conference_listing"),

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

    url(r'^scholarship/(?P<sch_id>[0-9a-zA-z_]+)/$'
        , views.get_scholarship_by_id
        , name="scholarship_details"),

]
