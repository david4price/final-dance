from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Product, Cart, CartItem
from .serializers import ProductSerializer, CartItemSerializer, CartSerializer


@api_view(['GET', 'POST'])
def products(request):
    """
    List of all products
    """
    if request.method == 'GET':
        products = Product.objects.filter(archived=False)
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def single_product(request, pk):
    try:
        product = Product.objects.get(id=pk)

    except Product.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':  # get single product
        serializer = ProductSerializer(product, many=False)
        return Response(serializer.data)
    if request.method == 'DELETE':  # delete product (send to archive )
        product.archived = True
        product.save()
        return Response(status=status.HTTP_204_NO_CONTENT)
    if request.method == 'PUT':  # update
        serializer = ProductSerializer(instance=product, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
def cartItems(request):
    if request.method == 'GET':
        items = CartItem.objects.all()
        serializer = CartItemSerializer(items, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        try:
            productId = request.data.get('productId')
            product = Product.objects.get(id=productId)
        except Product.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        cart, created = Cart.objects.get_or_create()
        quantity = request.data.get('quantity')
        cart_item, created = CartItem.objects.get_or_create(
            cart=cart, product=product)
        if not created:
            cart_item.quantity += int(quantity)
        else:
            cart_item.quantity = int(quantity)
        cart_item.save()
        return Response(status=status.HTTP_201_CREATEgiD)


@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def single_CartItem(request, pk):
    try:
        cart_item = CartItem.objects.get(id=pk)
    except CartItem.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':   # get single item (product in cart)
        serializer = CartItemSerializer(cart_item, many=False)
        return Response(serializer.data)

    elif request.method == 'DELETE':  # delete item
        cart_item.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    elif request.method == 'PUT':  # update item (quantity) in cart
        cart_item.quantity -= 1
        if cart_item.quantity > 0:
            cart_item.save()
            return Response(status=status.HTTP_200_OK)
        else:
            cart_item.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET', 'PUT'])
def single_CartItemAdd(request, pk):
    try:
        cart_item = CartItem.objects.get(id=pk)
    except CartItem.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':   # get single item (product in cart)
        serializer = CartItemSerializer(cart_item, many=False)
        return Response(serializer.data)

    elif request.method == 'PUT':  # update item (quantity) in cart
        cart_item.quantity += 1
        if cart_item.quantity > 0:
            cart_item.save()
            return Response(status=status.HTTP_200_OK)
        else:
            cart_item.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)