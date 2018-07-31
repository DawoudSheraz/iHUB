from django.forms import ModelForm
from main.models import Student, Professor


class StudentForm(ModelForm):

    class Meta:
        model = Student
        fields = ['name', 'age', 'gender', 'experience', 'skills']


class ProfessorForm(ModelForm):

    class Meta:
        model = Professor
        fields = ['name', 'age', 'gender', 'related_university', 'expertise']
