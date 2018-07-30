# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from django.db.models import CharField, ForeignKey
from django.contrib.auth.models import User


class Job(models.Model):

    """
    Job model class,focusing on attributes like job type, expectations.
    """

    id = CharField(max_length=50, primary_key=True)
    title = CharField(max_length=50)
    type = CharField(max_length=50)
    description = CharField(max_length=100)
    function = CharField(max_length=100)
    expectations = CharField(max_length=100, null=True, blank=True)

    class Meta:
        """
        Customization of table name
        """
        db_table = "job"

    def __unicode__(self):
        """
        How the data should be shown on the admin portal
        """
        return "%s: %s" % (self.id, self.title)


class Location(models.Model):

    """
    Modelling a Real World location (Hotel, University etc.).
    """

    id = CharField(max_length=50, primary_key=True)
    name = CharField(max_length=60)
    city = CharField(max_length=30, blank=True, null=True)
    country = CharField(max_length=20)

    class Meta:
        db_table = "location"

    def __unicode__(self):
        return self.name


class Fee(models.Model):

    id = CharField(max_length=50, primary_key=True)
    amount = CharField(max_length=30)

    class Meta:
        db_table = "fee"

    def __unicode__(self):
        return self.amount


class Salary(models.Model):

    id = CharField(max_length=50, primary_key=True)
    amount = CharField(max_length=30)

    class Meta:
        db_table = "salary"

    def __unicode__(self):
        return self.amount


class Grant(models.Model):

    """
    Educational Grant
    """

    id = CharField(max_length=50, primary_key=True)
    amount = CharField(max_length=30)

    class Meta:
        db_table = "grant"

    def __unicode__(self):
        return self.amount


class Expense(models.Model):

    """
    Expense model, emphasizing amount and reason why that amount was required
    """

    id = CharField(max_length=50, primary_key=True)
    amount = CharField(max_length=30)
    description = CharField(max_length=50, null=True, blank=True)

    class Meta:
        db_table = "expense"

    def __unicode__(self):
        return "%s: %s" % (self.id, self.amount)


class Qualifications(models.Model):

    """
    qualification Model, that defines minimum & preferred requirements.
    """

    id = CharField(max_length=50, primary_key=True)
    minimum = CharField(max_length=100)
    preferred = CharField(max_length=100, blank=True, null=True)

    class Meta:
        db_table = "qualifications"

    def __unicode__(self):
        return self.minimum


class Department(models.Model):

    """
    Modelling department inside a University
    """

    id = CharField(max_length=50, primary_key=True)
    name = CharField(max_length=50)
    university = ForeignKey(to=Location
                            , on_delete=models.CASCADE
                            , related_name="university"
                            , blank=True
                            , null=True)

    class Meta:
        db_table = "department"

    def __unicode__(self):
        return self.name


class Field(models.Model):

    """
    Modelling a specialization inside a University Department.
    """

    id = CharField(max_length=50, primary_key=True)
    name = CharField(max_length=50)
    department = ForeignKey(to=Department
                            , on_delete=models.CASCADE
                            , related_name="department")

    class Meta:
        db_table = "field"

    def __unicode__(self):
        return self.name


class SubmissionForm(models.Model):

    """
    Required and steps to submit a form for Job, Conference etc.
    """

    id = CharField(max_length=50, primary_key=True)
    title = CharField(max_length=30)
    required_docs = CharField(max_length=200)
    steps_to_apply = CharField(max_length=200)

    class Meta:
        db_table = "submission_form"

    def __unicode__(self):
        return self.title


class Sponsor(models.Model):

    id = CharField(max_length=50, primary_key=True)
    name = CharField(max_length=50)

    class Meta:
        db_table = "sponsor"

    def __unicode__(self):
        return self.name


class Tenure(models.Model):

    """
    Defining a time period, using start date and duration.
    """

    id = CharField(max_length=50, primary_key=True)
    start_date = models.DateTimeField()
    duration = models.DurationField()

    class Meta:
        db_table = "tenure"

    def __unicode__(self):
        return "%s :%s - %s" % (self.id, self.start_date, self.start_date + self.duration)

    def get_end_date(self):
        return self.start_date + self.duration


class About(models.Model):

    """
    Modelling the information class
    """

    id = CharField(max_length=50, primary_key=True)
    title = CharField(max_length=80)
    description = CharField(max_length=150)

    class Meta:
        db_table = "about"

    def __unicode__(self):
        return self.title


class Specialization(models.Model):

    """
    Models a Study Field
    """

    id = CharField(max_length=50, primary_key=True)
    title = CharField(max_length=40)
    description = CharField(max_length=100)

    class Meta:
        db_table = "specialization"

    def __unicode__(self):
        return self.title


class Contact(models.Model):

    """
    Contact Information
    """

    id = CharField(max_length=50, primary_key=True)
    email = models.EmailField(null=True, blank=True)
    phone = CharField(max_length=20, null=True, blank=True)

    class Meta:
        db_table = "contact"

    def __unicode__(self):
        return self.email


# class ProfileUserAdapter(models.Model):
#
#     """
#     Acts as adapter between User Auth and Profile class
#     """
#
#     user = models.OneToOneField(User, on_delete=models.CASCADE)
#
#     class Meta:
#         db_table = "profile_user_adapter"


class Profile(models.Model):

    """
    User Account Model
    """
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    profile_id = CharField(max_length=50, primary_key=True)
    name = CharField(max_length=50)
    age = models.IntegerField(blank=True, null=True)
    gender = CharField(max_length=10, blank=True, null=True)

    class Meta:
        db_table = "profile"

    def __unicode__(self):
        return self.name


class Student(Profile):

    experience = models.FloatField(default=1.0)
    skills = models.ManyToManyField(to=Specialization
                                    , related_name="skills")

    class Meta:
        db_table = "student"


class Professor(Profile):

    related_university = ForeignKey(to=Location
                                    , on_delete=models.CASCADE
                                    , related_name="related_university")

    expertise = models.ManyToManyField(to=Specialization
                                       , related_name="expertise")

    class Meta:
        db_table = "professor"


class StudentPosition(models.Model):

    """
    Student Job Position Model
    """

    id = CharField(max_length=50, primary_key=True)
    experience_required = CharField(max_length=20)
    deadline = models.DateTimeField()
    source = models.TextField()

    # One to One Relationships

    job = models.OneToOneField(to=Job
                               , related_name="offered_job")
    submission_form = models.OneToOneField(to=SubmissionForm
                                           , related_name="application_form")

    # Many to One Relationship

    job_location = ForeignKey(to=Location
                              , related_name="venue")

    fee = ForeignKey(to=Fee
                     , related_name="submission_fee"
                     , null=True
                     , blank=True)

    salary = ForeignKey(to=Salary
                        , related_name="income")

    requirements = ForeignKey(to=Qualifications
                              , related_name="criteria")

    job_provider = ForeignKey(to=Professor)

    duration = ForeignKey(to=Tenure
                          , related_name="job_duration")

    # Many to Many Relationships

    skills_covered = models.ManyToManyField(to=Specialization)
    contacts = models.ManyToManyField(to=Contact)

    class Meta:
        db_table = "student_job_position"

    def __unicode__(self):
        return self.job.title


class Scholarship(models.Model):

    """
    models the Scholarship Information table
    """

    class Meta:
        db_table = "scholarship"

    def __unicode__(self):
        return self.information.title

    id = CharField(max_length=50, primary_key=True)
    funding = models.FloatField(blank=True, null=True)
    number_of_positions = models.IntegerField(default=0)
    deadline = models.DateTimeField()
    scholarship_maintenance_criteria = CharField(max_length=100
                                                 , null=True,
                                                 blank=True)
    perks_offered = CharField(max_length=150)
    source = models.TextField()

    # One to One Relationships

    information = models.OneToOneField(to=About
                                       , related_name="about_scholarship")

    application_form = models.OneToOneField(to=SubmissionForm
                                            , related_name="submission_form")

    # Many to One Relationships

    amount_granted = ForeignKey(to=Grant, related_name="grant")

    criteria = ForeignKey(to=Qualifications, related_name="requirements")

    duration = ForeignKey(to=Tenure, related_name="scholarship_duration")

    # Many to Many Relationships

    fields_of_interest = models.ManyToManyField(to=Specialization,
                                                related_name="competencies")
    contacts = models.ManyToManyField(to=Contact
                                      , related_name="contact_information")

    host_universities = models.ManyToManyField(to=Location,
                                               related_name="host_regions")

    sponsors = models.ManyToManyField(to=Sponsor,
                                      related_name="funders")


class Conference(models.Model):

    class Meta:
        db_table = "conference"

    id = CharField(max_length=50, primary_key=True)
    call_for_paper_deadline = models.DateTimeField()
    key_speakers = models.TextField(blank=True, null=True)
    source = models.TextField()
    ranking = CharField(max_length=10, blank=True, null=True)

    # One to One Relationship

    info = models.OneToOneField(to=About,
                                related_name="conference_information")

    # Many to One relationship

    duration = ForeignKey(to=Tenure, related_name="conference_duration")

    conference_venue = ForeignKey(to=Location)

    # Many to Many relationship

    fields_of_interest = models.ManyToManyField(to=Specialization,
                                                related_name="interests")
    contacts = models.ManyToManyField(to=Contact)

    sponsors = models.ManyToManyField(to=Sponsor,
                                      related_name="organizers")

    covered_expenses = models.ManyToManyField(to=Expense
                                              , related_name="covered_expenses")

    def __unicode__(self):
        return self.info.title


class Schedule(models.Model):

    """
    Defining a work on a particular day and time.
    """

    id = CharField(max_length=50, primary_key=True)
    date = models.DateTimeField()
    description = CharField(max_length=100)
    related_conference = ForeignKey(to=Conference
                                    , related_name="related_conferences"
                                    , null=True
                                    , blank=True)

    class Meta:
        db_table = "schedule"

    def __unicode__(self):
        return "%s: %s" % (self.date, self.description)
