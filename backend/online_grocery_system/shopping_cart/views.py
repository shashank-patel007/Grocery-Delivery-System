from django.shortcuts import render

from .serializers import CartItemSerializer, CartSerializer

from .models import Cart, CartItem
from products.models import Product

from django.contrib.auth.models import User

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

from accounts.models import Users
import logging

logger = logging.getLogger(__name__)


class CartView(APIView):
    authentication_classes=(TokenAuthentication,)
    permission_classes=(IsAuthenticated,)

    def get(self,request):
        return self.update_cart(request)

    def post(self,request):
       return self.update_cart(request)

    # @api_view(['POST', 'GET'])
    def update_cart(self,request):

        # code outside of the if block is common to both GET and POST methods, hence there is no explicit
        # if statement to check if the method is a GET method
        # logger = logging.getLogger(name)
        user = Users.objects.get(id=request.user.id)
        cart, created = Cart.objects.get_or_create(user=user)

        # the following if block is specific to the POST method

        if request.method == 'POST':
            try:
                product = Product.objects.get(id=request.data['product_id'])
            except Product.DoesNotExist:
                pass

            cart_item, created = CartItem.objects.get_or_create(
                cart=cart, product=product)

            if(request.data['qty'] == 0):
                product.available_quantity += cart_item.quantity
                cart_item.delete()
                product.save()
            else:
                present_qty = cart_item.quantity
                new_qty = request.data['qty']
                change_in_quantity = new_qty - present_qty
                if product.available_quantity - change_in_quantity >= 0:
                    product.available_quantity -= change_in_quantity
                    cart_item.quantity = new_qty
                    cart_item.save()
                    product.save()
                else:
                    print("Maximum available quantity is {0}".format(
                        product.available_quantity))

            new_total = 0.00

            for item in cart.cartitem_set.all():
                line_total = float(item.product.price) * item.quantity
                item.subTotal = line_total
                item.save()
                new_total += line_total

            cart.total = new_total
            cart.save()

        # if block ends

        serializer_cart = CartSerializer(cart)

        all_items = CartItem.objects.filter(cart=cart)
        # serializer_cartitem=CartItemSerializer(all_items,many=True)

        item_list = []
        for item in all_items:
            i = dict()
            i["Item Name"] = item.product.name
            i["Quantity"] = item.quantity
            i["Subtotal"] = item.subTotal

            item_list.append(i)

        response = {
            'Cart ID': serializer_cart.data['id'],
            'Cart Owner': user.name,
            'Total': serializer_cart.data['total'],
            'Cart Items': item_list
        }

        return Response(response, status=200)
