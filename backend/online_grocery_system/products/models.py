from django.db import models


class Product(models.Model):
    name = models.CharField(max_length=20)
    description = models.TextField()
    category = models.CharField(max_length=20)
    price = models.FloatField()
    image = models.ImageField(upload_to='images')

    def __str__(self):
        return self.name
