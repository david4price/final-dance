# Readme
### Introduction
This project was created as part of a final Project in FullStack Course at John Bryce.

Live website at https://django-shopping-backend.herokuapp.com/ .

The frontend of this project is at https://react-shopping-frontend.herokuapp.com/ .
## Django E-commerce API
This is a simple e-commerce API built with Django and Django Rest Framework that allows users to view and manage products and a shopping cart.

## Setup
To run this project on your local machine, follow the steps below:

Clone this repository: git clone https://github.com/david4price/final-dance.git
Install the required dependencies using pip: pip install -r requirements.txt
Migrate the database: python manage.py migrate
Start the development server: python manage.py runserver
## Usage
Once the server is running, you can access the API by visiting http://localhost:8000/ in your web browser or using a tool like Postman.

The following endpoints are available:

### Products
1. GET /products/ - Retrieve a list of all products
2. GET /products/{pk}/ - Retrieve a single product by ID
3. POST /products/ - Create a new product
4. PUT /products/{pk}/ - Update a single product by ID
5. DELETE /products/{pk}/ - Archive a single product by ID

### Cart
1. GET /cart-items/ - Retrieve a list of all cart items
2. GET /cart-items/{cart_item_id}/ - Retrieve a single cart item by ID
3. POST /cart-items/ - Add a product to the cart
4. DELETE /cart-items/{cart_item_id}/ - Delete a cart item by ID
### Cart Item
1. GET /cart-item/{pk}/ - Retrieve a single cart item by ID
2. PUT /cart-item/{pk}/ - Decrease the quantity of a single product in the cart by 1
3. PUT /cart-item/{pk}/add/ - Increase the quantity of a single product in the cart by 1
4. DELETE /cart-item/{pk}/ - Delete a single product from the cart

## API Documentation
To view the API documentation, visit http://localhost:8000/swagger/ .
## Contributions
This project is open to contributions. If you find a bug or have an idea for a new feature, feel free to open an issue or submit a pull request.
## Credits
This project was created by David Praise.