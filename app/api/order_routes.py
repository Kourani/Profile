from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, User, Order
from .auth_routes import validation_errors_to_error_messages

order_routes = Blueprint('orders', __name__)


#get all orders
@order_routes.route('/')
@login_required
def orders():
    """
    Query for all products and returns them in a list of order dictionaries
    """
    orders = Order.query.all()
    return {'orders': [order.to_dict() for order in orders]}

#get order by id
@order_routes.route('/<int:id>')
@login_required
def order(id):
    """
    Query for a order by id and returns that order in a dictionary
    """
    order = Order.query.get(id)
    return order.to_dict()



