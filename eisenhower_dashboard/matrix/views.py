# -*- coding: utf-8 -*-
from __future__ import unicode_literals

import json
from datetime import datetime

from django.conf import settings
from django.shortcuts import render
from django.views.generic import TemplateView
from django.views.decorators.csrf import csrf_exempt

from rest_framework import permissions
from rest_framework import viewsets
from rest_framework.renderers import JSONRenderer

from eisenhower_dashboard.users.models import User
from .models import TimeSession
from .serializers import TimeSessionSerializer, UserSerializer


class HomeView(TemplateView):
    template_name = 'pages/home.html'

    def get_context_data(self, **kwargs):
        timesessions = TimeSession.objects.filter(user=self.request.user)
        timesessions = [{'id': ts.id,
            'start': ts.start,
            'end': ts.end,
            'quadrant': ts.quadrant}
            for ts in timesessions]

        for ts in timesessions:
            if isinstance(ts['start'], datetime):
                ts['start'] = ts['start'].isoformat()
            if isinstance(ts['end'], datetime):
                ts['end'] = ts['end'].isoformat()

        context = super().get_context_data(**kwargs)
        context['sessions'] = json.dumps(timesessions)
        return context


class TimeSessionViewSet(viewsets.ModelViewSet):
    queryset = TimeSession.objects.all()
    serializer_class = TimeSessionSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer