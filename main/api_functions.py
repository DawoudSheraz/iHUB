

def filter_specialization_from_input(skills):
    """
    Given the Specialization objects matching with the
    fields passed in the URL
    :param skills: comma separated skill values
    :return: list of Skill titles
    """

    # Change to lower case and handle special case
    # where c++'s + symbol is omitted by django URL
    skills = skills.lower().replace('c  ', 'c\+\+')

    # Convert to list and remove trailing and leading whitespaces
    skill_list = skills.split(',')
    skill_list = [x.strip() for x in skill_list if x != '']

    # Convert underscore into space as underscores are used instead
    # of whitespace in the url
    skill_list = [x.replace('_', ' ') if '_' in x else x for x in skill_list]

    return skill_list


def filter_countries(countries):
    """
    given comma separated list of countries, convert into lowercase
    and remove any trailing/leading whitespace
    """

    countries = countries.lower().split(',')

    countries = [x.strip() for x in countries if x != '']

    return countries


def get_date_as_month_year(date_string):
    """
    Given string in format 0000-00 (YY-MM), return month and year
    """
    date_list = date_string.split('-')
    year = date_list[0]
    month = date_list[1]

    if len(year) == 4 and len(month) == 2:
        return month, year


def validate_experience_input(experience):

    if '5  ' in experience:
        experience = '5+ Years'
    return experience


def get_numeric_amount(value):
    """
    get numeric value from string with format '$num'.
    """
    return float(value[1:])


def identify_data_type(value):

    """
    Based on the query_param structure, decide the data type of the value.

    :param value: name of query parameter
    :return: string mentioning the possible type of the value
    """

    if value[len(value)-4:] == '_max':
        return "max"
    elif value[len(value)-4:] == '_min':
        return "min"
    elif value[len(value)-5:] == '_list':
        return "list"
    elif value[len(value)-5:] == '_date':
        return "date"
    else:
        return "str"


def get_model_dict_from_query_dict(query_dict, mapping_dict):

    """
    Given QueryDict and mapping dict (from query params to model attributes)
    generate the dict compatible with filter()

    :param query_dict: contains the query params and their values

    :param mapping_dict: contains mapping to query params to model attribute
    and function that might be required to be called on the input. The format is
    {'key' : ('model_column_name', function/None)}

    :return: regular dictionary to be used with filter command
    """

    out_dict = {}

    # Remove the format parameter that is specified by the browsable api
    if 'format' in query_dict.keys():
        del query_dict['format']

    # For every input
    for key, value in query_dict.iteritems():

        # Identify data type from the query param
        data_type = identify_data_type(key)

        # If function defined, apply the function on the input
        # Else assign the value as it is
        if mapping_dict[key][1] is not None:
            out_val = (mapping_dict[key][1])(value)
        else:
            out_val = value

        if data_type == 'max':
            out_dict['%s__lte' % mapping_dict[key][0]] = out_val
        elif data_type == 'min':
            out_dict['%s__gte' % mapping_dict[key][0]] = out_val
        elif data_type == 'list':
            out_dict['%s__in' % mapping_dict[key][0]] = out_val
        elif data_type == 'date':
            month, year = get_date_as_month_year(out_val)

            out_dict['%s__month' % mapping_dict[key][0]] = month
            out_dict['%s__year' % mapping_dict[key][0]] = year

        else:
            out_dict['%s__iexact' % mapping_dict[key][0]] = out_val

    return out_dict

