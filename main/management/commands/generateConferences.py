import datetime
from django.core.management.base import BaseCommand, CommandError
from main.models import Conference, About, Tenure, Location\
    ,Specialization, Contact, Sponsor, Expense


class Command(BaseCommand):

    help = "Generates 20 Conferences, starting from the index given as input"

    def add_arguments(self, parser):
        """
        Argument to specify the start index for id added
        """
        parser.add_argument('start_index', type=int)

    def handle(self, *args, **options):
        """
        starting from index, create 20 conferences.
        """
        start_point = options['start_index']

        skill_list = []
        contact_list = []
        sponsor_list = []
        expense_list = []

        # Generate the list of Entities that will be required in M2M fields
        for count in range(start_point, start_point + 20):

            # Generating or getting the existing M2M Fields of Conference
            skill = Specialization.objects\
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

            expense = Expense.objects \
                .get_or_create(amount='$%s%s%s' % (count, count + 1, count - 10)
                               , description='Travel & Related Stuff : %s' % count
                               )[0]

            expense_list.append(expense)
            sponsor_list.append(sponsor)
            contact_list.append(contact)
            skill_list.append(skill)

        # To generate conference and their related 1-1 or 1-M fields
        for counter in range(start_point, start_point + 20):

            # 1-1 About field. No About with such id should exist
            about, about_created = About.objects\
                .get_or_create(title='Conference %s' % counter
                               , description='Conference %s is all about %s things'
                                             % (counter, counter*2))

            tenure = Tenure.objects\
                .get_or_create(start_date=datetime.datetime.now()
                               , duration=datetime.timedelta(days=15))[0]

            venue = Location.objects\
                .get_or_create(name='Location %s' % counter
                               , city='City %s' % counter
                               , country='Pakistan')[0]

            conference = Conference(call_for_paper_deadline=datetime.datetime.now()
                                    , key_speakers='Someone'
                                    , ranking='A*'
                                    , source='Web')

            conference.info = about
            conference.duration = tenure
            conference.conference_venue = venue

            try:
                conference.save()
            except:
                raise CommandError(self.stderr.write(
                        'Error Saving Conference' % conference.id))

            # Adding all the M2M data generated in the first for loop
            conference.covered_expenses.add(*expense_list)
            conference.sponsors.add(*sponsor_list)
            conference.contacts.add(*contact_list)
            conference.fields_of_interest.add(*skill_list)
            conference.save()
            self.stdout.write(self.style.SUCCESS('Conference ID Created: %s') % conference.id)


