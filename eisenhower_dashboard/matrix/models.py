# -*- coding: utf-8 -*-

from django.db import models


class Quadrant(models.Model):
    title = models.CharField(max_length=200)


class TimeSession(models.Model):
    start = models.DateTimeField();
    end = models.DateTimeField();

    quadrant = models.ForeignKey(Quadrant)

    def __str__(self):
        return 

    def __unicode__(self):
        return 

class Matrix(models.Model):
    title = models.CharField(max_length=30, null=False)
    q1 = models.OneToOneField(Quadrant, related_name='q1');
    q2 = models.OneToOneField(Quadrant, related_name='q2')
    q3 = models.OneToOneField(Quadrant, related_name='q3')
    q4 = models.OneToOneField(Quadrant, related_name='q4')