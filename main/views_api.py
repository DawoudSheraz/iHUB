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


def filter_countries(countries):

    countries = countries.lower().split(',')

    countries = [x.strip() for x in countries if x != '']

    return countries


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
            .distinct().order_by('-duration__start_date')


class ListScholarshipApiView(generics.ListAPIView):

    serializer_class = ScholarshipSerializer

    def get_queryset(self):

        filter_content_dict = {}

        queryset = Scholarship.objects.order_by('-duration__start_date')

        # Possible Query Parameters that can be mentioned in the URL

        skills = self.request.query_params.get('skills', False)
        start_date = self.request.query_params.get('start_date', False)
        locations = self.request.query_params.get('locations', False)
        deadline = self.request.query_params.get('deadline', False)
        position_min = self.request.query_params.get('position_min', False)
        position_max = self.request.query_params.get('position_max', False)
        amount_min = self.request.query_params.get('amount_min', False)
        amount_max = self.request.query_params.get('amount_max', False)

        # If skills param mentioned in the url
        if skills is not False and skills != '':

            filter_content_dict['fields_of_interest__title__in'] = \
                filter_specialization_from_input(skills)

        # IF start date parameter mentioned
        if start_date is not False and start_date != '':

            month, year = get_date_as_month_year(start_date)

            filter_content_dict['duration__start_date__month'] = month
            filter_content_dict['duration__start_date__year'] = year

        # If locations (countries) mentioned
        if locations is not False and locations != '':

            filter_content_dict['host_universities__country__in'] = \
                filter_countries(locations)

        # If deadline parameter is mentioned
        if deadline is not False and deadline != '':

            month, year = get_date_as_month_year(deadline)

            filter_content_dict['deadline__month'] = month
            filter_content_dict['deadline__year'] = year

        # Number of position range
        if position_min is not False:
            filter_content_dict['number_of_positions__gte'] = position_min

        if position_max is not False:
            filter_content_dict['number_of_positions__lte'] = position_max

        # Amount granted Range
        
        if amount_min is not False:
            filter_content_dict['amount_granted__numeric_value__gte'] = \
                float(amount_min[1:])

        if amount_max is not False:
            filter_content_dict['amount_granted__numeric_value__lte'] = \
                float(amount_max[1:])

        # If No parameter has been mentioned in the URL,
        # return the main queryset
        if filter_content_dict is None:
            return queryset

        return Scholarship.objects.filter(**filter_content_dict) \
            .distinct().order_by('-duration__start_date')


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
