# app/models.py
# models.py
from app import db
from app import db  # Adjust based on your actual structure

class Fruit(db.Model):
    __tablename__ = 'fruits'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    color = db.Column(db.String(50), nullable=False)

    def __repr__(self):
        return f'<Fruit {self.name}>'
