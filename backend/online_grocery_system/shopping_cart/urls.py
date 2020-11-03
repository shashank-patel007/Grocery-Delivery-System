from django.urls import path
from shopping_cart.views import  CartView, OrdersView

urlpatterns = [
    path('', CartView.as_view()),
    path('order',OrdersView.as_view())
]
