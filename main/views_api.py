from rest_framework import generics, pagination
from .models import *
from .serializers import *
from .api_functions import *


class ListConferencesApiView(generics.ListAPIView):

    serializer_class = ConferenceSerializer

    def get_queryset(self):

        filter_content_dict = get_model_dict_from_query_dict(self.request.query_params.dict(), {
            'skills_list': ('fields_of_interest__title', filter_specialization_from_input)
            , 'start_date': ('duration__start_date', None)
            , 'country': ('conference_venue__country', None)
            , 'paper_deadline_date': ('call_for_paper_deadline', None)
        })

        queryset = Conference.objects.order_by('-duration__start_date')

        # If No parameter has been mentioned in the URL,
        # return the main queryset
        if filter_content_dict is None:
            return queryset

        return Conference.objects.filter(**filter_content_dict)\
            .distinct().order_by('-duration__start_date')


class ListScholarshipApiView(generics.ListAPIView):

    serializer_class = ScholarshipSerializer

    def get_queryset(self):

        filter_content_dict = get_model_dict_from_query_dict(self.request.query_params.dict(), {
            'skills_list': ('fields_of_interest__title'
                            , filter_specialization_from_input)
            , 'start_date': ('duration__start_date', None)
            , 'locations_list': ('host_universities__country', filter_countries)
            , 'deadline_date': ('deadline', None)
            , 'position_min': ('number_of_positions', None)
            , 'position_max': ('number_of_positions', None)
            , 'amount_min': ('amount_granted__numeric_value'
                             , get_numeric_amount)
            , 'amount_max': ('amount_granted__numeric_value'
                             , get_numeric_amount)
        })

        queryset = Scholarship.objects.order_by('-duration__start_date')

        # If No parameter has been mentioned in the URL,
        # return the main queryset
        if filter_content_dict is None:
            return queryset

        return Scholarship.objects.filter(**filter_content_dict) \
            .distinct().order_by('-duration__start_date')


class ListStudentPositionApiView(generics.ListAPIView):

    serializer_class = StudentPositionSerializer

    def get_queryset(self):

        filter_content_dict = get_model_dict_from_query_dict(self.request.query_params.dict(), {

            'skills_list': ('skills_covered__title'
                            , filter_specialization_from_input)
            , 'start_date': ('duration__start_date', None)
            , 'country': ('job_location__country', None)
            , 'deadline_date': ('deadline', None)
            , 'experience': ('experience_required', validate_experience_input)
            , 'salary_min': ('salary__numeric_value', get_numeric_amount)
            , 'salary_max': ('salary__numeric_value', get_numeric_amount)
        })

        queryset = StudentPosition.objects.order_by('-duration__start_date')

        # If No parameter has been mentioned in the URL,
        # return the main queryset

        if filter_content_dict is None:
            return queryset

        return StudentPosition.objects.filter(**filter_content_dict) \
            .distinct().order_by('-duration__start_date')


class PostSuggestionView(generics.CreateAPIView):

    serializer_class = SuggestionSerializer


# Get all the skills -- to be used in autocomplete feature
class SkillsView(generics.ListAPIView):

    serializer_class = SpecializationSerializer

    queryset = Specialization.objects.all()

    def paginate_queryset(self, queryset):

        return None

