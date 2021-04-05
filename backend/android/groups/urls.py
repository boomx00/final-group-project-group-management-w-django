from django.urls import path

urlpatterns = [
    path('submit/', CustomGroupCreate.as_view(), name="submit_group"),
]