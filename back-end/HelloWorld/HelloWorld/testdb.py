from django.http import HttpResponse, response

from TestModel.models import Test

def testdb(request):
    
    # select * from Test
    list = Test.objects.all()
    response1 = ""
    for var in list:
        response1 += var.name + " "
    print("response1: ", response1)

    # select * from Test where id = 1
    response2 = Test.objects.filter(id = 1)
    print("response2: ", response2)

    # select 
    # response = response1;
    response = str(response2);

    # TODO

    return HttpResponse("<p>" + response + "</p>")
