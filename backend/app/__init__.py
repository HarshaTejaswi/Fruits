from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from config import Config
import os

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
app.config.from_object(Config)

# Print the loaded configuration to the console for debugging
print("Config loaded:")
print(f"SECRET_KEY: {app.config['SECRET_KEY']}")
print(f"SQLALCHEMY_DATABASE_URI: {app.config['SQLALCHEMY_DATABASE_URI']}")
print(f"SQLALCHEMY_TRACK_MODIFICATIONS: {app.config['SQLALCHEMY_TRACK_MODIFICATIONS']}")

db = SQLAlchemy(app)
migrate = Migrate(app, db)

# Importing routes and models after initializing Flask and SQLAlchemy to avoid circular imports
from app import routes, models

# Use application context to create the database
with app.app_context():
    db.create_all()
    print("Database created successfully.")

# Check the database file path and report its status
db_file_path = os.path.normpath(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'fruits.db'))
if os.path.exists(db_file_path):
    print(f"Database file '{db_file_path}' created successfully.")
else:
    print(f"Database file '{db_file_path}' not found.")
