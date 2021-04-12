from django.shortcuts import render
from rest_framework import serializers
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import createGroupSerializer
from rest_framework.permissions import AllowAny,IsAuthenticated
from group.models import Group


class CreateGroup(APIView):
    permission_classes = [IsAuthenticated]

    def post(self,request,format='json'):
        serializer = createGroupSerializer(data=request.data)
        if serializer.is_valid():
            group = serializer.save()
            if group:
                json = serializer.data
                return Response(json, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
# Create your views here.
