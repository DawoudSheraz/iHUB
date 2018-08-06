import re
from django.core.exceptions import ValidationError


def check_currency_format(value):
    """
    Checks if the amount matches the $ currency format.

    :param value: entered amount
    :return: ValidationError if value not matched
    """

    if not re.match('^\$[0-9]+?.[0-9]+$', value):
        raise ValidationError("Amount Entered does not match format ($amount)")
