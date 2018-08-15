from django.core.management.base import BaseCommand, CommandError
from main.models import Tenure


class Command(BaseCommand):

    def handle(self, *args, **options):

        all_tenures = Tenure.objects.all()

        for each_tenure in all_tenures:

            each_tenure.end_date = each_tenure.start_date + each_tenure.duration
            each_tenure.save()
            print(each_tenure)