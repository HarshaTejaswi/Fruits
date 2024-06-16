from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from ..crud import get_user_by_username, create_user
from ..schemas import UserSchema
from ..database import db

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    user = get_user_by_username(username)
    if user:
        return jsonify({'message': 'Username already registered'}), 400
    hashed_password = generate_password_hash(password)
    new_user = create_user(username, hashed_password)
    user_schema = UserSchema()
    return user_schema.jsonify(new_user), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    user = get_user_by_username(username)
    if not user or not check_password_hash(user.hashed_password, password):
        return jsonify({'message': 'Invalid credentials'}), 400
    return jsonify({'message': 'Login successful'})
