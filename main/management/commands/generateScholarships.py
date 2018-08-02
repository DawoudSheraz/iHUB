import datetime
from django.core.management.base import BaseCommand, CommandError
from main.models import *


class Command(BaseCommand):

    help = "Generates 20 Scholarships, starting from the index given as input"

    def add_arguments(self, parser):
        """
        Argument to specify the start index for id added
        """
        parser.add_argument('start_index', type=int)

    def handle(self, *args, **options):
        start_point = options['start_index']

        skill_list = []
        contact_list = []
        sponsor_list = []
        uni_list = []

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

            sponsor = Sponsor.objects \
                .get_or_create(name='Sponsor %s' % count
                               )[0]

            venue = Location.objects\
                .get_or_create(name='Location %s' % count
                               , city='City %s' % count
                               , country='Pakistan')[0]

            sponsor_list.append(sponsor)
            contact_list.append(contact)
            skill_list.append(skill)
            uni_list.append(venue)

        for counter in range(start_point, start_point + 20):

            # 1-1 About field. No About with such id should exist
            about, about_created = About.objects \
                .get_or_create( title='Scholarship %s' % counter
                               , description='Scholarship %s is all about %s things'
                                           % (counter, counter + 10))

            if about_created is False:
                raise CommandError(self.stderr.write(
                    self.style.ERROR(
                        'About Object %s already Exists' % about.id)))

            form, form_created = SubmissionForm.objects\
                .get_or_create(title='Scholarship %s' % counter
                               , required_docs='Transcript'
                               , steps_to_apply='Follow Website')

            if form_created is False:
                raise CommandError(self.stderr.write(
                    self.style.ERROR(
                        'SubmissionForm Object %s already Exists' % form.id)))

            tenure = Tenure.objects\
                .get_or_create( start_date=datetime.datetime.now()
                               , duration=datetime.timedelta(days=365))[0]

            grant = Grant.objects.get_or_create(amount='$%s%s'
                                                         % (counter, counter/2))[0]

            requirements = Qualifications.objects\
                .get_or_create(minimum='Python, C++'
                               , preferred='Minimum + AR')[0]

            scholarship = Scholarship(funding=counter % 100
                                      , number_of_positions=counter
                                      , source='Website'
                                      , perks_offered='Lunch'
                                      , deadline=datetime.datetime.now()
                                      , scholarship_maintenance_criteria='3.5 CGPA')

            scholarship.duration = tenure
            scholarship.amount_granted = grant
            scholarship.criteria = requirements
            scholarship.information = about
            scholarship.application_form = form

            try:
                scholarship.save()
            except:
                raise CommandError(self.stderr.write(
                        'Error Saving Scholarship' % scholarship.id))

            scholarship.host_universities.add(*uni_list)
            scholarship.sponsors.add(*sponsor_list)
            scholarship.contacts.add(*contact_list)
            scholarship.fields_of_interest.add(*skill_list)
            self.stdout.write(
                self.style.SUCCESS('Conference ID Created: %s') % scholarship.id)



