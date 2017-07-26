# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.conf import settings
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt

from rest_framework import permissions
from rest_framework import viewsets

from eisenhower_dashboard.users.models import User
from .models import TimeSession
from .serializers import TimeSessionSerializer, UserSerializer


class TimeSessionViewSet(viewsets.ModelViewSet):
    queryset = TimeSession.objects.all()
    serializer_class = TimeSessionSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer