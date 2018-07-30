from django.forms import ModelForm
from main.models import Student


class StudentForm(ModelForm):

    class Meta:
        model = Student
        fields = ['name', 'age', 'gender', 'experience', 'skills']
