from django.urls import path,include
from .views import *
from users.views import *
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
router = DefaultRouter()
router.register('users', UserViewSet, basename='users')

app_name = 'users'


urlpatterns = [
    path('',include(router.urls)),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
  
    # path('', main),
    # path('xx', anotherthing),
    # path('room',RoomView.as_view()),
    # path('restaurant',RestaurantView.as_view()),
    # path('index',anotherthing),
    # path('articles',ArticleList.as_view()),
    # path('articles/<int:id>',ArticleDetails.as_view())

    # path('article',article_list), 
    # path('article/<int:pk>',article_details)
    # path('article/<str:title>',article_details)


]