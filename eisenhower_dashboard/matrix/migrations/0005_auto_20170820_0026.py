# -*- coding: utf-8 -*-
# Generated by Django 1.10.7 on 2017-08-20 00:26
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('matrix', '0004_auto_20170820_0022'),
    ]

    operations = [
        migrations.AlterField(
            model_name='timesession',
            name='end',
            field=models.DateTimeField(blank=True, default=None, null=True),
        ),
    ]
