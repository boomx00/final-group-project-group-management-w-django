from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import viewsets
from .models import Users
from .serializer import UserSerializer

# Create your views here.
def main(request):
    return HttpResponse("<h1>hi</h1>")

class UserViewSet(viewsets.ModelViewSet):
    queryset = Users.objects.all()
    serializer_class = UserSerializer
