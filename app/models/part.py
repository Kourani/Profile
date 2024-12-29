from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime

class Part(db.Model):
    __tablename__ = 'parts'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True, nullable=False)

    customer_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('users.id')), nullable=False) 
    
    material = db.Column(db.String, nullable=False)
    service = db.Column(db.String, nullable=False)
    length = db.Column(db.Float, nullable=False)
    width = db.Column(db.Float, nullable=False)
    height = db.Column(db.Float, nullable=False)
    image = db.Column(db.String)
    imageFile = db.Column(db.String)
    CADFile = db.Column(db.String)
    
    file = db.Column(db.String)
    confirmed = db.Column(db.String) 
    status = db.Column(db.String)
    created_at = db.Column(db.DateTime, default=datetime.now())


    users = db.relationship('User', back_populates='parts')

    def to_dict(self):
        return {
            'id' : self.id,
            'customerId': self.customer_id,
            'material': self.material,
            'service': self.service,
            'length':self.length,
            'width':self.width,
            'height':self.height,
            'image': self.image,
            'imageFile':self.imageFile,
            'CADFile':self.CADFile,
            'confirmed':self.confirmed,
            'status':self.status,
            'createdAt':self.created_at
        }
