from rest_framework import serializers
from group.models import Group

class createGroupSerializer(serializers.Serializer):
    name = serializers.CharField(required=True)
    description = serializers.CharField(required=True)
    owner = serializers.CharField(required=True)
    class Meta:
        model = Group
        fields = ('name','description','owner','member')

    def create(self,validated_data):
        return Group.objects.create(**validated_data)