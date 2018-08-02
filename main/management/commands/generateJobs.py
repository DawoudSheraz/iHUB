import datetime
from django.core.management.base import BaseCommand, CommandError
from main.models import *


class Command(BaseCommand):

    help = "Generates 20 Jobs, starting from the index given as input"

    def add_arguments(self, parser):
        """
        Argument to specify the start index for id added
        """
        parser.add_argument('start_index', type=int)

    def handle(self, *args, **options):
        start_point = options['start_index']

        skill_list = []
        contact_list = []

        # Generate the list of Entities that will be required in M2M fields
        for count in range(start_point, start_point + 20):
            # Generating or getting the existing M2M Fields of Conference
            skill = Specialization.objects \
                .get_or_create(title='Skill %s' % count
                               , description='All About %s' % count
                               )[0]

            contact = Contact.objects \
                .get_or_create(email='contact%s@email.com' % count
                               , phone='0900-%s%s%s-01'
                                       % (count, count * 2, count * 5)
                               )[0]

            skill_list.append(skill)
            contact_list.append(contact)

        # Generating the Job Position
        for counter in range(start_point, start_point + 20):

            # Creating 1-1 fields, only relevant to current JobPosition

            form, form_created = SubmissionForm.objects \
                .get_or_create(title='Job %s' % counter
                               , required_docs='Transcript'
                               , steps_to_apply='Get PDF Manual')

            job, job_created = Job.objects\
                .get_or_create(title='Job %s' % counter
                               , type='part time'
                               , description='job %s is all about Battle' % counter
                               , function='Operate %s machina' % (counter/2)
                               , expectations='Do work')

            # Creating relevant 1-M Fields

            tenure = Tenure.objects\
                .get_or_create(start_date=datetime.datetime.now()
                               , duration=datetime.timedelta(days=600))[0]

            venue = Location.objects\
                .get_or_create(name='Location %s' % counter
                               , city='City %s' % counter
                               , country='Pakistan')[0]

            requirements = Qualifications.objects\
                .get_or_create(minimum='Python, C++'
                               , preferred='Minimum + AR')[0]

            fee = Fee.objects.get_or_create(amount='$%s' % counter)[0]

            salary = Salary.objects.get_or_create(amount='$%s'
                                                         % (counter % 10)
                                                  )[0]

            student_position = StudentPosition(experience_required='0-1 Years'
                                               , deadline=datetime.datetime.now()
                                               , source='website')

            student_position.job = job
            student_position.job_location = venue
            student_position.submission_form = form
            student_position.requirements = requirements
            student_position.fee = fee
            student_position.salary = salary
            student_position.duration = tenure
            student_position.job_provider = Professor.objects.get(user__username='dumbeldore')

            try:
                student_position.save()
            except:
                raise CommandError(self.stderr.write(
                        'Error Saving Student Position' % student_position.id))

            student_position.contacts.add(*contact_list)
            student_position.skills_covered.add(*skill_list)
            student_position.save()

            self.stdout.write(
                self.style.SUCCESS('StudentPosition ID Created: %s')
                % student_position.id)



