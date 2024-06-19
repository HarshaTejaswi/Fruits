from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import os

app = Flask(__name__)
app.config.from_object('config.Config')

# Debug print statements
print("Config loaded:")
print(f"SECRET_KEY: {app.config.get('SECRET_KEY')}")
print(f"SQLALCHEMY_DATABASE_URI: {app.config.get('SQLALCHEMY_DATABASE_URI')}")
print(f"SQLALCHEMY_TRACK_MODIFICATIONS: {app.config.get('SQLALCHEMY_TRACK_MODIFICATIONS')}")

db = SQLAlchemy(app)

from app import routes, models

# Use application context to create the database
with app.app_context():
    try:
        db.create_all()
        print("Database created successfully.")
    except Exception as e:
        print("Error creating database:", e)

# Normalize and get the absolute path to the database file
db_file_path = os.path.normpath(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'fruits.db'))

if os.path.exists(db_file_path):
    print(f"Database file '{db_file_path}' created successfully.")
else:
    print(f"Database file '{db_file_path}' not found.")
