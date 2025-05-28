from django.urls import path
from . import views

urlpatterns=[
    path('', views.before_login, name='before_login'),
    path('user/dashboard/', views.after_login, name='after_login'),
    path('verify/otp/', views.verify_otp, name='verify_otp'),
    path('user/logout/', views.user_logout, name='user_logout'),
    path('reset/password/', views.reset_password, name='reset_password'),
    
    path('docx/-/pdf/', views.docx_to_pdf, name='docx_to_pdf'),
    path('pdf/-/docx/', views.pdf_to_docx, name='pdf_to_docx'),
    path('docx/-/txt/', views.docx_to_txt, name='docx_to_txt'),
    path('jpg/-/png/', views.jpg_to_png, name='jpg_to_png'),
    path('png/-/jpg/', views.png_to_jpg, name='png_to_jpg'),
    path('img/-/pdf/', views.img_to_pdf, name='img_to_pdf'),
]