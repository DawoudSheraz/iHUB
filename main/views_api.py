from rest_framework import generics
from .models import *
from .serializers import *


class ListConferencesApiView(generics.ListAPIView):

    serializer_class = ConferenceSerializer
    queryset = Conference.objects.order_by('-duration__start_date')


class ListScholarshipApiView(generics.ListAPIView):

    serializer_class = ScholarshipSerializer
    queryset = Scholarship.objects.order_by('-duration__start_date')


class ListStudentPositionApiView(generics.ListAPIView):

    serializer_class = StudentPositionSerializer
    queryset = StudentPosition.objects.order_by('-duration__start_date')
