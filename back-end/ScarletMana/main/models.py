from django.db import models
from django.conf import settings
from django.db.models.base import ModelState

import time
import random

from .constants import *

# Create your models here.

class Player(models.Model):
    # ===== Property =====
    ID = models.AutoField(primary_key=True)

    username = models.CharField(max_length=20, unique=True)
    password = models.CharField(max_length=20)

    title = models.CharField(max_length=20)
    motto = models.CharField(max_length=50)

    mana = models.IntegerField(default=0)
    coin = models.IntegerField(default=0)
    mineral = models.IntegerField(default=0)

    resource_refresh_count_max = models.IntegerField(default=10)
    resource_refresh_count = models.IntegerField(default=0)

    @property
    def dwarf(self):
        return Dwarf.objects.filter(player=self).count()

    @property
    def miner(self):
        return Dwarf.objects.filter(player=self, job=DWARF_JOB_MINER).count()
    
    @property
    def merchant(self):
        return Dwarf.objects.filter(player=self, job=DWARF_JOB_MERCHANT).count()
    
    @property
    def soldier(self):
        return Dwarf.objects.filter(player=self, job=DWARF_JOB_SOLDIER).count()

    # ===== Methods =====
    def __str__(self):
        return self.username

    # 刷新资源(不储存)
    def refresh_resource(self):
        if self.resource_refresh_count > 0:
            self.resource_refresh_count -= 1
            return
        self.resource_refresh_count = self.resource_refresh_count_max
        self.coin += 1
    
class DwarfFirstname(models.Model):
    ID = models.AutoField(primary_key=True)
    firstname = models.CharField(max_length=20, unique=True)

    def __str__(self):
        return self.firstname

class DwarfSecondname(models.Model):
    ID = models.AutoField(primary_key=True)
    secondname = models.CharField(max_length=20, unique=True)

    def __str__(self):
        return self.secondname

class Dwarf(models.Model):
    ID = models.AutoField(primary_key=True)

    # 在使用以下两个外键时，请将类型转换为str再输出
    # 例：str(firstname)
    firstname = models.ForeignKey("DwarfFirstname", on_delete=models.PROTECT)
    secondname = models.ForeignKey("DwarfSecondname", on_delete=models.PROTECT)
    sex = models.BooleanField(default=0) # 0 male; 1 female

    strength = models.IntegerField() # measuring physical power
    dexterity = models.IntegerField() # measuring agility
    constitution = models.IntegerField() # measuring endurance
    intelligence = models.IntegerField() # measuring reasoning and memory
    wisdom = models.IntegerField() # measuring perception and insight
    charisma = models.IntegerField() # measuring force of personality

    player = models.ForeignKey("Player", on_delete=models.PROTECT)
    job = models.IntegerField(default=DWARF_JOB_IDLE)

    def __str__(self):
        return str(self.firstname) + " " + str(self.secondname) + " employed by " + str(self.player)

    @staticmethod
    def Create(player: Player):
        # 设置毫秒种子
        random.seed(time.perf_counter())
        # print(time.perf_counter())

        if DwarfFirstname.objects.count() == 0:
            return None
        if DwarfSecondname.objects.count() == 0:
            return None
        firstnameID = random.randint(1, DwarfFirstname.objects.count())
        secondnameID = random.randint(1, DwarfSecondname.objects.count())

        # print(firstnameID, ", ", secondnameID)

        dwarf = Dwarf(
            firstname=DwarfFirstname.objects.get(ID=firstnameID),
            secondname=DwarfSecondname.objects.get(ID=secondnameID),
            sex = int(random.randint(0, 1)),
            
            strength=random.randint(5, 15),
            dexterity=random.randint(5, 15),
            constitution=random.randint(5, 15),
            intelligence=random.randint(5, 15),
            wisdom=random.randint(5, 15),
            charisma=random.randint(5, 15),

            player=player
        )

        return dwarf
