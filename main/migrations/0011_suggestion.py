# -*- coding: utf-8 -*-
# Generated by Django 1.11.13 on 2018-09-19 05:21
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0010_salary_numeric_value'),
    ]

    operations = [
        migrations.CreateModel(
            name='Suggestion',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fullName', models.CharField(max_length=100)),
                ('email', models.EmailField(max_length=254)),
                ('problem_area', models.CharField(choices=[('conference', 'conference'), ('student_position', 'student_position'), ('scholarship', 'scholarship')], max_length=50)),
                ('complaint_nature', models.CharField(choices=[('performance', 'performance'), ('incorrect_data', 'incorrect_data'), ('invalid_data_source', 'invalid_data_source')], max_length=50)),
                ('description', models.CharField(max_length=200)),
                ('registered_user', models.BooleanField(default=False)),
                ('profile_category', models.CharField(blank=True, choices=[('student', 'student'), ('professor', 'professor')], max_length=50, null=True)),
                ('website_source', models.CharField(blank=True, choices=[('ads', 'ads'), ('friend', 'friend'), ('google', 'google')], max_length=50, null=True)),
            ],
            options={
                'db_table': 'suggestion',
            },
        ),
    ]