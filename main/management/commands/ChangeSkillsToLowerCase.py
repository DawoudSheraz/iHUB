from django.core.management.base import BaseCommand
from main.models import Specialization


class Command(BaseCommand):

    def handle(self, *args, **options):

        skills = Specialization.objects.all()

        for skill in skills:
            skill.title = skill.title.lower()
            skill.save()
            print (skill)

