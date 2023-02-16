from django.urls import path, include
from . import views

urlpatterns = [
    path('products/', views.products),
    path('cart-items/', views.cartItems),
    path('cart-items/<int:pk>/', views.single_CartItem),
    path('cart-items-add/<int:pk>/', views.single_CartItemAdd),
    # path('cart/', views.cart),
]
