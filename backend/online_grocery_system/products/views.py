from rest_framework.generics import ListAPIView
from rest_framework import viewsets
from rest_framework import permissions

from .models import Product
from .serializers import ProductSerializer

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import action
import django.contrib.postgres
import json

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
        # print(serializer.data)
        serializer_dict=json.loads(json.dumps(serializer.data))
        # print(serializer_dict)
        for s in serializer_dict:
            s['image']=r'http://127.0.0.1:8000{}'.format(s['image'])
            # print(s['image'],type(s['image']))
        return Response(serializer_dict,status=200)
    
    @action(detail=False,methods=['get','post'])
    def category(self,request):
        products=Product.objects.all()
        try:
            products=products.filter(category=request.data['category'])
        except Exception as e:
            pass
        serializer=ProductSerializer(products,many=True)
        serializer_dict=json.loads(json.dumps(serializer.data))
        for s in serializer_dict:
            s['image']=r'http://127.0.0.1:8000{}'.format(s['image'])
            # print(s['image'],type(s['image']))
        return Response(serializer_dict,status=200)
       
