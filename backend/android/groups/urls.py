from django.urls import path
from .views import CustomGroupCreate

app_name = 'groups'

urlpatterns = [
    path('submit/', CustomGroupCreate.as_view(), name="submit_group")
]