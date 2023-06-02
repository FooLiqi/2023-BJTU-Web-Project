from django.db import models

# Create your models here.

class Test(models.Model): # 数据库表名 Test
    name = models.CharField(max_length = 20) # CharField = varchar

class Student(models.Model):
    Sno = models.IntegerField();
    Sname = models.CharField(max_length = 20)
    
