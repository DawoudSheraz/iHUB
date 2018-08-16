from django.core.management.base import BaseCommand
from main.models import Salary


class Command(BaseCommand):

    def handle(self, *args, **options):

        grants = Salary.objects.all()

        for grant in grants:
            grant.numeric_value = float(grant.amount[1:])
            grant.save()
            print (grant)

