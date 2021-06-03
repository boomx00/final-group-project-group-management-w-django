from django.urls import path
from .views import *
from group import views
app_name='group'

urlpatterns = [
    # create group
    path('create/', CreateGroup.as_view(), name="create_group"),

    # edit group data 
    path('manage/<int:id>', ManageGroup.as_view(), name="manage_group"),

    # get all existing groups
    path('getall/', GetAllGroup.as_view(), name="get_group"),

    # get/update applications to a group
    path('application/<int:id>', CreateApplication.as_view(), name="create_application"),

    # get/update member to a group
    path('member/<int:id>', SetMember.as_view(), name="create_application"),
    
    # get group details by the owner
    path('bycreator/<int:owner>', GetByCreator.as_view(), name="get_bycreator"),
    
    # get group details by the id
    path('getgroup/<int:id>', GetByGroup.as_view(), name="get_group"),

    #create a request
    path('createrequest/', CreateRequest.as_view(), name="create_request"),

    # get all requests
    path('getrequest/', GetRequests.as_view(), name="get_request"),

    # update a request of a user into accepted
    path('setaccepted/', setAccepted.as_view(), name="set_Accepted"),

    #get requests of that group
    path('getownrequest/<int:userid>', getOwnRequest.as_view(), name="get_ownrequest"),

    #set a status to confirm in requests
    path('setconfirm/',confirmStatus.as_view(), name="set_confirm"),

    # confirm joining a group, change users group state
    path('manageconfirm/',manageConfirmStatus.as_view(), name="accept_confirm"),
    # path('getfk/',GetFK.as_view(),name="testfk"),

    # get group join requests based on groupid
    path('getcondition/', views.GetByCondition.as_view()),

    # update status of requests
    path('updatestatus/', updateStatus.as_view()),

    # send a group proposal
    path('createproposal/',CreateProposal.as_view(),name="create_proposal"),

    # update a proposal data
    path('setproposal/<int:id>',updateProposal.as_view(),name="set_proposal"),

    # get specific proposal by groupid
    path('getspecificproposal/<int:id>',getProposal.as_view(),name="get_proposal"),

    # get all group proposals
    path('getproposal/',GetAllProposal.as_view(),name="get_allproposal"),

    # update a group proposal by group id
    path('updateproposal/<int:id>',getProposal.as_view(),name="get_allproposal"),

    # resend proposal for a group if rejected
    path('resendproposal/<int:id>',resendProposal.as_view(),name="resendproposal"),

    # remove a user
    path('removeuser/<int:id>',removeUser.as_view(),name="remove_user"),
    
    # delete group
    path('deletegroup/<int:id>',deleteGroup.as_view(),name="delete_group"),

    path('setstatus/<int:userid>', setStatusRequests.as_view(), name="set_status"),
    path('testgetreq/<int:id>',GetFK.as_view(),name="testfk"),
    path('managereq/<int:userid>',ManageRequest.as_view(),name="managereq"),
    path('managerecruitment/<int:id>',manageRecruitment.as_view(),name="manage_recruitment"),
    path('getrequestss/',getAllRequest.as_view(),name="req"),

]
