from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, User, Part, Review, Order
from app.forms import PartForm, ReviewForm
from .auth_routes import validation_errors_to_error_messages


part_routes = Blueprint('parts', __name__)

#Get all Parts
@part_routes.route('/')
def parts():
    """
    Query for all parts and returns them in a list of part dictionaries
    """
    parts = Part.query.all()
    return {'parts': [part.to_dict() for part in parts]}

#Get one part by Id
@part_routes.route('/<int:id>')
def part(id):
    """
    Query for a part by id and returns that part in a dictionary
    """

    part = Part.query.get(id)
    return part.to_dict()

#Create part
@part_routes.route('/', methods=['POST'])
@login_required
def new_part():

    form = PartForm()

    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        part = Part(
            customer_id=current_user.id,
            material=form.data['material'],
            service=form.data['service'],

            length=form.data['length'],
            width=form.data['width'],
            height=form.data['height'],

            image=form.data['image'],
            imageFile=form.data['imageFile'],
            CADFile=form.data['CADFile'],
            
            file = form.data['file'],
            confirmed = form.data['confirmed'], 
            status = form.data['status'],            
        )
        db.session.add(part)
        db.session.commit()
        return part.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

#Edit part
@part_routes.route('/<int:id>/edit', methods=['PUT'])
@login_required
def update_part(id):

    form = PartForm()

    part = Part.query.get(id)

    form['csrf_token'].data = request.cookies['csrf_token']

    if not part:
        return {'error' : 'Part not found'}

    if form.validate_on_submit():
       
        part.material = form.data['material']
        part.service = form.data['service']

        part.length = form.data['length']
        part.width = form.data['width']
        part.height = form.data['height']
        
        part.image = form.data['image']
        part.imageFile = form.data['imageFile']
        part.CADFile = form.data['CADFile']

        part.file = form.data['file']
        part.confirmed = form.data['confirmed']
        part.status = form.data['status']

        db.session.commit()

        return part.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

#delete part
@part_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_part(id):
    # form = PartForm

    part = Part.query.get(id)

    if not part:
        return {'error':'Part not found'}, 401

    if part:
        db.session.delete(part)
        db.session.commit()

    return {'message':'Successfully deleted'}, 200

# Create order for a part 
@part_routes.route('/<int:id>/orders', methods=['POST'])
@login_required
def new_order(id):
    print('inside the route')
    order = Order(
        customer_id=current_user.id,
        part_id=id,
        status='order created'
    )

    print(order, 'show me')
    db.session.add(order)
    db.session.commit()
    return order.to_dict()
