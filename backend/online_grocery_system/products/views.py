from rest_framework.generics import ListAPIView
from rest_framework import viewsets

from .models import Product
from .serializers import ProductSerializer


class ProductListView(viewsets.ModelViewSet):
    queryset= Product.objects.all()
    serializer_class=  ProductSerializer
