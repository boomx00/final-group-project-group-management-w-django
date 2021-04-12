from django.db import models

# Create your models here.
class Group(models.Model):
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=250)
    owner = models.CharField(max_length=100, unique=True)
    member = models.IntegerField(blank=True, default=1)