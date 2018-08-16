from django.core.management.base import BaseCommand
from main.models import Location


class Command(BaseCommand):

    def handle(self, *args, **options):

        locations = Location.objects.all()

        for location in locations:
            location.country = location.country.lower()
            location.save()
            print (location)

