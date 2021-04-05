from django.urls import path
from .views import CustomGroupCreate

urlpatterns = [
    path('submit/', CustomGroupCreate.as_view(), name="submit_group")
]