from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.

def before_login(request):
    return render(request, "before_login.html")

def after_login(request):
    return render(request, "after_login.html")