import random
from django.core.mail import send_mail
from django.conf import settings


def generate_otp():
    return str(random.randint(1000, 9999))

def send_otp_email(email, otp):
    subject = 'Your OTP Code'
    message = f'Your OTP code is: {otp}'
    from_email = settings.EMAIL_HOST_USER
    recipient_list = [email]
    
    send_mail(subject, message, from_email, recipient_list)

def send_reset_email(email):
    subject = 'Link to reset Password'
    message = f'http://127.0.0.1:8000/reset/password/'
    from_email = settings.EMAIL_HOST_USER
    recipient_list = [email]
    
    send_mail(subject, message, from_email, recipient_list)

def pwd_reset_success(email):
    subject = 'Password Reset Successful'
    message = f'Please login using http://127.0.0.1:8000'
    from_email = settings.EMAIL_HOST_USER
    recipient_list = [email]
    
    send_mail(subject, message, from_email, recipient_list)