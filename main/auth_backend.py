from django.contrib.auth.models import User
from django.contrib.auth.backends import ModelBackend


class CustomAuthBackend(ModelBackend):

    def get_user(self, user_id):
        try:
            return User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return None

    def authenticate(self, request, username=None, password=None, email=None, **kwargs):
        """
        Custom authenticate to validate user using both email & username.

        :param request: http request
        :param username: username against which user is checked
        :param password: password for auth
        :param email: email against which user is checked
        :param kwargs: additional special arguments
        :return:
        """
        try:
            # Check against email
            user = User.objects.get(email=email)
            if user.check_password(password):
                return user

        except User.DoesNotExist:
            try:
                # If not email, check against username
                user = User.objects.get(username=username)
                if user.check_password(password):
                    return user
            except User.DoesNotExist:
                return None

        return None






