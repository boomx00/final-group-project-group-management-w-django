from rest_framework import serializers
from group.models import Group,Requests,Accepted,Proposals
from users.models import NewUser
from django_filters import rest_framework as filters

class groupRandomizerSerializer(serializers.ModelSerializer):
    # name = serializers.CharField(required=True)
    # description = serializers.CharField(required=True)
    # owner = serializers.CharField(required=True)
    # topic = serializers.CharField(required=True)
    class Meta:
        model = Group
        fields = ('id','member')

class GroupSerializer(serializers.ModelSerializer):
    name = serializers.CharField(required=True)
    description = serializers.CharField(required=True)
    owner = serializers.CharField(required=True)
    topic = serializers.CharField(required=True)
    class Meta:
        model = Group
        fields = ('id', 'name','description','owner','topic','len','applications')

# class RequestSerializer(filters.FilterSet):
#     class Meta:
#         model = Requests
#         fields = '__all__'
class RequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Requests
        fields = '__all__'
        depth=1


class manageGroupProposal(serializers.ModelSerializer):
    class Meta:
        model=Group
        fields=('id','proposal')

    def update(self,instance,validated_data):
        instance.proposal= validated_data.get('proposal',instance.proposal)

        instance.save()
        return instance

class manageGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model=Group
        fields=('id','name','description','topic','tags')

    def update(self,instance,validated_data):
        instance.name= validated_data.get('name',instance.name)
        instance.description= validated_data.get('description',instance.description)
        instance.topic= validated_data.get('topic',instance.topic)
        instance.tags= validated_data.get('tags',instance.tags)


        instance.save()
        return instance

class getGroupSerializer(serializers.Serializer):
    id = serializers.CharField()
    name = serializers.CharField(max_length=120)
    description = serializers.CharField()
    topic = serializers.CharField()
    len = serializers.IntegerField()
    applications = serializers.JSONField()
    member = serializers.JSONField()
    requirements = serializers.CharField()
    tags = serializers.JSONField()
    proposal = serializers.CharField()
    recruitment = serializers.CharField()

class createProposalSerializer(serializers.ModelSerializer):
    groupid_id = serializers.CharField(required=True)
    progress = serializers.CharField(required=True)
    class Meta:
        model = Proposals
        fields = ('groupid_id','progress')

    def create(self,validated_data):
        return Proposals.objects.create(**validated_data)

class createGroupSerializer(serializers.ModelSerializer):
    name = serializers.CharField(required=True)
    description = serializers.CharField(required=True)
    owner = serializers.CharField(required=True)
    requirements = serializers.CharField(required=True)
    topic = serializers.CharField(required=True)
    member = serializers.JSONField()
    tags = serializers.JSONField()
    len = serializers.IntegerField(required=False)
    class Meta:
        model = Group
        fields = ('id','name','description','owner','member','requirements','topic','tags','len')

    def create(self,validated_data):
        return Group.objects.create(**validated_data)

class applicationSerializer(serializers.Serializer):
    applications = serializers.JSONField()

    class Meta:
        model = Group
        fields = ('applications')

    def update(self,instance,validated_data):
        instance.applications= validated_data.get('applications',instance.applications)
        instance.save()
        return instance

class setMemberSerializer(serializers.Serializer):
    member = serializers.JSONField()
    len = serializers.JSONField(required=False)
    class Meta:
            model = Group
            fields = ('member','len')
    def update(self,instance,validated_data):
            instance.member= validated_data.get('member',instance.member)
            instance.len = validated_data.get('len',instance.len)
            instance.save()
            return instance

# getGroupByIdSerializer
class getGroupByIdSerializer(serializers.ModelSerializer):
    name = serializers.CharField()
    description = serializers.CharField()
    owner = serializers.CharField()
    topic = serializers.CharField()
    member = serializers.JSONField()
    tags = serializers.JSONField()
    recruitment = serializers.CharField()

    class Meta:
        model = Group
        fields = ('id','name','description','owner','topic','member','tags','proposal','requirements','recruitment')


class getGroupByCreatorSerializer(serializers.ModelSerializer):
    name = serializers.CharField()
    description = serializers.CharField()
    owner = serializers.CharField()
    topic = serializers.CharField()
    member = serializers.JSONField()

    class Meta:
        model = Group
        fields = ('id','name','description','owner','topic','member')

class createRequestSerializer(serializers.ModelSerializer):
    userid = serializers.CharField(required = True)
    groupname_id = serializers.IntegerField(required = True)
    firstName = serializers.CharField(required = True)

    class Meta:
        model = Requests
        fields = ('userid','groupname_id','firstName')

    def create(self,validated_data):
        return Requests.objects.create(**validated_data)

class updalenatusSerializer(serializers.Serializer):
    status = serializers.CharField(required=True)

    class Meta:
        model=Requests
        fields = ('status')

    def update(self,instance,validated_data):
            instance.status= validated_data.get('status',instance.status)
            instance.save()
            return instance

class createAcceptedSerializer(serializers.ModelSerializer):
    userid = serializers.CharField(required = True)
    groupname_id = serializers.IntegerField(required = True)
    firstName = serializers.CharField(required = True)

    class Meta:
        model = Accepted
        fields = ('userid','groupname_id','firstName')

    def create(self,validated_data):
        return Accepted.objects.create(**validated_data)

class RequestsSerializer(serializers.ModelSerializer):
    # requests = RequestsSerializer(many=True, read_only=True)

    class Meta:
        model = Requests
        fields = ['id','userid', 'firstName','lastName']
    # def to_representation(self, value):
    #     return 'id: %s, firstName: %s' % (value.userid, value.firstName)


class AcceptedSerializer(serializers.ModelSerializer):
    class Meta:
            model = Accepted
            fields = ['userid', 'firstName']

# class UsersSerializer(serializers.ModelSerializer):
#     class Meta:
#             model = NewUser
#             fields = ['userid', 'name']

class GroupsSerializer(serializers.ModelSerializer):
    accepted = AcceptedSerializer(many=True,read_only=True)
    requests = RequestsSerializer(many=True, read_only=True)

    class Meta:
        model = Group
        fields=['id','name', 'owner','requests','accepted']

class UpdateRequestSerializer(serializers.ModelSerializer):
    groupname_id = serializers.IntegerField(required = True)

    class Meta:
        model = Requests
        # fields=['status','userid']
        fields=['status','confirmed','userid','groupname_id']

class ConfirmRequestSerializer(serializers.ModelSerializer):
    groupname_id = serializers.IntegerField(required = True)

    class Meta:
        model = Requests
        # fields=['status','userid']
        fields=['confirmed','userid','groupname_id']

class AcceptConfirmRequestSerializer(serializers.ModelSerializer):
    groupname_id = serializers.IntegerField(required = True)

    class Meta:
        model = Requests
        # fields=['status','userid']
        fields=['confirmed','userid','groupname_id']

class getOwnRequestsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Requests
        # fields=['status','userid']
        fields=['status','userid','groupname_id','confirmed']


class setProposal(serializers.ModelSerializer):
    proposal = serializers.CharField(required = True)

    class Meta:
        model = Group
        fields=['proposal']

    def update(self,instance,validated_data):
        instance.proposal= validated_data.get('proposal',instance.proposal)
        instance.save()
        return instance

class getProposalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Proposals
        fields="__all__"
        depth = 1

class updateProposalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Proposals
        fields=['feedback','progress']

    def update(self,instance,validated_data):
        instance.feedback = validated_data.get('feedback',instance.feedback)
        instance.progress = validated_data.get('progress',instance.progress)
        instance.save()
        return instance

class closeRecruitmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ['id','recruitment']

    def update(self,instance,validated_data):
        instance.recruitment = validated_data.get('recruitment',instance.recruitment)
        instance.save()
        return instance

#         {
# "groupid":44,
# "status":"popoman"
# }