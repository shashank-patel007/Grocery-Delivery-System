from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework import filters
from rest_framework.settings import api_settings
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny

from accounts import serializers
from accounts import models
from accounts import permissions
# Create your views here.

class UsersViewSet(viewsets.ModelViewSet):
    """Handle Creating and updating profiles"""
    serializer_class= serializers.UsersSerializer
    queryset=models.Users.objects.all()
    authentication_classes=(TokenAuthentication,)
    permission_classes=(AllowAny,)

    def get_object(self):
        pk = self.kwargs.get('pk')

        if pk == "current":
            return self.request.user

        return super(UsersViewSet, self).get_object()


class UserLoginAPIView(ObtainAuthToken):
    """Handle creating user authentication tokens"""
    permission_classes=(AllowAny,)
    renderer_classes= api_settings.DEFAULT_RENDERER_CLASSES
    def post(self, request, *args, **kwargs):
        response = super(UserLoginAPIView, self).post(request, *args, **kwargs)
        token = Token.objects.get(key=response.data['token'])
        user = Token.objects.get(key=response.data['token']).user
        print(user)
        return Response({'token': token.key,
                        'id': token.user_id,
                        'email':user.email,
                        'name':user.name,
                        'mobile_no':user.mobile_no,
                        'address':user.address})


# class CustomObtainAuthToken(ObtainAuthToken):
#     def post(self, request, *args, **kwargs):
#         response = super(CustomObtainAuthToken, self).post(request, *args, **kwargs)
#         token = Token.objects.get(key=response.data['token'])
#         user = Token.objects.get(key=response.data['token']).user
#         print(user)
#         return Response({'token': token.key, 'id': token.user_id})
