from django.db import models
from django.conf import settings
from django.db.models.base import ModelState

# Create your models here.

class User(models.Model):
    ID = models.AutoField(primary_key = True)

    username = models.CharField(max_length = 20, unique = True)
    password = models.CharField(max_length = 20)

    title = models.CharField(max_length = 20)
    motto = models.CharField(max_length = 50)

    mana = models.IntegerField(default = 0)
    coin = models.IntegerField(default = 0)
    mineral = models.IntegerField(default = 0)
    dwarf = models.IntegerField(default = 0)


