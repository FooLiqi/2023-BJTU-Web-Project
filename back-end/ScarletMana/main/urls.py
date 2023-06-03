from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.register),
    path('login/', views.login),
    path('resource/', views.resource),

    path('employ/', views.employ),
    path('dwarf/addMiner', views.addMiner),
    path('dwarf/addMerchant', views.addMerchant),
    path('dwarf/addSoldier', views.addSoldier),
    path('dwarf/subtractMiner', views.subtractMiner),
    path('dwarf/subtractMerchant', views.subtractMerchant),
    path('dwarf/subtractSoldier', views.subtractSoldier),


]
