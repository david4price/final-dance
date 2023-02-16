# Generated by Django 4.1.3 on 2023-01-21 12:58

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0009_alter_cartitem_cart_alter_cartitem_item'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cartitem',
            name='cart',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='mycart', to='product.cart'),
        ),
        migrations.AlterField(
            model_name='cartitem',
            name='item',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='myitems', to='product.product'),
        ),
    ]
