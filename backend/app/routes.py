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

@app.route('/fruits/delete', methods=['POST'])
def delete_fruits():
    data = request.json
    ids = data.get('ids')  # Expecting a list of fruit IDs to delete
    try:
        Fruit.query.filter(Fruit.id.in_(ids)).delete(synchronize_session=False)
        db.session.commit()
        return jsonify({"message": f"Fruits with IDs {ids} deleted"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": str(e)}), 500

@app.route('/fruits/add', methods=['POST'])
def add_fruits():
    data = request.json
    try:
        fruits = [Fruit(name=fruit_name) for fruit_name in data['names']]
        db.session.add_all(fruits)
        db.session.commit()
        return jsonify({'message': 'Fruits added successfully', 'ids': [fruit.id for fruit in fruits]}), 201
    except KeyError:
        return jsonify({'error': 'Failed to add fruits', 'message': "Missing 'names' key"}), 400
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Failed to add fruits', 'message': str(e)}), 500

@app.route('/fruits/update', methods=['POST'])
def update_fruit():
    data = request.json
    fruit_id = data.get('id')
    new_quantity = data.get('quantity')
    try:
        fruit = Fruit.query.get(fruit_id)
        if fruit:
            fruit.quantity = new_quantity
            db.session.commit()
            return jsonify({"message": "Fruit quantity updated successfully"}), 200
        else:
            return jsonify({"message": "Fruit not found"}), 404
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": str(e)}), 500
