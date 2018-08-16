from django.core.management.base import BaseCommand
from main.models import Grant


class Command(BaseCommand):

    def handle(self, *args, **options):

        grants = Grant.objects.all()

        for grant in grants:
            grant.numeric_value = float(grant.amount[1:])
            grant.save()
            print (grant)

