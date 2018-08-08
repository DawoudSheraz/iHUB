from rest_framework import generics
from .models import *
from .serializers import *


class ListConferencesView(generics.ListAPIView):

    serializer_class = ConferenceSerializer
    queryset = Conference.objects.order_by('-duration__start_date')
