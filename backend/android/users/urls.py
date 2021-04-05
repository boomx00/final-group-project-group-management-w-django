from django.urls import path
from .views import CustomUserCreate, BlacklistTokenUpdateView,GetUser

app_name = 'users'

urlpatterns = [
    path('create/', CustomUserCreate.as_view(), name="create_user"),
    path('getuser/', GetUser.as_view(), name="create_user"),
    path('logout/blacklist/', BlacklistTokenUpdateView.as_view(),
         name='blacklist')
]
