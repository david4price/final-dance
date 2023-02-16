from django.db import models

# Create your models here.


class Product(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField(null=True)
    price = models.DecimalField(decimal_places=2, max_digits=10)
    created = models.DateField(auto_now_add=True)
    updated = models.DateField(auto_now=True)
    image = models.ImageField(null=True, blank=True,
                              default='/placeholder.png')
    archived = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.id} - {self.name} - {self.price}₪"


class Cart(models.Model):
    name = models.CharField(max_length=200)
    created = models.DateField(auto_now_add=True)
    updated = models.DateField(auto_now=True)

    class Meta:
        ordering = ['-updated', '-created']

    def __str__(self):
        return f"{self.id} - {self.name}"


class CartItem(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="product")
    quantity = models.IntegerField(default=1)
    created = models.DateField(auto_now_add=True)
    updated = models.DateField(auto_now=True)

    class Meta:
        ordering = ['-updated', '-created']

    def __str__(self):
        return f"{self.item} - {self.quantity}"
