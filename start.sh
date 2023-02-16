#!/bin/bash

# Navigate to the backend folder
cd shopping-back

# Activate the virtual environment
source venv/bin/activate

# Install the dependencies
pip install -r requirements.txt

# Start the Django app with gunicorn
gunicorn shopping.wsgi

