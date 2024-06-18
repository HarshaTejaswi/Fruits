from flask import Blueprint, request, jsonify
from ..crud import get_fruits, create_fruit
from ..schemas import FruitSchema

fruits_bp = Blueprint('fruits', __name__)

@fruits_bp.route('/fruits', methods=['GET'])
def read_fruits():
    fruits = get_fruits()
    fruit_schema = FruitSchema(many=True)
    return fruit_schema.jsonify(fruits), 200

@fruits_bp.route('/fruits', methods=['POST'])
def add_fruit():
    data = request.get_json()
    name = data.get('name')
    description = data.get('description')
    new_fruit = create_fruit(name, description)
    fruit_schema = FruitSchema()
    return fruit_schema.jsonify(new_fruit), 201
