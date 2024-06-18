from .models import User, Fruit
from .database import db

def get_user_by_username(username):
    return User.query.filter_by(username=username).first()

def create_user(username, hashed_password):
    new_user = User(username=username, hashed_password=hashed_password)
    db.session.add(new_user)
    db.session.commit()
    return new_user

def get_fruits():
    return Fruit.query.all()

def create_fruit(name, description):
    new_fruit = Fruit(name=name, description=description)
    db.session.add(new_fruit)
    db.session.commit()
    return new_fruit
