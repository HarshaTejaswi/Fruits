from app import app, db
from app.models import Fruit
from flask import jsonify

@app.route('/')
def index():
    return "Hello, Fruits!"

@app.route('/fruits', methods=['GET'])
def get_fruits():
    fruits = Fruit.query.all()
    return jsonify([{'id': fruit.id, 'name': fruit.name, 'color': fruit.color} for fruit in fruits])
