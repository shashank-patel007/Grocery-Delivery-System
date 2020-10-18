from rest_framework.generics import ListAPIView
from rest_framework import viewsets
from rest_framework import permissions

from .models import Product
from .serializers import ProductSerializer


class ProductListView(viewsets.ModelViewSet):
    permission_classes=(permissions.AllowAny,)
    queryset= Product.objects.all()
    serializer_class=  ProductSerializer
