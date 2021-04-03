from rest_framework import serializers
from users.models import NewUser
from django.contrib.auth import authenticate

class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = NewUser
    fields = ('id', 'username')

class CustomUserSerializer(serializers.ModelSerializer):
    """
    Currently unused in preference of the below.
    """
    email = serializers.EmailField(required=True)
    username = serializers.CharField(required=True)
    password = serializers.CharField(min_length=8, write_only=True)
    test = serializers.CharField(required=True)
    class Meta:
        model = NewUser
        fields = ('email', 'username', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        # as long as the fields are the same, we can just use this
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance
    
class EditUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = NewUser
        fields = ('bio', 'major')

    def update(self,instance,validated_data):
        instance.bio = validated_data.get('bio',instance.bio)
        instance.major = validated_data.get('major',instance.major)
        instance.save()
        return instance

