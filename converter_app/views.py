from django.shortcuts import render, redirect
from django.contrib.auth import login, logout, authenticate
from .models import User


def before_login(request):
    if request.method == 'POST':
        if 'login_email' in request.POST:
            pass  # You’ll handle this later.
        elif 'register_email' in request.POST:
            name = request.POST.get('register_name', '').strip()
            email = request.POST.get('register_email', '').strip()
            password = request.POST.get('register_password')
            confirm_password = request.POST.get('register_confirm_password')

            # Validation
            errors = {}
            if not name:
                errors['name_error'] = 'Name is required'
            if not email:
                errors['email_error'] = 'Email is required'
            elif User.objects.filter(email=email).exists():
                errors['email_error'] = 'Email already exists'
            if not password:
                errors['password_error'] = 'Password is required'
            elif password != confirm_password:
                errors['password_error'] = 'Passwords do not match'

            if errors:
                return render(request, "before_login.html", {
                    **errors,
                    'show_register': True
                })

            try:
                user = User.objects.create_user(
                    email=email,
                    full_name=name,
                    password=password
                )
                # login(request, user)
                return redirect('after_login')
            except Exception as e:
                return render(request, "before_login.html", {
                    'register_error': 'Registration failed. Please try again.',
                    'show_register': True
                })

    # GET request or no form submitted
    return render(request, "before_login.html", {'show_register': False})


def after_login(request):
    return render(request, "after_login.html")
