
from app.models import db, User, Order, Review, environment, SCHEMA
from sqlalchemy.sql import text

def seed_reviews():
    Review0 = Review(
        review="I've discovered my new favorite", user_id=1, product_id=1)
    Review1 = Review(
        review='Love this, it tastes like home', user_id=2, product_id=1)
    Review2 = Review(
        review='Nice and sweet must try', user_id=3, product_id=1)
    Review3 = Review(
        review='Wow, simply amazing!', user_id=4, product_id=1)
   
    db.session.add(Review0)
    db.session.add(Review1)
    db.session.add(Review2)
    db.session.add(Review3)
    db.session.commit()


def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()
