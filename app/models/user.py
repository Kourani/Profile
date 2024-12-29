from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)

    first_name = db.Column(db.String)
    last_name = db.Column(db.String)

    birthday = db.Column(db.String)

    address = db.Column(db.String)
    city = db.Column(db.String)
    state = db.Column(db.String)
    country = db.Column(db.String)
    zip_code = db.Column(db.Integer)

    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    created_at = db.Column(db.DateTime, default = datetime.now())
    hashed_password = db.Column(db.String(255), nullable=False)

    parts = db.relationship('Part', back_populates='users', cascade='all, delete-orphan')
    orders = db.relationship('Order', back_populates='users', cascade='all, delete-orphan')
    reviews = db.relationship('Review', back_populates='users', cascade='all, delete-orphan')
    products = db.relationship('Product', back_populates='users', cascade='all, delete-orphan')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'firstName':self.first_name,
            'lastName': self.last_name,
            'birthday' : self.birthday,
            'address' : self.address,
            'city' : self.city,
            'state' : self.state,
            'coountry' : self.country,
            'zipCode': self.zip_code,
            'username': self.username,
            'email': self.email,
            'createdAt':self.created_at
        }
