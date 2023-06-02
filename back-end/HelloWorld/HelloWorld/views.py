from django.http import HttpResponse
from django.shortcuts import render

def hello(request):
    return HttpResponse("Hello world! 1")

def runoob(request):
    context = {}
    context['hello'] = 'Hello world!'
    return render(request, 'runoob.html', context)
