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

class Orders(models.Model):
    date_created=models.DateField()
    customer_name=models.CharField(max_length=20)
    customer_id=models.IntegerField()
    status=models.CharField(max_length=20,default='Paid')

    def __str__(self):
        return str(self.customer_name)

    class Meta:
        verbose_name_plural = "Orders"
    

class OrderDetails(models.Model):
    product_name=models.CharField(max_length=255,default='')
    quantity=models.CharField(max_length=255,default='')
    sub_total=models.FloatField()

    def __str__(self):
        return str(product_name)
    class Meta:
        verbose_name_plural="Order Details"
 