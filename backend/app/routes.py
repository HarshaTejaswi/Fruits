from flask import request, jsonify
from app import app, db
from app.models import Fruit

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    
    if username == 'admin' and password == 'password':
        return jsonify({"message": "Login successful"}), 200
    else:
        return jsonify({"message": "Invalid credentials"}), 401

@app.route('/fruits', methods=['GET'])
def get_fruits():
    fruits = Fruit.query.all()
    return jsonify([{'id': fruit.id, 'name': fruit.name} for fruit in fruits])

@app.route('/fruits', methods=['POST'])
def add_fruit():
    data = request.json
    new_fruit = Fruit(name=data['name'])
    db.session.add(new_fruit)
    db.session.commit()
    return jsonify({'id': new_fruit.id, 'name': new_fruit.name}), 201

@app.route('/fruits/<int:id>', methods=['DELETE'])
def delete_fruit(id):
    fruit = Fruit.query.get(id)
    if fruit:
        db.session.delete(fruit)
        db.session.commit()
        return jsonify({"message": "Fruit deleted"}), 200
    else:
        return jsonify({"message": "Fruit not found"}), 404
