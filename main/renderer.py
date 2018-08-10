import datetime
from collections import OrderedDict
from rest_framework.renderers import BaseRenderer


class CommaSeparatedValuesRenderer(BaseRenderer):

    media_type = 'text/comma-separated-values'
    format = 'csv'
    charset = 'utf-8'

    def get_clean_data(self, data_value):

        # Get the data type of the passed value
        data_type = type(data_value)
        out_data = ''

        # If ordered dict, recursive call on each Value is done
        if data_type is OrderedDict:
            for key, value in data_value.iteritems():
                if out_data == '':
                    out_data = "%s:%s" % (key, self.get_clean_data(value))
                else:
                    out_data = "%s;%s:%s" % (out_data
                                             , key
                                             , self.get_clean_data(value))

        # For list, the recursive call on each list element is done
        elif data_type is list:
            for each in data_value:
                if out_data == '':
                    out_data = '%s' % (self.get_clean_data(each))
                else:
                    out_data = '%s; %s' % (out_data, self.get_clean_data(each))

        # for numeric or date values, no operation is performed
        elif data_type is float or data_type is int or data_type is datetime.datetime:
            out_data = data_value

        # The last case will be str, where ',' is removed
        # to cater for the CSV format
        else:
            if ',' in data_value:
                data_value = data_value.replace(',', ';')
            out_data = data_value

        return out_data

    def render(self, data, accepted_media_type=None, renderer_context=None):

        output_data = ''
        column_data = ''

        column_names_read = False

        for each in data:
            temp_data = ''
            for key, value in each.iteritems():

                # Reading the column names for the first time
                if column_names_read is False:
                    column_data = '%s,%s' % (column_data, key)

                # Pass each value to clean_data function
                # to resolve complex data types
                temp_data = '%s,%s' % (temp_data, self.get_clean_data(value))

            # Marking column read as true after first loop
            column_names_read = True

            # Adding \n after one complete data entry
            output_data = '%s\n%s' % (output_data, temp_data)

        return '%s\n%s' % (column_data, output_data)

