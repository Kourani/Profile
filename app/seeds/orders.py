from app.models import db, User, Order, environment, SCHEMA
from sqlalchemy.sql import text

def seed_orders():
    order0 = Order(
        customer_id=1, part_id=1, status='order placed', confirmed='yes')
    order1 = Order(
        customer_id=2, part_id=1, status='order placed', confirmed='yes')
    order2 = Order(
        customer_id=3, part_id=1, status='order placed', confirmed='yes')

    db.session.add(order0)
    db.session.add(order1)
    db.session.add(order2)
    db.session.commit()


def undo_orders():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.orders RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM orders"))

    db.session.commit()
