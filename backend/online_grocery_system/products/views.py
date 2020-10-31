from rest_framework.generics import ListAPIView
from rest_framework import viewsets
from rest_framework import permissions

from .models import Product
from .serializers import ProductSerializer

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import action
import django.contrib.postgres

class ProductListView(viewsets.ModelViewSet):
    permission_classes=(permissions.AllowAny,)
    queryset= Product.objects.all()
    serializer_class=  ProductSerializer

    @action(detail=False,methods=['get','post'])
    def search(self,request):
        products=Product.objects.all()

        try:
            products=products.filter(name__icontains=request.data["name"])
        except AttributeError as e:
            pass
        except KeyError as e:
            pass   

        serializer=ProductSerializer(products,many=True)
        return Response(serializer.data,status=200)
    
    @action(detail=False,methods=['get','post'])
    def category(self,request):
        products=Product.objects.all()
        try:
            products=products.filter(category=request.data['category'])
            serializer=ProductSerializer(products,many=True)
            return Response(serializer.data,status=200)
        except Exception as e:
            pass
        serializer=ProductSerializer(products,many=True)
        return Response(serializer.data,status=200)
