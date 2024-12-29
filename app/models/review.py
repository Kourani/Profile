from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime


class Review(db.Model):
    __tablename__ = 'reviews'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True, nullable=False)

    user_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('users.id')), nullable=False)

    # product_id = db.Column(db.Integer, db.ForeignKey(
    #     add_prefix_for_prod('products.id')), nullable=True)

    # item_quality = db.Column(db.Integer)
    review = db.Column(db.String)
    created_at = db.Column(db.DateTime, default = datetime.now())

    users = db.relationship('User', back_populates= 'reviews')
    # products =db.relationship('Product', back_populates='reviews')

    def to_dict(self):
        return {
            'id':self.id,
            'userId':self.user_id,
            # 'productId':self.product_id,
            'review':self.review,
            'createdAt':self.created_at
        }
