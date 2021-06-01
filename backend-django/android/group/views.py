from django.shortcuts import render
from rest_framework import serializers
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import *
from rest_framework.permissions import AllowAny,IsAuthenticated
from group.models import Group,Requests, Proposals
from rest_framework import filters
from rest_framework import generics
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Q
from users.serializers import *
from users.models import *

class removeUser(APIView):
    permission_classes = [AllowAny]
    def getGroup(self,id):
        try:
            return Group.objects.get(id=id)
        except Group.DoesNotExist:
            return Response(status = status.HTTP_404_NOT_FOUND)

    def getRequest(self,userid):
        try:
            return Requests.objects.get(userid=userid)

        except Requests.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def getUser(self,id):
        try:
            return NewUser.objects.get(id=id)
        except NewUser.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def put(self,request,id):
        userids = {"id":request.data['userid']}
        userid= userids['id']
        group = self.getGroup(id)


        user = self.getUser(userid)

        removeduser = {"member":request.data['member'], "len":len(request.data['member'])}
        setUserRemove = {"role": "",
    "is_in": "",
    "applied": []
    }
        setMembersSerializers = setMemberSerializer(group, data=removeduser)
        setUserSerializer= SpecificUserSerializer(user, data= setUserRemove)

        # self.delete(id)
        if setMembersSerializers.is_valid() and setUserSerializer.is_valid():
            setMembersSerializers.save()
            setUserSerializer.save()

            Requests.objects.filter(userid=userid).delete()
            return Response({'msg': "transaction success" })
        return Response ({'msg': "transaction fail" }, status = status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        snippet = self.get_object(pk)
        snippet.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class manageRecruitment(APIView):
    permission_classes=[AllowAny]
    def getObject(self,id):
        try:
            return Group.objects.get(id=id)
        except Group.DoesNotExist:
            return Response(status = status.HTTP_404_NOT_FOUND)

    def put(self,request,id):
        group = self.getObject(id)
        serializer = closeRecruitmentSerializer(group, data= request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class GetAllProposal(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        proposal = Proposals.objects.all()
        # the many param informs the serializer that it will be serializing more than a single article.
        serializer = getProposalSerializer(proposal, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

class getProposal(APIView):
    permission_classes = [AllowAny]

    def getObject(self,id):
        try:
            return Proposals.objects.get(groupid_id=id)
        except Proposals.DoesNotExist:
            return Response(status = status.HTTP_404_NOT_FOUND)

    def getGroup(self,id):
        try:
            return Group.objects.get(id=id)
        except Group.DoesNotExist:
            return Response(status = status.HTTP_404_NOT_FOUND)

    def get(self,request,id):
        proposal = self.getObject(id)
        serializer = getProposalSerializer(proposal)
        return Response(serializer.data)

    def put(self,request,id):
        proposal = self.getObject(id)
        group = self.getGroup(id)
        neww = {"proposal":request.data['progress']}
        serializerGroup = manageGroupProposal(group,data=neww)
        serializer = updateProposalSerializer(proposal, data= request.data)
        if serializer.is_valid() and serializerGroup.is_valid():
            serializer.save()
            serializerGroup.save()
            return Response({'msg': "yes" })
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)

class resendProposal(APIView):
    permission_classes = [AllowAny]

    def getObject(self,id):
        try:
            return Proposals.objects.get(groupid_id=id)
        except Proposals.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
    def put(self,request,id):
        proposal = self.getObject(id)
        serializer = updateProposalSerializer(proposal, data= request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CreateProposal(APIView):
    permission_classes = [AllowAny]

    def post(self,request,format='json'):
        serializer = createProposalSerializer(data=request.data)
        if serializer.is_valid():
            group = serializer.save()
            if group:
                json = serializer.data
                return Response(json, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CreateGroup(APIView):
    permission_classes = []

    def post(self,request,format='json'):
        userids = {"id":request.data['owner']}
        userid= userids['id']
        serializer = createGroupSerializer(data=request.data)
        if serializer.is_valid():
            group = serializer.save()
            Requests.objects.filter(userid=userid).delete()
            if group:


                json = serializer.data
                return Response(json, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class deleteGroup(APIView):
    permission_classes = [AllowAny]

    def getGroup(self,id):
        try:
            return Group.objects.get(id=id)
        except Group.DoesNotExist:
            return Response(status = status.HTTP_404_NOT_FOUND)

    def delete(self, request, id):
        group = self.getGroup(id)


        queryset = NewUser.objects.filter(is_in=id)


        if queryset.exists():
            for member in queryset:
                    data = member
                    data.role=""
                    data.is_in=""
                    data.save(update_fields=['role','is_in'])
            # return Response({'msg': "success" }, status=status.HTTP_200_OK)
            group.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class ManageGroup(APIView):
    permission_classes = [AllowAny]
    def getObject(self,id):
        try:
            return Group.objects.get(id=id)
        except Group.DoesNotExist:
            return Response(status = status.HTTP_404_NOT_FOUND)

    def get(self,request,id):
        group = self.getObject(id)
        serializer = GroupSerializer(group)
        return Response(serializer.data)

    def put(self,request,id):
        group = self.getObject(id=id)
        serializer = manageGroupSerializer(group, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)


class GetAllGroup(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        groups = Group.objects.all()
        # the many param informs the serializer that it will be serializing more than a single article.
        serializer = getGroupSerializer(groups, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)
    # return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class GetByCondition(generics.ListAPIView):
    permission_classes = [AllowAny]
    queryset = Requests.objects.all()
    serializer_class = RequestSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['status','groupname']

class getAllRequest(APIView):
    permission_classes = [AllowAny]
    def get(self, request):
            state = Requests.objects.all()
            serializer = RequestSerializer(state, many=True)
            return Response (serializer.data)

    def __pos__(self):
        pass
    # queryset = Requests.objects.all()
    # serializer_class = RequestSerializer
    # filter_fields = ('status')
# class GetByCondition(generics.ListCreateAPIView):
#     permission_classes = [AllowAny]

#     search_fields = ['groupname_id']
#     filter_backends = (filters.SearchFilter,)
#     queryset = Requests.objects.all()
#     serializer_class = RequestSerializer



class GetByCreator(APIView):
    permission_classes = [AllowAny]

    def getObject(self,owner):
        try:
            return Group.objects.get(owner=owner)
        except Group.DoesNotExist:
            return Response(status = status.HTTP_404_NOT_FOUND)

    def get(self,request, owner):
        group = self.getObject(owner)
        serializer = getGroupByCreatorSerializer(group)
        if group:
            return Response(serializer.data,status = status.HTTP_200_OK)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

class GetByGroup(APIView):
    permission_classes = [AllowAny]

    def getObject(self,id):
        try:
            return Group.objects.get(id=id)
        except Group.DoesNotExist:
            return Response(status = status.HTTP_404_NOT_FOUND)

    def get(self,request, id):
        group = self.getObject(id)
        serializer = getGroupByIdSerializer(group)
        if group:
            return Response(serializer.data,status = status.HTTP_200_OK)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

class updateProposal(APIView):
    permission_classes=[AllowAny]

    def getObject(self,id):
        try:
            return Group.objects.get(id=id)
        except Group.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def put(self,request,id):
        group=self.getObject(id=id)
        serializer=setProposal(group,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

class CreateRequest(APIView):
    permission_classes = [AllowAny]

    def post(self,request,format='json'):
        serializer = createRequestSerializer(data=request.data)
        if serializer.is_valid():
            group = serializer.save()
            if group:
                json = serializer.data
                return Response(json, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ManageRequest(APIView):
    permission_classes=[AllowAny]
    def getObject(self,userid):
        try:
            return Requests.objects.get(userid=userid)
        except Requests.DoesNotExist:
            return Response(status = status.HTTP_404_NOT_FOUND)

    def delete(self,request,userid):
            requests = self.getObject(userid=userid)
            requests.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)

class SetMember(APIView):
    permission_classes=[AllowAny]
    def getObject(self,id):
        try:
            return Group.objects.get(id=id)
        except Group.DoesNotExist:
            return Response(status = status.HTTP_404_NOT_FOUND)
    def get(self,request, id):
            group = self.getObject(id)
            serializer = setMemberSerializer(group)
            return Response(serializer.data)
    def put(self,request,id):
        group = self.getObject(id=id)
        serializer = setMemberSerializer(group, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response (serializer.errors, status = status.HTTP_400_BAD_REQUEST)


class CreateApplication(APIView):
    permission_classes = [AllowAny]
    def getObject(self,id):
        try:
            return Group.objects.get(id=id)
        except Group.DoesNotExist:
            return Response(status = status.HTTP_404_NOT_FOUND)

    def get(self,request, id):
        group = self.getObject(id)
        serializer = applicationSerializer(group)
        return Response(serializer.data)

    def put(self,request,id):
        group = self.getObject(id=id)
        serializer = applicationSerializer(group, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response (serializer.errors, status = status.HTTP_400_BAD_REQUEST)

class setStatusRequests(APIView):
    permission_classes=[AllowAny]

    def getObject(self,userid):
        try:
            return Requests.objects.filter(userid=userid)
        except Requests.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def put(self,request,userid):
        req = self.getObject(userid=userid)
        serializer = updateStatusSerializer(req, data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response (serializer.errors, status = status.HTTP_400_BAD_REQUEST)

class setAccepted(APIView):
    permission_classes = [AllowAny]

    def post(self,request,format='json'):
        serializer = createAcceptedSerializer(data=request.data)
        if serializer.is_valid():
            group = serializer.save()
            if group:
                json = serializer.data
                return Response(json, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
# class GetRequests(APIView):
#     permission_classes = [AllowAny]
#     def getObject(self,id):
#         try:
#             return Group.objects.get(id=id)
#         except Group.DoesNotExist:
#             return Response(status = status.HTTP_404_NOT_FOUND)

#     def get(self,request, id):
#         group = self.getObject(id)
#         serializer = RequestsSerializer(group)
#         return Response(serializer.data)

class GetRequests(APIView):
    permission_classes = [AllowAny]
    def get(self, request, format=None):
        album = Group.objects.all()
        serializer = GroupsSerializer(album, many=True)
        return Response(serializer.data)

class GetFK(APIView):
    permission_classes = [AllowAny]

    def getObject(self,id):
        try:
            return Group.objects.get(id=id)
        except Group.DoesNotExist:
            return Response(status = status.HTTP_404_NOT_FOUND)

    def get(self, request, id):
        group = self.getObject(id)
        serializer = GroupsSerializer(group)
        return Response(serializer.data)

# class ManageRequests(APIView):
#     permission_classes = [AllowAny]
#     def get(self,request,id):
# Create your views here.
class updateStatus(APIView):
    permission_classes = [AllowAny]
    serializer_class = UpdateRequestSerializer

    def patch(self, request, format=None):
        serializer = self.serializer_class(data=request.data)


        if serializer.is_valid():
            statuss = serializer.data.get('status')
            userid = serializer.data.get('userid')
            groupid = serializer.data.get('groupname_id')
            confirmed = serializer.data.get('confirmed')

            queryset = Requests.objects.filter(userid=userid).filter(groupname_id=groupid)
            if not queryset.exists():
                return Response({'msg': serializer.data }, status=status.HTTP_404_NOT_FOUND)

            data = queryset[0]
            data.status=statuss
            data.confirmed = confirmed
            data.save(update_fields=['status','confirmed'])
            return Response(UpdateRequestSerializer(data).data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class confirmStatus(APIView):
    permission_classes = [AllowAny]
    serializer_class = ConfirmRequestSerializer

    def put(self,request, format=None):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            confirmed = serializer.data.get('confirmed')
            userid = serializer.data.get('userid')
            groupid = serializer.data.get('groupname_id')

            queryset = Requests.objects.filter(userid=userid).exclude(groupname_id=groupid)
            if queryset.exists():
                data = queryset[0]
                data.confirmed=confirmed
                data.save(update_fields=['confirmed'])
                return Response(ConfirmRequestSerializer(data).data, status=status.HTTP_200_OK)

            return Response({'msg': "queryset not found" })
        return Response({'msg': "error" }, status=status.HTTP_400_BAD_REQUEST)

class manageConfirmStatus(APIView):
    permission_classes = [AllowAny]
    serializer_class = AcceptConfirmRequestSerializer

    def put(self,request, format=None):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            confirmed = serializer.data.get('confirmed')
            userid = serializer.data.get('userid')
            groupid = serializer.data.get('groupname_id')

            queryset = Requests.objects.filter(userid=userid).filter(groupname_id=groupid)
            if queryset.exists():
                data = queryset[0]
                data.confirmed=confirmed
                data.save(update_fields=['confirmed'])
                return Response(AcceptConfirmRequestSerializer(data).data, status=status.HTTP_200_OK)

            # return Response({'msg': serializer.data }, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class getOwnRequest(APIView):
    permission_classes = [AllowAny]
    serializer_class = getOwnRequestsSerializer

    def getObject(self,userid):
        try:
            return Requests.objects.filter(userid=userid)
        except Requests.DoesNotExist:
            return Response(status = status.HTTP_404_NOT_FOUND)

    def get(self, request, userid):
        group = self.getObject(userid)
        serializer = getOwnRequestsSerializer(group, many=True)
        return Response(serializer.data)
#  {
#  "userid":50,
# "groupname_id":39,
#  "status":"poop"
#  }

#  {
#  "groupname":44,
#  "status":"poop"
#  }