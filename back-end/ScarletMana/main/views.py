from django.http import HttpResponse

import json

from .tools import Tools
from .models import *
from .constants import *

# ===== Dwarf =====
# 雇佣矮人
def employ(request):
    # verify token
    state, someObject = Tools.verifyToken(request=request)
    if state:
        player = someObject
    else:
        return someObject
    
    # dwarf
    dwarf = player.employ_dwarf()

    # result
    with dwarf.lock:
        result = {
            "state": "success",
            "firstname": str(dwarf.firstname),
            "secondname": str(dwarf.secondname),
            "sex": dwarf.sex,
            "strength": dwarf.strength,
            "dexterity": dwarf.dexterity,
            "constitution": dwarf.constitution,
            "intelligence": dwarf.intelligence,
            "wisdom": dwarf.wisdom,
            "charisma": dwarf.charisma,
        }
        result["message"] = MESSAGE_EMPLOY_DWARF
        result["message"][0] = result["message"][0].format(
            firstname = str(dwarf.firstname),
            secondname = str(dwarf.secondname),
            sex = "男性" if dwarf.sex == 0 else "女性",
            ta = "他" if dwarf.sex == 0 else "她",
            strength = dwarf.strength,
            dexterity = dwarf.dexterity,
            constitution = dwarf.constitution,
            intelligence = dwarf.intelligence,
            wisdom = dwarf.wisdom,
            charisma = dwarf.charisma,
        )

    return Tools.toResponse(result, 200)

# 增加矿工
def addMiner(request):
    state, someObject = Tools.verifyToken(request=request)
    if state:
        player = someObject
    else:
        return someObject
    
    return modifyDwarfJob(player=player, origin=DWARF_JOB_IDLE, target=DWARF_JOB_MINER)

# 减少矿工
def subtractMiner(request):
    state, someObject = Tools.verifyToken(request=request)
    if state:
        player = someObject
    else:
        return someObject
    
    return modifyDwarfJob(player=player, origin=DWARF_JOB_MINER, target=DWARF_JOB_IDLE)

# 增加商人
def addMerchant(request):
    state, someObject = Tools.verifyToken(request=request)
    if state:
        player = someObject
    else:
        return someObject
    
    return modifyDwarfJob(player=player, origin=DWARF_JOB_IDLE, target=DWARF_JOB_MERCHANT)

# 减少商人
def subtractMerchant(request):
    state, someObject = Tools.verifyToken(request=request)
    if state:
        player = someObject
    else:
        return someObject
    
    return modifyDwarfJob(player=player, origin=DWARF_JOB_MERCHANT, target=DWARF_JOB_IDLE)

# 增加佣兵
def addSoldier(request):
    state, someObject = Tools.verifyToken(request=request)
    if state:
        player = someObject
    else:
        return someObject
    
    return modifyDwarfJob(player=player, origin=DWARF_JOB_IDLE, target=DWARF_JOB_SOLDIER)

# 减少佣兵
def subtractSoldier(request):
    state, someObject = Tools.verifyToken(request=request)
    if state:
        player = someObject
    else:
        return someObject
    
    return modifyDwarfJob(player=player, origin=DWARF_JOB_SOLDIER, target=DWARF_JOB_IDLE)

# 修改矮人职业
# @param player 矮人所属玩家
# @param origin 矮人原职业
# @param target 矮人目标职业
# @return 结果Response
def modifyDwarfJob(player, origin, target):
    valid_dwarfs = Dwarf.objects.filter(player=player, job=origin)
    if valid_dwarfs.count() == 0:
        return Tools.toErrorResponse("Origin job dwarf isn't enough.")
    else:
        result = {"state": "success"}
        result["message"] = MESSAGE_MODIFY_DWARF_JOB
        dwarf = valid_dwarfs.first()
        with dwarf.lock:
            dwarf.job = target # TODO 
            dwarf.save()
            result["message"][0] = result["message"][0].format(
                firstname = str(dwarf.firstname),
                secondname = str(dwarf.secondname),
                newjob = DWARF_JOB_REFLECTION[target]
            )
        return Tools.toResponse(result, 200)

# ===== Resource =====
def resource(request):
    # verify token
    state, someObject = Tools.verifyToken(request=request)
    if state:
        user = someObject
    else:
        return someObject
    # get resource
    result = {}

    with user.lock:
        result['state'] = 'success'
        result['mana'] = user.mana
        result['coin'] = user.coin
        result['mineral'] = user.mineral

        result['dwarf'] = user.dwarf
        result['miner'] = user.miner
        result['merchant'] = user.merchant
        result['soldier'] = user.soldier

    return Tools.toResponse(result, 200)

# ===== Account =====
def login(request):
    return sign(request=request, auto_create_account=False)

def register(request):
    return sign(request=request, auto_create_account=True)

def sign(request, auto_create_account: bool):
    result = {}
    if request.method != 'POST':
        return Tools.toErrorResponse('Request method is not POST.')
    
    data = json.loads(request.body)

    if 'username' not in data or data['username'] is None:
        return Tools.toErrorResponse('Username is none.')
    username = data['username']

    if 'password' not in data or data['password'] is None:
        return Tools.toErrorResponse('Password is none.')
    password = data['password']

    users = Player.objects.filter(username=username)

    if users.count() == 0:
        if auto_create_account == False:
            return Tools.toErrorResponse('Username doesn\'t exist.')
        user = Player(username=username, password=password)
        user.save()
    else:
        if auto_create_account == True:
            return Tools.toErrorResponse('Username exists.')
        user = users.first()

    with user.lock:
        if user.password != password:
            return Tools.toErrorResponse('Password is incorrect.')

    result['state'] = 'success'
    result['token'] = Tools.encode(username, password)

    return Tools.toResponse(result, 200)

# ===== Message =====
def message(request):
    # verify token
    state, someObject = Tools.verifyToken(request=request)
    if state:
        player = someObject
    else:
        return someObject

    result = {
        "state": "success",
    }
    with player.lock:
        if player.story_process == 0:
            player.story_process = 1
            result["message"] = MESSAGE_ENTER_FIRST_TIME
        else:
            result["message"] = MESSAGE_ENTER
        player.save()
    
    return Tools.toResponse(result, 200)
