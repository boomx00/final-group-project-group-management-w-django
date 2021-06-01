from django.db import models
from users.models import *

# Create your models here.
class Group(models.Model):
    name = models.CharField(max_length=100, unique=True)
    topic = models.CharField(max_length=100,blank=True)
    description = models.CharField(max_length=250,blank=True)
    owner = models.CharField(max_length=100, unique=True)
    requirements = models.CharField(max_length=100,blank=True)
    member = models.JSONField(blank=True, default=list)
    len = models.IntegerField(default=0)
    applications = models.JSONField(null=True)
    likes = models.JSONField(null=True)
    tags = models.JSONField(null=True)
    proposal = models.CharField(max_length=50, default="tbd")
    recruitment = models.CharField(max_length=20, default="open")
    def __str__(self):
        return self.name

class Requests(models.Model):
    groupname = models.ForeignKey(Group,related_name='requests', on_delete=models.CASCADE)
    userid = models.IntegerField(blank=True)
    userids = models.ForeignKey(NewUser,related_name='users', on_delete=models.CASCADE,db_column='userids',default=44)
    firstName = models.CharField(max_length=100,blank=True)
    lastName = models.CharField(max_length=100,blank=True)
    status = models.CharField(max_length=100,default="tbd")
    confirmed = models.CharField(max_length=100,default="tbd")
    class Meta:
        unique_together = ['groupname','userid']

    def __str__(self):
        return 'id: %s,name:%s' % ('name:', self.firstName)
        # return '[%s,%s]' % ('member', self.userid)

class Accepted(models.Model):
    groupname = models.ForeignKey(Group,related_name='accepted', on_delete=models.CASCADE)
    userid = models.IntegerField(blank=True)
    firstName = models.CharField(max_length=100,blank=True)
    lastName = models.CharField(max_length=100,blank=True)

    class Meta:
        unique_together = ['groupname','userid']

    def __str__(self):
        return 'id: %s,name:%s' % (self.userid, self.firstName)
        # return '[%s,%s]' % ('member', self.userid)


class Proposals(models.Model):
    groupid=models.ForeignKey(Group,related_name='proposals',on_delete=models.CASCADE)
    progress = models.CharField(max_length=50,blank=True)
    feedback = models.CharField(max_length=250,blank=True)