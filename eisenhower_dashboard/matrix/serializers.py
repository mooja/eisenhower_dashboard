from rest_framework import serializers

from django.conf import settings

from .models import TimeSession
from eisenhower_dashboard.users.models import User

class TimeSessionSerializer(serializers.HyperlinkedModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = TimeSession
        fields = ('url', 'id', 'user', 'quadrant', 'start', 'end')
    

class UserSerializer(serializers.HyperlinkedModelSerializer):
    time_sessions = serializers.HyperlinkedRelatedField(
        many=True, view_name='timesession-detail', read_only=True
    )

    class Meta:
        model = User
        fields = ('url', 'id', 'username', 'time_sessions')