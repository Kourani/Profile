
from flask_wtf import FlaskForm
from wtforms import StringField, FloatField, SelectField, FileField, DecimalField
from wtforms.validators import DataRequired, ValidationError, Length
from app.models import Part


#part validations
def part_image(form, field):
    image = form.data['image']

    if image != ""  and image != None and not image.endswith('jpeg') and not image.endswith('jpg') and not image.endswith('png'):
        raise ValidationError('Image must end with jpeg, jpg, or png')

def part_length(form, field):
    length = form.data['length']

    if type(length) is float:
        raise ValidationError('Length must be a number')

def part_width(form, field):
    width = form.data['width']

    if not isinstance(width, (int, float)):
        raise ValidationError('Width must be a number')

def part_height(form, field):
    height = form.data['height']

    if not isinstance(height, (int, float)):
        raise ValidationError('Height must be a number')


class PartForm(FlaskForm):
    material = SelectField('material', choices=[('PLA','PLA'), ('PETG','PETG'), ('TPU', 'TPU'), ('PVA', 'PVA'), ('Wood', 'Wood'), ('ABS', 'ABS'), ('Black Nylon', 'Black Nylon'), ('Glow in the dark green PLA', 'Glow in the dark green PLA')])
    service = SelectField('service', choices=[('3D Printing','3D Printing'), ('Laser Engraving','Laser Engraving'), ('CNC Machining', 'CNC Machining')])

    length = DecimalField('length')
    width = DecimalField('width')
    height = DecimalField('height')

    image = StringField('image', validators=[part_image])
    imageFile = FileField('imageFile')
    CADFile = FileField('CADFile')
    file = StringField('file')

    status = StringField('status')
    confirmed = StringField('confirmed')

