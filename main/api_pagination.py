from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination


class CustomResponsePagination(PageNumberPagination):
    """
    API Custom paginator to tell number of pages
    on which data has been distributed.
    """

    def get_paginated_response(self, data):

        # On last page, the page count = page number
        if self.get_next_link() is None:
            number_of_pages = self.page.number
            
        # If total data count is perfectly divisible by current page data length
        elif self.page.paginator.count % len(data) == 0:
            number_of_pages = self.page.paginator.count / len(data)
        else:
            number_of_pages = self.page.paginator.count / len(data) + 1

        return Response({
            'next': self.get_next_link(),
            'previous': self.get_previous_link(),
            'count': self.page.paginator.count,
            'current_page': self.page.number,
            'pages': number_of_pages,
            'results': data
        })