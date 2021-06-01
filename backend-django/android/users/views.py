from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import status
from rest_framework import serializers
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import CustomUserSerializer, UserSerializer, EditUserSerializer,SetApplicationSerializer,SpecificUserSerializer,LikedSerializer,ChangePasswordSerializer,RandomizeSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny,IsAuthenticated
from rest_framework import generics, permissions
from django.contrib.auth import authenticate
from users.models import NewUser
from group.models import Group
from group.serializers import *
import requests
import random
base_url = "http://192.168.100.246:8000/api/"

class checkToken(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self,request):
        return Response({'msg':'Valid'}, status=status.HTTP_200_OK)

class ChangePassword(generics.UpdateAPIView):

    queryset = NewUser.objects.all()
    permission_classes = (IsAuthenticated,)
    serializer_class = ChangePasswordSerializer

class CustomUserCreate(APIView):
    permission_classes = [AllowAny]

    def post(self, request, format='json'):
        serializer = CustomUserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                json = serializer.data
                return Response(json, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class GetUser(APIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = UserSerializer
    def get(self, request):
        serializer = self.serializer_class(request.user)

        content = {'message': 'Hello, World!'}
        return Response(serializer.data, status=status.HTTP_200_OK)

class SetLiked(APIView):
    permission_classes = [IsAuthenticated]

    def put(self,request):
        user=NewUser.objects.get(id=request.user.id)
        serializer = LikedSerializer(user,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class EditUser(APIView):
    permission_classes = (IsAuthenticated,)
    def put(self,request):
#         articles = self.getObject(id=id)
        user = NewUser.objects.get(id=request.user.id)
        serializer = EditUserSerializer(user, data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)

# class SetGroup(APIView):
#     permission_classes = [AllowAny]

#     def getObject(self,id):

#         try:
#             return NewUser.objects.get(id=id)
#         except NewUser.DoesNotExist:
#             return Response(status = status.HTTP_404_NOT_FOUND)

#     def put(self,request,id):
#             group = self.getObject(id=id)
#             serializer = setGroupSerializer(group, data = request.data)
#             if serializer.is_valid():
#                 serializer.save()
#                 return Response(serializer.data)
#             return Response (serializer.errors, status = status.HTTP_400_BAD_REQUEST)

class EditSpecificUser(APIView):
    permission_classes = (AllowAny,)
    def getObject(self,id):
        try:
            return NewUser.objects.get(id=id)
        except NewUser.DoesNotExist:
            return Response(status = status.HTTP_404_NOT_FOUND)

    def put(self,request,id):
        group = self.getObject(id=id)
        serializer = SpecificUserSerializer(group, data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response (serializer.errors, status = status.HTTP_400_BAD_REQUEST)

class SetApplication(APIView):
    permission_classes = (AllowAny,)

    def getObject(self,id):
        try:
            return NewUser.objects.get(id=id)
        except NewUser.DoesNotExist:
            return Response(status = status.HTTP_404_NOT_FOUND)

    def get(self,request, id):
        group = self.getObject(id)
        serializer = SetApplicationSerializer(group)
        return Response(serializer.data)

    def put(self,request,id):
        group = self.getObject(id=id)
        serializer = SetApplicationSerializer(group, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response (serializer.errors, status = status.HTTP_400_BAD_REQUEST)

class getSpecificUser(APIView):
    permission_classes = (AllowAny,)

    def getObject(self,id):
        try:
            return NewUser.objects.get(id=id)
        except NewUser.DoesNotExist:
            return Response(status = status.HTTP_404_NOT_FOUND)
    
    def get(self,request, id):
        group = self.getObject(id)
        serializer = UserSerializer(group)
        return Response(serializer.data)


class BlacklistTokenUpdateView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = ()

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)


#             # Get User API
class UserAPI(generics.RetrieveAPIView):
  permission_classes = [
    permissions.IsAuthenticated,
  ]
  serializer_class = UserSerializer

  def get_object(self):
    return self.request.user

class Randomize(APIView):
    permission_classes = [AllowAny]


    def get(self, request):
        groupcounter=0
        users = NewUser.objects.filter(is_in="").filter(isTeacher=False)
        remainingGroupList={}
        grouplist = {}
        userlist = []
        testt =[]
        groups = Group.objects.filter(len__lt= 3)
        groupsgt = Group.objects.filter(len__gt=2).filter(len__lt=6)
        proceed = False
       
    # delete groups with length less than 3
        if groups.exists():
            for group in groups:
                r = requests.delete(base_url+"group/deletegroup/"+str(group.id))
        
    # add users not in a group to a dictionary 
        if users.exists():
            for user in users:
                userlist.append(user.id)
    #
        if groupsgt.exists():
            for group in groupsgt:
                grouplist[group.id] = group.len 
                
            for x, y in grouplist.items():
                length = y
                while length!=5:
                    if len(userlist)>0:

                        userid = userlist[random.randrange(0, len(userlist))]
                        getuser = requests.get(base_url+"user/getspecificuser/"+str(userid))
                        userjson = {"id":getuser.json()['id'],"firstName":getuser.json()['first_name']}
                        getgroup = requests.get(base_url+"group/getgroup/"+str(x))
                        groupmembers = getgroup.json()['member']
                        groupmembers.append(userjson)
                        

                        updateData = {"member": groupmembers, "len": len(groupmembers)}
                        updateUserData = {"role":"member", "is_in":str(x),"applied":[]}
                        # print(str(userid))
                        
                        updategroup = requests.put(base_url+"group/member/"+str(x),json = updateData)
                        updateuser = requests.put(base_url+"user/specificuser/"+str(userid),json = updateUserData)
                        userlist.remove(userid)
                
                        grouplist[x] = length+1
                        
                    
        
                        length += 1
                    else:
                        break
            proceed = True
            
        
        if proceed:
            remainingGroups = Group.objects.filter(len__lt= 8)
        
            if remainingGroups.exists():
                for groups in remainingGroups:
                    remainingGroupList[groups.id] = groups.len 

                for x, y in remainingGroupList.items():
                    length = y
                    while length!=7:
                        if len(userlist)>0:

                            userid = userlist[random.randrange(0, len(userlist) )]
                            getuser = requests.get(base_url+"user/getspecificuser/"+str(userid))
                            userjson = {"id":getuser.json()['id'],"firstName":getuser.json()['first_name']}
                            getgroup = requests.get(base_url+"group/getgroup/"+str(x))
                            groupmembers = getgroup.json()['member']
                            groupmembers.append(userjson)
                            

                            updateData = {"member": groupmembers, "len": len(groupmembers)}
                            updateUserData = {"role":"member", "is_in":str(x),"applied":[]}
                            # print(str(userid))
                            
                            updategroup = requests.put(base_url+"group/member/"+str(x),json = updateData)
                            updateuser = requests.put(base_url+"user/specificuser/"+str(userid),json = updateUserData)
                            userlist.remove(userid)
                    
                            remainingGroupList[x] = length+1
                            
                        
            
                            length += 1
                        else:
                            break
                
        counter = 0
        while len(userlist) > 1 :
            counter+=1
            # userid = userlist[random.randrange(0, len(userlist)-1)]
            # getuser = requests.get(base_url+"user/getspecificuser/"+str(userid))
            # userjson = {"id":getuser.json()['id'],"firstName":getuser.json()['first_name']}
            # getgroup = requests.get("http://192.168.100.246:8000/api/group/getgroup/"+str(x))
            print(str(len(userlist)) +"initial")
            if len(userlist)>4:
                groupmembers = []
                while len(groupmembers) <5:
                    if len(userlist)>0:

                        userid = userlist[random.randrange(0, len(userlist))]
                        getuser = requests.get(base_url+"user/getspecificuser/"+str(userid))
                        userjson = {"id":getuser.json()['id'],"firstName":getuser.json()['first_name']}
                        groupmembers.append(userjson)
                        # updateUserData = {"role":"member", "is_in":str(x),"applied":[]}

                        userlist.remove(getuser.json()['id'])
                    else:
                        break
                groupcounter+=1
                createData = {
                        "name":"Random Group "+ str(groupcounter),
                        "description":"Random Group "+str(groupcounter),
                        "owner":groupmembers[random.randrange(0, len(groupmembers))]["id"],
                        "member":groupmembers,
                        "requirements":"Random Group "+str(groupcounter),
                        "topic":"Random Group "+str(groupcounter),
                        "tags":[],
                        "len":len(groupmembers)
                    }    

                

                # print(str(len(userlist)) +"final")
                # print(createData)
                # return Response({"msg": createData})

                createGroup = requests.post(base_url+"group/create/",json=createData)
                for x in groupmembers:
                    groupowner = createGroup.json()['owner']
                    if str(x['id']) == groupowner:
                        updateUserData={"role":"gm", "is_in":str(createGroup.json()['id']),"applied":[]}
                    else:
                        updateUserData = {"role":"member", "is_in":str(createGroup.json()['id']),"applied":[]}
                    updateuser = requests.put(base_url+"user/specificuser/"+str(x['id']),json = updateUserData)


                # createGroup = requests.get("http://127.0.0.1:8000/api/user/getspecificuser/124")
                # print(createGroup.json())
                # print(createData)
                # return Response({"msg":groupmembers})

            else:
                remainingGroups = Group.objects.filter(len__lt= 8)
        
                if remainingGroups.exists():
                    for groups in remainingGroups:
                        remainingGroupList[groups.id] = groups.len 

                    for x, y in remainingGroupList.items():
                        length = y
                        while length!=7:
                            if len(userlist)>0:
                                userid = userlist[random.randrange(0, len(userlist) )]
                                getuser = requests.get(base_url+"user/getspecificuser/"+str(userid))
                                userjson = {"id":getuser.json()['id'],"firstName":getuser.json()['first_name']}
                                getgroup = requests.get(base_url+"group/getgroup/"+str(x))
                                groupmembers = getgroup.json()['member']
                                groupmembers.append(userjson)
                                

                                updateData = {"member": groupmembers, "len": len(groupmembers)}
                                updateUserData = {"role":"member", "is_in":str(x),"applied":[]}
                                # print(str(userid))
                                
                                updategroup = requests.put(base_url+"group/member/"+str(x),json = updateData)
                                updateuser = requests.put(base_url+"user/specificuser/"+str(userid),json = updateUserData)
                                userlist.remove(userid)
                        
                                remainingGroupList[x] = length+1
                                
                            
                
                                length += 1
                            else:
                                break


        # the many param informs the serializer that it will be serializing more than a single article.
        serializer = RandomizeSerializer(users, many=True)
        groupserializer = groupRandomizerSerializer(groupsgt,many=True)
        return Response({"msg": "success"})

        # return Response(groupserializer.data)
        # return Response(r.json())
        # return Response(groups.data, status=status.HTTP_200_OK)