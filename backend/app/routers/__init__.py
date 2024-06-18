from flask import Flask
from .database import db
from .routes.auth import auth_bp
from .routes.fruits import fruits_bp

def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app)

    app.register_blueprint(auth_bp)
    app.register_blueprint(fruits_bp)

    return app
