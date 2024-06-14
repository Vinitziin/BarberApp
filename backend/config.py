import os

basedir = os.path.abspath(os.path.dirname(__file__))

class Config:
    SQLALCHEMY_DATABASE_URI = 'mysql+mysqlconnector://root:465146@localhost:3306/Barbearia'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    