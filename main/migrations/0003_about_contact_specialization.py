# -*- coding: utf-8 -*-
# Generated by Django 1.11.13 on 2018-07-17 07:40
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0002_sponsor_submissionform_tenure'),
    ]

    operations = [
        migrations.CreateModel(
            name='About',
            fields=[
                ('id', models.CharField(max_length=50, primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=80)),
                ('description', models.CharField(max_length=150)),
            ],
            options={
                'db_table': 'about',
            },
        ),
        migrations.CreateModel(
            name='Contact',
            fields=[
                ('id', models.CharField(max_length=50, primary_key=True, serialize=False)),
                ('email', models.EmailField(blank=True, max_length=254, null=True)),
                ('phone', models.CharField(blank=True, max_length=20, null=True)),
            ],
            options={
                'db_table': 'contact',
            },
        ),
        migrations.CreateModel(
            name='Specialization',
            fields=[
                ('id', models.CharField(max_length=50, primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=40)),
                ('description', models.CharField(max_length=100)),
            ],
            options={
                'db_table': 'specialization',
            },
        ),
    ]