from django.shortcuts import render
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import status
from rest_framework import serializers
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny,IsAuthenticated
from rest_framework import generics, permissions
from rest_framework.generics import GenericAPIView
from rest_framework.mixins import ListModelMixin
from .models import *
from .serializers import *

# Create your views here.
class CustomGroupCreate(APIView):
    permission_classes = [AllowAny]

    def post(self, request, format='json'):
        serializer = CustomGroupSerializer(data=request.data)
        if serializer.is_valid():
            group = serializer.save()
            if group:
                json = serializer.data
                return Response(json, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class GetGroup(APIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = GroupSerializer
    def get(self, request):
        serializer = self.serializer_class(request.groups)
        content = {'Getting all groups'}
        return Response(serializer.data, status=status.HTTP_200_OK)

class listGroup(APIView):
    def get(self, request):
        queryset = newGroup.objects.all()
        serializer = GroupSerializer(queryset, many=True)
        return Response({"articles": serializer.data})