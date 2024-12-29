

from app.models import db, Product, User, SCHEMA, environment
from sqlalchemy.sql import text

def seed_products():

    product0 = Product(
         customer_id = 1, image="https://images.pexels.com/photos/7803117/pexels-photo-7803117.jpeg", length=1.5, width=1.2, height=5
    )

    product1 = Product(
         customer_id = 1, image="https://images.pexels.com/photos/7803117/pexels-photo-7803117.jpeg", length=2, width=3, height=1
    )

    product2 = Product(
         customer_id = 1, image="https://images.pexels.com/photos/7803117/pexels-photo-7803117.jpeg", length=1, width=4, height=6
    )
   

    db.session.add(product0)
    db.session.add(product1)
    db.session.commit()

def undo_products():
    if environment == 'production':
        db.session.execute(f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM products"))

    db.session.commit()
