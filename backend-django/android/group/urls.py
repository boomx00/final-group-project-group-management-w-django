from django.urls import path
from .views import *
from group import views
app_name='group'

urlpatterns = [
    path('create/', CreateGroup.as_view(), name="create_group"),
    path('manage/<int:id>', ManageGroup.as_view(), name="manage_group"),
    path('getall/', GetAllGroup.as_view(), name="get_group"),
    path('application/<int:id>', CreateApplication.as_view(), name="create_application"),
    path('member/<int:id>', SetMember.as_view(), name="create_application"),

    path('bycreator/<int:owner>', GetByCreator.as_view(), name="get_bycreator"),
    path('getgroup/<int:id>', GetByGroup.as_view(), name="get_group"),
    path('createrequest/', CreateRequest.as_view(), name="create_request"),
    path('getrequest/', GetRequests.as_view(), name="get_request"),
    path('setaccepted/', setAccepted.as_view(), name="set_Accepted"),
    path('setstatus/<int:userid>', setStatusRequests.as_view(), name="set_status"),
    path('getownrequest/<int:userid>', getOwnRequest.as_view(), name="get_ownrequest"),
    path('setconfirm/',confirmStatus.as_view(), name="set_confirm"),
    path('manageconfirm/',manageConfirmStatus.as_view(), name="accept_confirm"),
    # path('getfk/',GetFK.as_view(),name="testfk"),
    path('testgetreq/<int:id>',GetFK.as_view(),name="testfk"),
    path('managereq/<int:userid>',ManageRequest.as_view(),name="managereq"),
    path('getcondition/', views.GetByCondition.as_view()),
    path('updatestatus/', updateStatus.as_view()),
    path('createproposal/',CreateProposal.as_view(),name="create_proposal"),
    path('setproposal/<int:id>',updateProposal.as_view(),name="set_proposal"),
    path('getspecificproposal/<int:id>',getProposal.as_view(),name="get_proposal"),
    path('getproposal/',GetAllProposal.as_view(),name="get_allproposal"),
    path('updateproposal/<int:id>',getProposal.as_view(),name="get_allproposal"),
    path('getrequestss/',getAllRequest.as_view(),name="req"),
    path('resendproposal/<int:id>',resendProposal.as_view(),name="resendproposal"),
    path('managerecruitment/<int:id>',manageRecruitment.as_view(),name="manage_recruitment"),
    path('removeuser/<int:id>',removeUser.as_view(),name="remove_user"),
    path('deletegroup/<int:id>',deleteGroup.as_view(),name="delete_group"),



]