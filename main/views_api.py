from rest_framework import generics
from .models import *
from .serializers import *


class ListConferencesView(generics.ListAPIView):

    serializer_class = ConferenceSerializer
    queryset = Conference.objects.order_by('-duration__start_date')


class ListScholarshipView(generics.ListAPIView):

    serializer_class = ScholarshipSerializer
    queryset = Scholarship.objects.order_by('-duration__start_date')
