from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager

# Create your models here.
# class submitGroupApplication():
#     def create_group (self, name, description):
#         groups = self.model(name = name,
#                             description = description)
#         groups.save()    
#         return groups

class newGroup(models.Model):
    name = models.CharField(max_length=150, unique=True, default = "")
    description = models.TextField(max_length=200, blank=True, null=True)   
    members = models.IntegerField(null = True, default = 0)
    owner = models.CharField(max_length=150, unique=True, default = "")
    name_field = 'Group Name'
    desc_field = 'Group description'
    
      