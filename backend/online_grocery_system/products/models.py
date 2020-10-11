from django.db import models


# class Product(models.Model):
#     name = models.CharField(max_length=20)
#     description = models.TextField()
#     category = models.CharField(max_length=20)
#     price = models.FloatField()
#     image = models.ImageField(upload_to='images')

#     def __str__(self):
#         return self.name

class Product(models.Model):
    CATEGORY_CHOICES = [
        ('Fruits', 'Fruits'),
        ('Vegetables', 'Vegetables'),
        ('Beverages', 'Bevarages'),
        ('Dairy', 'Dairy'),
        ('Bakery', 'Bakery'),
        ('Flours', 'Flours')
    ]
    name = models.CharField(max_length=20)
    description = models.TextField()
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    price = models.DecimalField(max_digits=1000, decimal_places=2)
    image = models.ImageField(upload_to='images')
    available_quantity = models.IntegerField()

    def __str__(self):
        return self.name
