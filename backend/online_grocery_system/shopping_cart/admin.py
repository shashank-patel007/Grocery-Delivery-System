from django.contrib import admin
from .models import Cart, CartItem,Orders,OrderDetails

# Register your models here.

admin.site.register(CartItem)
admin.site.register(Cart)
admin.site.register(Orders)
admin.site.register(OrderDetails)
