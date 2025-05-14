from django.urls import path
from . import views

urlpatterns=[
    path('', views.before_login, name='before_login'),
    path('', views.after_login, name='after_login'),
]