from django.urls import path
from shopping_cart.views import  CartView

urlpatterns = [
    path('', CartView.as_view())
]
