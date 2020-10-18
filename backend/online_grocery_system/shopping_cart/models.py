from django.db import models
from products.models import Product
from django.contrib.auth.models import User
from accounts.models import Users


class CartItem(models.Model):
    cart = models.ForeignKey('Cart', on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=0)
    subTotal = models.DecimalField(
        max_digits=1000, decimal_places=2, default=10.00)
    # timestamp = models.DateTimeField(auto_now_add=True, auto_now=False)
    # updated = models.DateTimeField(auto_now_add=False, auto_now=True)

    def __str__(self):
        return "Cart-" + str(self.cart.id) + ",Product-" + self.product.name


class Cart(models.Model):
    user = models.ForeignKey(Users, on_delete=models.CASCADE, null=True)
    total = models.DecimalField(
        max_digits=1000, decimal_places=2, default=0.00)
    # the date-time when the cart if first instanciated
    # dateAdded = models.DateTimeField(auto_now_add=True, auto_now=False)
    # updated = models.DateTimeField(auto_now_add=False, auto_now=True)
    # active = models.DateTimeField(default=True)

    def __str__(self):
        return ("User-" + str(self.user.id) + ",Cart id-" + str(self.id))
