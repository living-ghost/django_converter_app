from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.core.validators import validate_email

class UserManager(BaseUserManager):
    def create_user(self, email, full_name, password=None, **extra_fields):
        """
        Creates and saves a User with the given email, full name and password.
        """
        if not email:
            raise ValueError('Users must have an email address')
        if not full_name:
            raise ValueError('Users must have a full name')

        user = self.model(
            email=self.normalize_email(email),
            full_name=full_name,
            **extra_fields
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, full_name, password=None, **extra_fields):
        """
        Creates and saves a superuser with the given email, full name and password.
        """
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        return self.create_user(email, full_name, password, **extra_fields)

class User(AbstractBaseUser):
    email = models.EmailField(
        verbose_name='email address',
        max_length=255,
        unique=True,
        validators=[validate_email]
    )
    full_name = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    date_joined = models.DateTimeField(auto_now_add=True)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['full_name']

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        return True

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        return True
    
    
'''

    ####################################
    File Converter Coding Module Started
    ####################################

                                        '''


class DocxToPdfConversion(models.Model):
    docx_file = models.FileField(upload_to='uploads/docx/', help_text="Upload a .docx file")
    pdf_file = models.FileField(upload_to='converted/pdf/', blank=True, null=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.docx_file.name} → PDF"
    
class PdfToDocxConversion(models.Model):
    pdf_file = models.FileField(upload_to='uploads/pdf/', help_text="Upload a .pdf file")
    docx_file = models.FileField(upload_to='converted/docx/', blank=True, null=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.pdf_file.name} → DOCX"