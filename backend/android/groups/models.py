from django.db import models

# Create your models here.
class submitGroupApplication():
    def create_group (self, name, description):
        groups = self.model(name = name,
                            description = description)
        groups.save()    
        return groups

class newGroup():
    name = models.CharField(max_length=150, unique=True)
    description = models.TextField(max_length=200, blank=True, null=True)               
    name_field = 'Group Name'
    
      