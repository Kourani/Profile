from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, User, Order, Review, Part
from app.forms import ReviewForm
from .auth_routes import validation_errors_to_error_messages

review_routes = Blueprint('reviews', __name__)


#get all reviews
@review_routes.route('/')
def reviews():
    reviews = Review.query.all()
    return {'reviews': [review.to_dict() for review in reviews]}

#get comment by Id
@review_routes.route('/<int:id>')
def review(id):
    review = Review.query.get(id)
    return review.to_dict()

#edit comment
@review_routes.route('/<int:id>/edit', methods=['PUT'])
@login_required
def edit_review(id):
    form = ReviewForm()

    review = Review.query.get(id)

    form['csrf_token'].data = request.cookies['csrf_token']

    if not review:
        return {'error': 'Review not found'}

    if form.validate_on_submit():
        review.review=form.data['review']

        db.session.commit()

        return comment.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@review_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_review(id):

    review = Review.query.get(id)

    if not review:
        return {'error': 'Review not found'}

    if review:
        db.session.delete(review)
        db.session.commit()

    return {'message':'Successfully Deleted'}, 200
