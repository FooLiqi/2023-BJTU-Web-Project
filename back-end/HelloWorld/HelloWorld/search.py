from django.http import HttpResponse
from django.shortcuts import render

def search_form(request):
    return render(request, 'search_form.html')

def search(request):
    request.encoding = 'utf-8'
    if 'q' in request.GET and request.GET['q']:
        message = "你搜索的内容为:" + request.GET['q']
    else:
        message = "你提交了空表单"
    return HttpResponse(message)

def search_post(request):
    ctx = {}
    if request.POST:
        ctx['rlt'] = request.POST['q']
    return render(request, "post.html", ctx)
