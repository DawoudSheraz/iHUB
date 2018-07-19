# -*- coding: utf-8 -*-
# Generated by Django 1.11.13 on 2018-07-17 06:43
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Department',
            fields=[
                ('id', models.CharField(max_length=50, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=50)),
            ],
            options={
                'db_table': 'department',
            },
        ),
        migrations.CreateModel(
            name='Expense',
            fields=[
                ('id', models.CharField(max_length=50, primary_key=True, serialize=False)),
                ('amount', models.CharField(max_length=30)),
                ('description', models.CharField(blank=True, max_length=50, null=True)),
            ],
            options={
                'db_table': 'expense',
            },
        ),
        migrations.CreateModel(
            name='Fee',
            fields=[
                ('id', models.CharField(max_length=50, primary_key=True, serialize=False)),
                ('amount', models.CharField(max_length=30)),
            ],
            options={
                'db_table': 'fee',
            },
        ),
        migrations.CreateModel(
            name='Field',
            fields=[
                ('id', models.CharField(max_length=50, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=50)),
                ('department', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='department', to='main.Department')),
            ],
            options={
                'db_table': 'field',
            },
        ),
        migrations.CreateModel(
            name='Grant',
            fields=[
                ('id', models.CharField(max_length=50, primary_key=True, serialize=False)),
                ('amount', models.CharField(max_length=30)),
            ],
            options={
                'db_table': 'grant',
            },
        ),
        migrations.CreateModel(
            name='Job',
            fields=[
                ('id', models.CharField(max_length=50, primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=50)),
                ('type', models.CharField(max_length=50)),
                ('description', models.CharField(max_length=100)),
                ('function', models.CharField(max_length=100)),
                ('expectations', models.CharField(blank=True, max_length=100, null=True)),
            ],
            options={
                'db_table': 'job',
            },
        ),
        migrations.CreateModel(
            name='Location',
            fields=[
                ('id', models.CharField(max_length=50, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=60)),
                ('city', models.CharField(blank=True, max_length=30, null=True)),
                ('country', models.CharField(max_length=20)),
            ],
            options={
                'db_table': 'location',
            },
        ),
        migrations.CreateModel(
            name='Qualifications',
            fields=[
                ('id', models.CharField(max_length=50, primary_key=True, serialize=False)),
                ('minimum', models.CharField(max_length=100)),
                ('preferred', models.CharField(blank=True, max_length=100, null=True)),
            ],
            options={
                'db_table': 'qualifications',
            },
        ),
        migrations.CreateModel(
            name='Salary',
            fields=[
                ('id', models.CharField(max_length=50, primary_key=True, serialize=False)),
                ('amount', models.CharField(max_length=30)),
            ],
            options={
                'db_table': 'salary',
            },
        ),
        migrations.AddField(
            model_name='department',
            name='university',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='university', to='main.Location'),
        ),
    ]
