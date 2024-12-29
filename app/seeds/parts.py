

from app.models import db, Part, User, SCHEMA, environment
from sqlalchemy.sql import text

def seed_parts():

    part0 = Part(
         customer_id = 1, material='PLA', service='3D Printing', image="https://images.pexels.com/photos/7803117/pexels-photo-7803117.jpeg", confirmed='yes', length=1.5, width=1.2, height=5
    )

    part1 = Part(
         customer_id = 1, material='ABS', service='Laser Engraving', image="https://images.pexels.com/photos/7803117/pexels-photo-7803117.jpeg", confirmed='yes', length=2, width=3, height=1
    )

    part2 = Part(
         customer_id = 1, material='Wood', service='CNC Machining', image="https://images.pexels.com/photos/7803117/pexels-photo-7803117.jpeg", confirmed='no', length=1, width=4, height=6
    )
   

    db.session.add(part0)
    db.session.add(part1)
    db.session.add(part2)
    db.session.commit()

def undo_parts():
    if environment == 'production':
        db.session.execute(f"TRUNCATE table {SCHEMA}.parts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM parts"))

    db.session.commit()
