from rest_framework import serializers
from users.models import NewUser
from django.contrib.auth import authenticate
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password

class RandomizeSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewUser
        fields = ('id', 'username','bio','major','first_name','email','applied','is_in','role','likes')

class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = NewUser
    fields = ('id', 'username','bio','major','first_name','email','applied','is_in','role','likes','isTeacher')

class CustomUserSerializer(serializers.ModelSerializer):
    """
    Currently unused in preference of the below.
    """
    email = serializers.EmailField(required=True)
    username = serializers.CharField(required=True)
    first_name = serializers.CharField(required=True)
    password = serializers.CharField(min_length=8, write_only=True)
    isTeacher = serializers.BooleanField(required=False)
    class Meta:
        model = NewUser
        fields = ('email', 'username', 'password','first_name','isTeacher')
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


class LikedSerializer(serializers.ModelSerializer):
    class Meta:
        model=NewUser
        fields = ('id','likes')

    def update(self,instance,validated_data):
        instance.likes = validated_data.get('likes',instance.likes)

        instance.save()
        return instance

class SpecificUserSerializer(serializers.Serializer):
    role = serializers.CharField(allow_blank=True)
    is_in = serializers.CharField(allow_blank=True)
    applied = serializers.JSONField()

    class Meta:
        model = NewUser
        fields = ('role','is_in','applied')
    def update(self,instance,validated_data):
        instance.role = validated_data.get('role',instance.role)
        instance.is_in = validated_data.get('is_in', instance.is_in)
        instance.applied = validated_data.get('applied', instance.applied)

        instance.save()
        return instance

class SetApplicationSerializer(serializers.Serializer):
    applied = serializers.JSONField()
    class Meta:
        model = NewUser
        fields = ('applied')

    def update(self,instance,validated_data):
        instance.applied = validated_data.get('applied',instance.applied)
        instance.save()
        return instance

class ChangePasswordSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)
    old_password = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = NewUser
        fields = ('old_password', 'password', 'password2')

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})

        return attrs

    def validate_old_password(self, value):
        user = self.context['request'].user
        if not user.check_password(value):
            raise serializers.ValidationError({"old_password": "Old password is not correct"})
        return value

    def update(self, instance, validated_data):
        user = self.context['request'].user
        users = self.context['request']
        if user.pk != instance.pk:
            raise serializers.ValidationError({"authorize": users})
        instance.set_password(validated_data['password'])
        instance.save()

        return instance
# class getApplications(serializers.ModelSerializer):

