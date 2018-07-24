import datetime
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
    by the server to 36 days prior the start date
    """
    if instance.deadline > instance.duration.start_date:
        instance.deadline = instance.duration.start_date \
                            - datetime.timedelta(days=60)



