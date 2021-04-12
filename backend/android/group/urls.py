from django.urls import path
from .views import CreateGroup

app_name='group'

urlpatterns = [
    path('create/', CreateGroup.as_view(), name="create_group")
]