from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime


class Order(db.Model):
    __tablename__ = 'orders'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)

    customer_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('users.id')), nullable=False)
    
    part_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('parts.id')), nullable=False)

    confirmed = db.Column(db.String, nullable=False)
    status = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now())

    users = db.relationship('User', back_populates='orders')

    def to_dict(self):
        return {
            'id':self.id,
            'customerId':self.customer_id,
            'partId':self.part_id,
            'confirmed':self.confirmed,
            'createdAt':self.created_at
        }
