from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework import filters
from rest_framework.settings import api_settings

from accounts import serializers
from accounts import models
# Create your views here.

class UsersViewSet(viewsets.ModelViewSet):
    """Handle Creating and updating profiles"""
    serializer_class= serializers.UsersSerializer
    queryset=models.Users.objects.all()


class UserLoginAPIView(ObtainAuthToken):
    """Handle creating user authentication tokens"""
    renderer_classes= api_settings.DEFAULT_RENDERER_CLASSES
