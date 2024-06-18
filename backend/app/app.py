# app.py

from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config.from_object('config.Config')

db = SQLAlchemy(app)

# Import routes or blueprints
from app.routes import *

if __name__ == "__main__":
    app.run()
