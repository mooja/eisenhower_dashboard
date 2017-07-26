from django.conf.urls import include, url

from rest_framework.routers import DefaultRouter

from matrix import views


router = DefaultRouter()
router.register(r'timesessions', views.TimeSessionViewSet)
router.register(r'users', views.UserViewSet)

urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]