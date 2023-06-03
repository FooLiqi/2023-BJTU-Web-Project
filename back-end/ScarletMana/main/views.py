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
    dwarf = Dwarf.Create(player)
    dwarf.save()

    # debug
    # print(dwarf)

    # result
    result = {
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
        dwarf = valid_dwarfs.first()
        dwarf.job = target
        dwarf.save()
        result = {"state": "success"}
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

    if user.password != password:
        return Tools.toErrorResponse('Password is incorrect.')

    result['state'] = 'success'
    result['token'] = Tools.encode(username, password)

    return Tools.toResponse(result, 200)


