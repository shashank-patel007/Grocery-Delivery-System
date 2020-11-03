from django.db import models
from django.contrib.auth.models import AbstractBaseUser,PermissionsMixin,BaseUserManager


class UsersManager(BaseUserManager):
    """Manager for user"""

    def create_user(self,email,name,mobile_no,password=None,address="NA"):
        if not email:
            raise ValueError("User must have an email address")
        email=self.normalize_email(email)
        user=self.model(name=name,email=email,mobile_no=mobile_no,address=address)

        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self,email,name,mobile_no,password):
        user=self.create_user(email,name,mobile_no,password)
        user.is_superuser=True
        user.is_staff=True
        user.save(using=self._db)

        return user


class Users(AbstractBaseUser,PermissionsMixin):
    """Database model for users of this system"""
    email=models.EmailField(max_length=255,unique=True)
    name=models.CharField(max_length=255)
    mobile_no=models.IntegerField(unique=True)
    is_active=models.BooleanField(default=True)
    is_staff=models.BooleanField(default=False)
    address=models.CharField(max_length=255,default='NA')

    objects=UsersManager()
    class Meta:
        verbose_name_plural = "Users"

    USERNAME_FIELD='email'
    REQUIRED_FIELDS=['name','mobile_no']

    def get_full_name(self):
        return self.name

    def __str__(self):
        return self.email
