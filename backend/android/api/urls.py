from django.urls import path,include
from .views import *
from rest_framework.routers import DefaultRouter
router = DefaultRouter()
router.register('users', UserViewSet, basename='users')


urlpatterns = [
    path('',include(router.urls))
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