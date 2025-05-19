import os
import subprocess
import uuid
from django.contrib import messages
from django.conf import settings
from django.shortcuts import render, redirect
from django.contrib.auth import login, logout, authenticate
from .models import User
from .utils import generate_otp, send_otp_email, send_reset_email, pwd_reset_success
from django.contrib.auth.decorators import login_required
from django.views.decorators.cache import never_cache
from django.http import FileResponse, HttpResponseBadRequest
from django.core.files.storage import default_storage


def before_login(request):
    if request.method == 'POST':
        if 'login_email' in request.POST:
            email = request.POST.get('login_email', '').strip()
            password = request.POST.get('login_password', '').strip()

            errors = {}

            if User.objects.filter(email=email).exists():
                user = authenticate(request, email=email, password=password)
                if user is not None:
                    login(request, user)
                    return redirect('after_login')
                else:
                    errors['login_error'] = 'Invalid email or password'
                    return render(request, "before_login.html", {
                        'errors': errors,  # Pass the errors dictionary
                        'show_login': True
                    })
            else:
                errors['no_user'] = 'Email not registered'
                return render(request, "before_login.html", {
                    'errors': errors,  # Pass the errors dictionary
                    'show_login': True
                })
            
        elif 'register_email' in request.POST:
            name = request.POST.get('register_name', '').strip()
            email = request.POST.get('register_email', '').strip()
            password = request.POST.get('register_password')
            confirm_password = request.POST.get('register_confirm_password')

            min_pass_length = 8

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
            elif len(password) < min_pass_length:
                errors['password_error'] = f'Password must be at least {min_pass_length} characters long'
            if confirm_password != password:
                errors['confirm_error'] = 'Passwords do not match'

            if errors:
                return render(request, "before_login.html", {
                    **errors,
                    'show_register': True,
                    'show_login': False
                })
            
            # Generate otp and send OTP
            otp = generate_otp()
            send_otp_email(email, otp)

            # Store user input and OTP in session
            request.session['pending_user'] = {
                'name': name,
                'email': email,
                'password': password,
                'otp': str(otp)
            }

            return redirect('verify_otp')
        
        elif 'reset_email' in request.POST:
            user_email = request.POST.get('reset_email')
            if User.objects.filter(email=user_email).exists():
                send_reset_email(user_email)
                return redirect('before_login')
            else:
                print("User does not exist")


    # GET request or no form submitted
    return render(request, "before_login.html", {'show_register': False})

def verify_otp(request):
    if request.method == 'POST':
        if 'pending_user' in request.session:
            entered_otp = request.POST.get('otp')
            session_data = request.session.get('pending_user')

            if session_data and entered_otp == session_data['otp']:
                try:
                    user = User.objects.create_user(
                        email=session_data['email'],
                        full_name=session_data['name'],
                        password=session_data['password']
                    )
                    user = authenticate(request, email=session_data['email'], password=session_data['password'])
                    if user:
                        login(request, user)
                    del request.session['pending_user']
                    return redirect('after_login')
                except Exception:
                    return render(request, "otp/verify_otp.html", {
                        'error': 'Failed to create user. Try again.'
                    })

            return render(request, "otp/verify_otp.html", {
                'error': 'Invalid OTP'
            })
        
        elif 'reset_pwd' in request.session:
            entered_otp = request.POST.get('otp')
            session_data = request.session.get('reset_pwd')

            if session_data and entered_otp == session_data['otp']:
                try:
                    user = User.objects.get(email=session_data['email'])
                    user.set_password(session_data['new_password'])
                    user.save()
                    pwd_reset_success(session_data['email'])
                    del request.session['reset_pwd']
                    return redirect('before_login')
                except Exception:
                    return render(request, "otp/verify_otp.html", {
                        'error': 'Failed to update password. Try again.'
                    })

            return render(request, "otp/verify_otp.html", {
                'error': 'Invalid OTP'
            })

    return render(request, "otp/verify_otp.html")


@login_required
@never_cache
def after_login(request):
    return render(request, "after_login.html")

@login_required
def user_logout(request):
    logout(request)
    return redirect('before_login')

def reset_password(request):
    if request.method == 'POST':
        email = request.POST.get('registered_email', '').strip()
        new_password = request.POST.get('new_password')
        confirm_password = request.POST.get('confirm_password')

        if not User.objects.filter(email=email).exists():
            messages.error(request, "This email is not registered.")
            return render(request, "reset_password.html")

        if new_password != confirm_password:
            messages.error(request, "Passwords do not match.")
            return render(request, "reset_password.html")

        # All checks passed
        otp = generate_otp()

        # Store user input and OTP in session
        request.session['reset_pwd'] = {
            'email': email,
            'new_'
            'password': new_password,
            'otp': str(otp)
        }

        send_otp_email(email, otp)

        return redirect('verify_otp')
    
    return render(request, "reset_password.html")


'''

    ####################################
    File Converter Coding Module Started
    ####################################

                                        '''


def docx_to_pdf(request):
    if request.method == 'POST' and request.FILES.get('file'):
        docx_file = request.FILES['file']

        # Check file extension
        if not docx_file.name.lower().endswith('.docx'):
            return HttpResponseBadRequest("Only .docx files are supported.")

        # Save uploaded DOCX file
        upload_dir = os.path.join(settings.MEDIA_ROOT, 'uploads')
        os.makedirs(upload_dir, exist_ok=True)

        unique_filename = f"{uuid.uuid4()}.docx"
        docx_path = os.path.join(upload_dir, unique_filename)
        with default_storage.open(docx_path, 'wb+') as destination:
            for chunk in docx_file.chunks():
                destination.write(chunk)

        # Output directory for PDF
        output_dir = os.path.join(settings.MEDIA_ROOT, 'converted')
        os.makedirs(output_dir, exist_ok=True)

        try:
            # Path to LibreOffice
            libreoffice_path = settings.LIBREOFFICE_PATH

            # LibreOffice command to convert
            command = f'"{libreoffice_path}" --headless --convert-to pdf --outdir "{output_dir}" "{docx_path}"'
            subprocess.run(command, shell=True, check=True)

            # Construct PDF file path
            pdf_filename = os.path.splitext(os.path.basename(docx_path))[0] + '.pdf'
            pdf_path = os.path.join(output_dir, pdf_filename)

            # Serve the file as a download
            return FileResponse(open(pdf_path, 'rb'), as_attachment=True, filename=pdf_filename)

        except subprocess.CalledProcessError as e:
            return HttpResponseBadRequest(f"Conversion failed: {str(e)}")

        finally:
            # Cleanup DOCX file after conversion
            if os.path.exists(docx_path):
                os.remove(docx_path)

    return render(request, 'after_login.html')
