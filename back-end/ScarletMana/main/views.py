from django.db.models import F
from django.http import HttpResponse

from .models import User
from .tools import Tools

import json

# Create your views here.

def login(request):
    return sign(request=request, auto_create_account=False)

def register(request):
    return sign(request=request, auto_create_account=True)

def resource(request):
    result = {}
    if request.method != 'POST':
        result['state'] = 'error'
        result['error_message'] = 'Request method is not POST.'
        return Tools.toResponse(result)

    data = json.loads(request.body)

    if 'token' not in data or data['token'] is None:
        result['state'] = 'error'
        result['error_message'] = 'Token is none.'
        return Tools.toResponse(result)

    [username, password] = Tools.decode(data['token'])

    print(username, password)

    users = User.objects.filter(username=username)

    if users.count() == 0:
        result['state'] = 'error'
        result['error_message'] = 'Token is incorrect and username doesn\'t exist.'
        return Tools.toResponse(result)
    
    user = users.first()

    if user.password != password:
        result['state'] = 'error'
        result['error_message'] = 'Password is incorrect.'
        return Tools.toResponse(result)

    result['state'] = 'success'
    result['mana'] = user.mana
    result['coin'] = user.coin
    result['mineral'] = user.mineral
    result['dwarf'] = user.dwarf

    return Tools.toResponse(result)


def sign(request, auto_create_account: bool):
    result = {}
    if request.method != 'POST':
        result['state'] = 'error'
        result['error_message'] = 'Request method is not POST.'
        return Tools.toResponse(result)
    
    data = json.loads(request.body)

    if 'username' not in data or data['username'] is None:
        result['state'] = 'error'
        result['error_message'] = 'Username is none.'
        return Tools.toResponse(result)
    username = data['username']

    if 'password' not in data or data['password'] is None:
        result['state'] = 'error'
        result['error_message'] = 'Password is none.'
        return Tools.toResponse(result)
    password = data['password']

    users = User.objects.filter(username=username)

    print(users)

    if users.count() == 0:
        if auto_create_account == False:
            result['state'] = 'error'
            result['error_message'] = 'Username doesn\'t exist.'
        user = User(username=username, password=password)
        user.save()
    else:
        user = users.first()

    if user.password != password:
        result['state'] = 'error'
        result['error_message'] = 'Password is incorrect.'
        return Tools.toResponse(result)

    result['state'] = 'success'
    result['token'] = Tools.encode(username, password)

    return Tools.toResponse(result)


