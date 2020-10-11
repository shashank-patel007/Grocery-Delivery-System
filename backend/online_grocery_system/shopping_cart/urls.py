from django.urls import path
from .views import update_cart

urlpatterns = [
    path('<int:user_id>/', update_cart)
]
