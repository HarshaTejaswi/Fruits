import os

class Config:
    SECRET_KEY = 'your_secret_key'
    SQLALCHEMY_DATABASE_URI = 'sqlite:///fruits.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False