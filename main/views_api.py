from rest_framework import generics
from .models import *
from .serializers import *


def filter_specialization_from_input(skills):
    """
    Given the Specialization objects matching with the
    fields passed in the URL
    :param skills: comma separated skill values
    :return: list of Skill titles
    """

    # Change to lower case and handle special case
    # where c++'s + symbol is omitted by django URL
    skills = skills.lower().replace('c  ', 'c\+\+')

    # Convert to list and remove trailing and leading whitespaces
    skill_list = skills.split(',')
    skill_list = [x.strip() for x in skill_list if x != '']

    # Convert underscore into space as underscores are used instead
    # of whitespace in the url
    skill_list = [x.replace('_', ' ') if '_' in x else x for x in skill_list]

    return skill_list


def get_date_as_month_year(date_string):
    """
    Given string in format 0000-00 (YY-MM), return month and year
    """
    date_list = date_string.split('-')
    year = date_list[0]
    month = date_list[1]

    if len(year) == 4 and len(month) == 2:
        return month, year


class ListConferencesApiView(generics.ListAPIView):

    serializer_class = ConferenceSerializer

    def get_queryset(self):

        filter_content_dict = {}

        queryset = Conference.objects.order_by('-duration__start_date')

        # Possible Query Parameters that can be mentioned in the URL

        skills = self.request.query_params.get('skills', False)
        start_date = self.request.query_params.get('start_date', False)
        country = self.request.query_params.get('country', False)
        paper_deadline = self.request.query_params.get('paper_deadline', False)

        # If skills param mentioned in the url

        if skills is not False and skills != '':
            filter_content_dict['fields_of_interest__title__in'] = \
                filter_specialization_from_input(skills)

        # IF start date parameter mentioned

        if start_date is not False and start_date != '':

            month, year = get_date_as_month_year(start_date)

            filter_content_dict['duration__start_date__month'] = month
            filter_content_dict['duration__start_date__year'] = year

        # If country mentioned
        if country is not False and country != '':

            filter_content_dict['conference_venue__country__iexact'] = country

        # If call for paper deadline mentioned in the URL

        if paper_deadline is not False and country != '':

            month, year = get_date_as_month_year(paper_deadline)
            filter_content_dict['call_for_paper_deadline__month'] = month
            filter_content_dict['call_for_paper_deadline__year'] = year

        # If No parameter has been mentioned in the URL,
        # return the main queryset
        if filter_content_dict is None:
            return queryset

        return Conference.objects.filter(**filter_content_dict)\
            .order_by('-duration__start_date')


class ListScholarshipApiView(generics.ListAPIView):

    serializer_class = ScholarshipSerializer

    def get_queryset(self):

        filter_content_dict = {}

        queryset = Scholarship.objects.order_by('-duration__start_date')

        # Possible Query Parameters that can be mentioned in the URL

        skills = self.request.query_params.get('skills', False)
        start_date = self.request.query_params.get('start_date', False)

        # If skills param mentioned in the url

        if skills is not False and skills != '':
            filter_content_dict['fields_of_interest__title__in'] = \
                filter_specialization_from_input(skills)

        # IF start date parameter mentioned

        if start_date is not False and start_date != '':
            month, year = get_date_as_month_year(start_date)

            filter_content_dict['duration__start_date__month'] = month
            filter_content_dict['duration__start_date__year'] = year

        # If No parameter has been mentioned in the URL,
        # return the main queryset

        if filter_content_dict is None:
            return queryset

        return Scholarship.objects.filter(**filter_content_dict) \
            .order_by('-duration__start_date')


class ListStudentPositionApiView(generics.ListAPIView):

    serializer_class = StudentPositionSerializer

    def get_queryset(self):

        filter_content_dict = {}

        queryset = StudentPosition.objects.order_by('-duration__start_date')

        # Possible Query Parameters that can be mentioned in the URL

        skills = self.request.query_params.get('skills', False)
        start_date = self.request.query_params.get('start_date', False)

        # If skills param mentioned in the url

        if skills is not False and skills != '':
            filter_content_dict['skills_covered__title__in'] = \
                filter_specialization_from_input(skills)

        # IF start date parameter mentioned

        if start_date is not False and start_date != '':
            month, year = get_date_as_month_year(start_date)

            filter_content_dict['duration__start_date__month'] = month
            filter_content_dict['duration__start_date__year'] = year

        # If No parameter has been mentioned in the URL,
        # return the main queryset

        if filter_content_dict is None:
            return queryset

        return StudentPosition.objects.filter(**filter_content_dict) \
            .order_by('-duration__start_date')
