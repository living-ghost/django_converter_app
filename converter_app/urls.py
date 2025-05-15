from django.urls import path
from . import views

urlpatterns=[
    path('', views.before_login, name='before_login'),
    path('user/dashboard/', views.after_login, name='after_login'),
    path('verify/otp/', views.verify_otp, name='verify_otp'),
    path('user/logout/', views.user_logout, name='user_logout')
]