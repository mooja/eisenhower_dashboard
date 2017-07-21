# -*- coding: utf-8 -*-

from django.conf import settings
from django.db import models
from django.contrib.auth.models import User


class TimeSession(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL)

    QUADRANT_CHOICES = (
        ('q1', 'q1'),
        ('q2', 'q2'),
        ('q3', 'q3'),
        ('q4', 'q4'),
    )
    quadrant = models.CharField(choices=QUADRANT_CHOICES, max_length=2)

    start = models.DateTimeField();
    end = models.DateTimeField();

    def __str__(self):
        return f'<TimeSession of {self.user!s} ({self.start!s}, {self.end!s})>'

    def __unicode__(self):
        return self.__str__()