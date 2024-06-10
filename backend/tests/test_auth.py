import pytest
from app import app, db
from models import Usuario

@pytest.fixture(scope='module')
def test_client():
    flask_app = app
    testing_client = flask_app.test_client()

    ctx = flask_app.app_context()
    ctx.push()

    yield testing_client

    ctx.pop()

@pytest.fixture(scope='module')
def init_database():
    db.create_all()

    user = Usuario(nome='Admin', email='admin@example.com', senha='password', role='admin')
    db.session.add(user)
    db.session.commit()

    yield db

    db.drop_all()

def test_register(test_client, init_database):
    response = test_client.post('/api/auth/register', json={
        'nome': 'User1', 'email': 'user1@example.com', 'senha': 'password', 'role': 'cliente'
    })
    assert response.status_code == 201
    assert response.json['message'] == 'Usuário registrado com sucesso!'

def test_login(test_client, init_database):
    response = test_client.post('/api/auth/login', json={
        'email': 'user1@example.com', 'senha': 'password'
    })
    assert response.status_code == 200
    assert 'token' in response.json
