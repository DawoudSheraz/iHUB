from collections import OrderedDict
from rest_framework.serializers import ModelSerializer
from .models import *


class TenureSerializer(ModelSerializer):
    """
    Specifies how the Tenure data should be send in JSON
    """

    class Meta:
        model = Tenure
        fields = ('start_date', 'end_date')


class SuggestionSerializer(ModelSerializer):

    class Meta:
        model = Suggestion
        exclude = ('id',)


class LocationSerializer(ModelSerializer):
    class Meta:
        model = Location
        fields = ('name', 'city', 'country')

    def to_representation(self, instance):
        """
        Override the data representation by removing the
        fields with null value from the data.
        """
        result = super(LocationSerializer, self).to_representation(instance)
        return OrderedDict(
            [(key, result[key]) for key in result if result[key] is not None])


class AboutSerializer(ModelSerializer):
    """
    About Model Serializer
    """

    class Meta:
        model = About
        fields = ('title', 'description')


class SpecializationSerializer(ModelSerializer):
    """
    Specialization model serializer, with only title field
    """

    class Meta:
        model = Specialization
        fields = ('title',)


class ContactSerializer(ModelSerializer):
    """
    Contact Model Serializer
    """

    class Meta:
        model = Contact
        fields = ('email', 'phone')

    def to_representation(self, instance):
        """
        Override the data representation by removing the
        fields with null value from the data.
        """
        result = super(ContactSerializer, self).to_representation(instance)
        return OrderedDict(
            [(key, result[key]) for key in result if result[key] is not None])


class SponsorSerializer(ModelSerializer):
    class Meta:
        model = Sponsor
        fields = ('name',)


class ExpenseSerializer(ModelSerializer):
    class Meta:
        model = Expense
        fields = ('amount', 'description')

    def to_representation(self, instance):
        """
        Override the data representation by removing the
        fields with null value from the data.
        """
        result = super(ExpenseSerializer, self).to_representation(instance)
        return OrderedDict(
            [(key, result[key]) for key in result if result[key] is not None])


class ScheduleSerializer(ModelSerializer):
    class Meta:
        model = Schedule
        fields = ('date', 'description')


class SubmissionFormSerializer(ModelSerializer):
    class Meta:
        model = SubmissionForm
        fields = ('required_docs', 'steps_to_apply')


class GrantSerializer(ModelSerializer):
    class Meta:
        model = Grant
        fields = ('amount',)


class FeeSerializer(ModelSerializer):

    class Meta:
        model = Fee
        fields = ('amount',)


class SalarySerializer(ModelSerializer):
    class Meta:
        model = Salary
        fields = ('amount',)


class JobSerializer(ModelSerializer):

    class Meta:
        model = Job
        fields = ('title', 'type', 'description', 'function', 'expectations')

    def to_representation(self, instance):
        """
        Override the data representation by removing the
        fields with null value from the data.
        """
        result = super(JobSerializer, self).to_representation(instance)
        return OrderedDict(
            [(key, result[key]) for key in result if result[key] is not None])


class QualificationSerializer(ModelSerializer):
    class Meta:
        model = Qualifications
        fields = ('minimum', 'preferred')

    def to_representation(self, instance):
        """
        Override the data representation by removing the
        fields with null value from the data.
        """
        result = super(QualificationSerializer, self).to_representation(
            instance)
        return OrderedDict(
            [(key, result[key]) for key in result if result[key] is not None])


class ProfessorSerializer(ModelSerializer):

    related_university = LocationSerializer()

    class Meta:
        model = Professor
        fields = ('name', 'related_university')


class ConferenceSerializer(ModelSerializer):
    """
    Conference Serializer
    """

    # Referring the OneToOne fields' serializers
    info = AboutSerializer()

    # Referring the ManyToOne fields' serializers
    duration = TenureSerializer()
    conference_venue = LocationSerializer()

    # Referring the M2M fields' Serializers
    fields_of_interest = SpecializationSerializer(many=True)
    contacts = ContactSerializer(many=True)
    sponsors = SponsorSerializer(many=True)
    covered_expenses = ExpenseSerializer(many=True)

    # Reverse FK Relation to Schedule
    schedule_list = ScheduleSerializer(many=True)

    class Meta:
        model = Conference
        fields = ('info', 'call_for_paper_deadline', 'ranking', 'duration'
                  , 'conference_venue', 'fields_of_interest'
                  , 'contacts', 'sponsors', 'covered_expenses'
                  , 'key_speakers', 'source', 'schedule_list')

    def to_representation(self, instance):
        """
        Override the data representation by removing the
        fields with null value from the data.
        """
        result = super(ConferenceSerializer, self).to_representation(instance)
        return OrderedDict(
            [(key, result[key]) for key in result if result[key] is not None])


class ScholarshipSerializer(ModelSerializer):

    # OneToOne fields' Serializers

    information = AboutSerializer()
    application_form = SubmissionFormSerializer()

    # ManyToOne Fields' Serializers

    duration = TenureSerializer()
    amount_granted = GrantSerializer()
    criteria = QualificationSerializer()

    # ManyToMany

    fields_of_interest = SpecializationSerializer(many=True)
    sponsors = SponsorSerializer(many=True)
    host_universities = LocationSerializer(many=True)
    contacts = ContactSerializer(many=True)

    class Meta:
        model = Scholarship
        fields = ('information', 'funding'
                  , 'amount_granted', 'deadline'
                  , 'number_of_positions', 'source'
                  , 'duration', 'application_form'
                  , 'criteria'
                  , 'fields_of_interest', 'host_universities'
                  , 'contacts', 'sponsors'
                  , 'perks_offered', 'scholarship_maintenance_criteria')

    def to_representation(self, instance):
        """
        Override the data representation by removing the
        fields with null value from the data.
        """
        result = super(ScholarshipSerializer, self).to_representation(instance)
        return OrderedDict(
            [(key, result[key]) for key in result if result[key] is not None])


class StudentPositionSerializer(ModelSerializer):

    # OneToOne
    job = JobSerializer()
    submission_form = SubmissionFormSerializer()

    # ManyToOne
    job_location = LocationSerializer()
    duration = TenureSerializer()
    requirements = QualificationSerializer()
    fee = FeeSerializer()
    salary = SalarySerializer()
    job_provider = ProfessorSerializer()

    # ManyToMany
    skills_covered = SpecializationSerializer(many=True)
    contacts = ContactSerializer(many=True)

    class Meta:
        model = StudentPosition
        fields = ('job', 'experience_required'
                  , 'submission_form', 'job_location'
                  , 'deadline', 'duration'
                  , 'requirements', 'job_provider'
                  , 'source'
                  , 'fee', 'salary'
                  , 'skills_covered', 'contacts')

    def to_representation(self, instance):
        """
        Override the data representation by removing the
        fields with null value from the data.
        """
        result = super(StudentPositionSerializer, self).to_representation(instance)
        return OrderedDict(
            [(key, result[key]) for key in result if result[key] is not None])
