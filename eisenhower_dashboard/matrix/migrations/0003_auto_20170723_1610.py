# -*- coding: utf-8 -*-
# Generated by Django 1.10.7 on 2017-07-23 16:10
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('matrix', '0002_auto_20170721_1641'),
    ]

    operations = [
        migrations.AlterField(
            model_name='timesession',
            name='end',
            field=models.DateTimeField(null=True),
        ),
        migrations.AlterField(
            model_name='timesession',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='time_sessions', to=settings.AUTH_USER_MODEL),
        ),
    ]
