from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime

class Product(db.Model):
    __tablename__ = 'products'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True, nullable=False)

    customer_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('users.id')), nullable=False) 
    
    length = db.Column(db.Float, nullable=False)
    width = db.Column(db.Float, nullable=False)
    height = db.Column(db.Float, nullable=False)
    image = db.Column(db.String)

    users = db.relationship('User', back_populates='products')
    # reviews = db.relationship('Review', back_populates='products')



    def to_dict(self):
        return {
            'id' : self.id,
            'customerId': self.customer_id,

            'length':self.length,
            'width':self.width,
            'height':self.height,
            'image': self.image,
        }
