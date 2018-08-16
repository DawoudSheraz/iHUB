import datetime
from datetime import timedelta
from django.db.models.signals import post_save, pre_save
from django.dispatch import receiver
from models import *


@receiver(pre_save, sender=Conference, dispatch_uid='conf_signal')
def check_conference_paper_submission_date(sender, instance, **kwargs):
    """
    Check if paper submission date is after start date or not.

    If paper submission date is after start date, the server
    temporarily adjusts paper deadline equal to start date
    """
    if instance.call_for_paper_deadline > instance.duration.start_date:
        instance.call_for_paper_deadline = instance.duration.start_date


@receiver(pre_save, sender=StudentPosition, dispatch_uid='job_pos_date_signal')
def check_job_position_deadline(sender, instance, **kwargs):
    """
    Checks if job application submission deadline is before job start.

    IF deadline is after the start date, the deadline is adjusted
    by the server to 30 days prior the start date
    """

    if instance.deadline > instance.duration.start_date:
        instance.deadline = instance.duration.start_date \
                            - datetime.timedelta(days=30)


@receiver(pre_save, sender=Scholarship, dispatch_uid='scholarship_date_signal')
def check_scholarship_deadline(sender, instance, **kwargs):
    """
    Checks if scholarship application submission deadline is before start.

    IF deadline is after the start date, the deadline is adjusted
    by the server to 60 days prior the start date
    """
    if instance.deadline > instance.duration.start_date:
        instance.deadline = instance.duration.start_date \
                            - datetime.timedelta(days=60)


@receiver(pre_save, sender=Tenure, dispatch_uid='tenure_duration_check')
def check_tenure_duration(sender, instance, **kwargs):
    """
    IF duration is given to be negative, change it to be positive.
    """
    if instance.duration.total_seconds() < 0:
        instance.duration = timedelta(seconds
                                      =abs(instance.duration.total_seconds()))


@receiver(pre_save, sender=Tenure, dispatch_uid='tenure_end_date_setting')
def update_end_date(sender, instance, **kwargs):
    """
    Create Tenure end time based on start date and duration.
    """
    instance.end_date = instance.start_date + instance.duration


@receiver(pre_save, sender=Specialization, dispatch_uid='save_name_lowercase')
def save_skill_as_lowercase(sender, instance, **kwargs):
    """
    Save Specialization object with title in small alphabets.
    """
    instance.title = instance.title.lower()


@receiver(pre_save, sender=Grant, dispatch_uid='get_amount_number')
@receiver(pre_save, sender=Salary)
def get_amount_number_from_string(sender, instance, **kwargs):

    instance.numeric_value = float(instance.amount[1:])







