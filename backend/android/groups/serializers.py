from rest_framework import serializers
from groups.models import newGroup
from django.contrib.auth import authenticate

class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = newGroup
        fields = ('name', 'description', 'members', 'owner')

class CustomGroupSerializer(serializers.ModelSerializer):
    """
    Currently unused in preference of the below.
    """

    name = serializers.CharField(max_length=150)
    description = serializers.CharField(max_length=200, required=False)   
    owner = serializers.CharField(max_length=150)
    members = serializers.FloatField()
    # name = serializers.CharField(max_length=150, unique=True)
    # description = serializers.TextField(max_length=200, blank=True, null=True)   
    # owner = serializers.CharField(max_length=150, unique=True)
    # amount = serializers.FloatField()

    class Meta:
        model = newGroup
        fields = ('name', 'description', 'members', 'owner')
    
    def create(self, validated_data):
        return newGroup.objects.create(**validated_data)
  
    
    def update(self, validated_data):
        instance.name = validated_data.get('title',instance.name)
        instance.description = validated_data.get('description',instance.description)
        instance.owner = validated_data.get('description',instance.owner)
        instance.members = validated_data.get('description',instance.members)


# {
#     "name": "alfan",
#     "members": "4",
#     "owner": "alfan"
# }