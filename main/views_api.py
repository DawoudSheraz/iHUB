from rest_framework import generics
from django.db.models.functions import Lower
from .models import *
from .serializers import *


def filter_specialization_from_input(skills):
    """
    Given the Specialization objects matching with the
    fields passed in the URL
    :param skills: comma separated skill values
    :return: list of QuerySet containing the related Specialization
    """
    # The string is first converted to lower case
    # then , is replaced with | to use with regex
    # and finally any whitespace is removed
    skills = skills.lower().replace(',', '|').strip()

    # Specialization objects filtered based on passed parameter
    return Specialization.objects.annotate(title_lower=Lower('title')) \
        .filter(title_lower__regex=r'%s' % skills)


class ListConferencesApiView(generics.ListAPIView):

    serializer_class = ConferenceSerializer

    def get_queryset(self):
        queryset = Conference.objects.order_by('-duration__start_date')

        skills = self.request.query_params.get('skills', False)

        # If skills param mentioned in the url
        if skills is not False and skills != '':

            # Conference objects filter based on the filtered Specialization
            queryset = queryset\
                .filter(fields_of_interest__in=filter_specialization_from_input(skills))\
                .distinct()

        return queryset


class ListScholarshipApiView(generics.ListAPIView):

    serializer_class = ScholarshipSerializer

    def get_queryset(self):
        queryset = Scholarship.objects.order_by('-duration__start_date')

        skills = self.request.query_params.get('skills', False)

        # If skills param mentioned in the url
        if skills is not False and skills != '':

            # Scholarship objects filter based on the filtered Specialization
            queryset = queryset\
                .filter(fields_of_interest__in=filter_specialization_from_input(skills))\
                .distinct()

        return queryset


class ListStudentPositionApiView(generics.ListAPIView):

    serializer_class = StudentPositionSerializer

    def get_queryset(self):
        queryset = StudentPosition.objects.order_by('-duration__start_date')

        skills = self.request.query_params.get('skills', False)

        # If skills param mentioned in the url
        if skills is not False and skills != '':

            # Scholarship objects filter based on the filtered Specialization
            queryset = queryset\
                .filter(skills_covered__in=filter_specialization_from_input(skills))\
                .distinct()

        return queryset
