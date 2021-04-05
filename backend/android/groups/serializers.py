from rest_framework import serializers
from groups.models import newGroup
from django.contrib.auth import authenticate

class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = newGroup
        fields = ('Group Name', 'Description')

class CustomGroupSerializer(serializers.ModelSerializer):
    """
    Currently unused in preference of the below.
    """
    name = models.CharField(max_length=150, unique=True)
    description = models.TextField(max_length=200, blank=True, null=True)   
    owner = models.CharField(max_length=150, unique=True)
    amount = models.FloatField()


    class Meta:
        model = newGroup
        fields = ('Group Name', 'Description', 'Group Master', 'Member count')

    