from django.utils.deprecation import MiddlewareMixin
from django.http.response import HttpResponse
from django.contrib.auth import logout


class CustomAuthenticationMiddleware(object):

    """
    Checks if signed In user has email address registered.

    If currently signed in user doesn't contain email,
    the user is asked to enter so on the portal
    """

    def __init__(self, get_response):
        self.get_response = get_response
        # One-time configuration and initialization.

    def __call__(self, request):

        # Process_request called explicitly
        response = self.process_request(request)

        # if none returned, get the initial response for the request
        if response is None:
            response = self.get_response(request)
        return response

    def process_request(self, request):

        # If user logged in
        if request.user.is_authenticated():

            # Checking Email existence
            if '@' in request.user.email:
                return None

            # If no email, logout user and return custom response
            logout(request)
            return HttpResponse('<h2> No Registered email Found</h2>'
                                '<br>'
                                'Contact Admin to get registered with email'
                                '<br>'
                                '<a class="link" href="/main/">Back</a>')


