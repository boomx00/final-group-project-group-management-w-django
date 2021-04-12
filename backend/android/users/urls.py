from django.urls import path
from .views import CustomUserCreate, BlacklistTokenUpdateView,GetUser,EditUser,getAll

app_name = 'users'

urlpatterns = [
    path('create/', CustomUserCreate.as_view(), name="create_user"),
    path('getuser/', GetUser.as_view(), name="create_user"),
    path('edituser/', EditUser.as_view(), name="create_user"),
    path('getall/', getAll  .as_view(), name="create_user"),
    path('logout/blacklist/', BlacklistTokenUpdateView.as_view(),
         name='blacklist')
]