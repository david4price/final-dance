from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Product, Cart, CartItem
from .serializers import ProductSerializer, CartItemSerializer, CartSerializer


@api_view(['GET', 'POST'])
def products(request):
    # gets us all of the products
    if request.method == 'GET':
        products = Product.objects.filter(archived=False)
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)

    # creating a new product
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

    # get product
    if request.method == 'GET':
        serializer = ProductSerializer(product, many=False)
        return Response(serializer.data)

    # archive product(not really deleting it)
    if request.method == 'DELETE':
        product.archived = True
        product.save()
        return Response(status=status.HTTP_204_NO_CONTENT)

    # update product
    if request.method == 'PUT':
        serializer = ProductSerializer(instance=product, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST', 'DELETE'])
def cartItems(request, cart_item_id=None):
    # get cart items
    if request.method == 'GET':
        if cart_item_id:
            try:
                cart_item = CartItem.objects.get(id=cart_item_id)
            except CartItem.DoesNotExist:
                return Response(status=status.HTTP_404_NOT_FOUND)
            serializer = CartItemSerializer(cart_item)
            return Response(serializer.data)

        items = CartItem.objects.all()
        serializer = CartItemSerializer(items, many=True)
        return Response(serializer.data)

    # add product to cart or if already in cart update the quantity
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
        return Response(status=status.HTTP_201_CREATED)

    # delete a cart item
    elif request.method == 'DELETE':
        try:
            cart_item = CartItem.objects.get(id=cart_item_id)
        except CartItem.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        cart_item.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)



@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def single_CartItem(request, pk):
    try:
        cart_item = CartItem.objects.get(id=pk)
    except CartItem.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    # get single cart product
    if request.method == 'GET':
        serializer = CartItemSerializer(cart_item, many=False)
        return Response(serializer.data)

    # delete product from cart
    elif request.method == 'DELETE':
        cart_item.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    # decrease single product quantity in cart
    elif request.method == 'PUT':
        cart_item.quantity -= 1
        if cart_item.quantity > 0:
            cart_item.save()
            return Response(status=status.HTTP_200_OK)
        else:
            cart_item.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['PUT'])
def single_CartItemAdd(request, pk):
    try:
        cart_item = CartItem.objects.get(id=pk)
    except CartItem.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    # increase single product quantity in cart
    if request.method == 'PUT':
        cart_item.quantity += 1
        if cart_item.quantity > 0:
            cart_item.save()
            return Response(status=status.HTTP_200_OK)
        else:
            cart_item.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)


def handler404(request, exception=None, template_name='404.html'):
    return render(request, '404.html', status=404)

def handler500(request, exception=None, template_name='500.html'):
    return render(request, '500.html', status=500)
