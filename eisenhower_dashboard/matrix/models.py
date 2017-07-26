# -*- coding: utf-8 -*-

from django.conf import settings
from django.db import models


class TimeSession(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='time_sessions', on_delete=models.CASCADE)

    QUADRANT_CHOICES = (
        ('q1', 'q1'),
        ('q2', 'q2'),
        ('q3', 'q3'),
        ('q4', 'q4'),
    )
    quadrant = models.CharField(choices=QUADRANT_CHOICES, max_length=2)

    start = models.DateTimeField();
    end = models.DateTimeField(null=True);

    def __str__(self):
        return f'<TimeSession {self.user!s} ({self.start!s}, {self.end!s})>'

    def __unicode__(self):
        return self.__str__()