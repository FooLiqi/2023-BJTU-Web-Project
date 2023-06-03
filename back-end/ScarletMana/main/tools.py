from django.http import HttpResponse
import base64
import json

class Tools:

    @staticmethod
    def toResponse(dictionary, status):
        return HttpResponse(json.dumps(dictionary).encode('utf-8'), status=status)

    # 若返回空字符串，说明用户名和密码不合法
    @staticmethod
    def encode(username: str, password: str) -> str:
        if username.count(";") > 0 or password.count(";") > 0:
            return ""
        result = username + ";" + password
        result = base64.b64encode(result.encode('utf-8')).decode('utf-8')
        return result
    
    @staticmethod
    def decode(token: str):
        token = base64.b64decode(token.encode('utf-8')).decode('utf-8')
        [username, password] = token.split(';')
        return username, password
    
