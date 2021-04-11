from django.urls import path
from .views import *
app_name = 'groups'

urlpatterns = [
    path('submit/', CustomGroupCreate.as_view(), name="submit_group"),
    path('getgroup/', CustomGroupCreate.as_view(), name="get_group")
]