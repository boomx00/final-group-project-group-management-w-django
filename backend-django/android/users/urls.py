from django.urls import path
from .views import getSpecificUser,checkToken,CustomUserCreate, BlacklistTokenUpdateView,GetUser,EditUser,SetApplication,EditSpecificUser,SetLiked,ChangePassword,Randomize

app_name = 'users'

urlpatterns = [
    path('create/', CustomUserCreate.as_view(), name="create_user"),
    path('getuser/', GetUser.as_view(), name="create_user"),
    path('edituser/', EditUser.as_view(), name="create_user"),
    path('changepassword/<int:pk>', ChangePassword.as_view(), name="change_password"),
    path('setapplied/<int:id>', SetApplication.as_view(), name="set_applied"),
    # path('getapplied/<int:id>', GetApplications.as_view(), name="get_applied"),
    path('specificuser/<int:id>', EditSpecificUser.as_view(), name="set_specific"),
    path('setliked/', SetLiked.as_view(), name="set_specific"),
    path('logout/blacklist/', BlacklistTokenUpdateView.as_view(),name='blacklist'),
    path('checktoken',checkToken.as_view(),name="check_token"),
    path('getspecificuser/<int:id>', getSpecificUser.as_view(), name="create_user"),
    path('randomize/', Randomize.as_view(), name='randomize'),

]