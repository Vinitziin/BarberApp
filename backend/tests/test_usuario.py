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

    user1 = Usuario(nome='User1', email='user1@example.com', senha='password', role='cliente')
    db.session.add(user1)
    db.session.commit()

    yield db

    db.drop_all()

def test_add_usuario(test_client, init_database):
    response = test_client.post('/api/usuario', json={
        'nome': 'User2', 'email': 'user2@example.com', 'senha': 'password', 'role': 'cliente'
    })
    assert response.status_code == 201

def test_get_usuarios(test_client, init_database):
    response = test_client.get('/api/usuarios')
    assert response.status_code == 200
    assert len(response.json) > 0

def test_get_usuario(test_client, init_database):
    response = test_client.get('/api/usuario/1')
    assert response.status_code == 200
    assert response.json['nome'] == 'User1'

def test_update_usuario(test_client, init_database):
    response = test_client.put('/api/usuario/1', json={
        'nome': 'User1 Updated', 'email': 'user1@example.com', 'senha': 'password', 'role': 'cliente'
    })
    assert response.status_code == 200
    assert response.json['message'] == 'Usuário atualizado com sucesso!'

def test_delete_usuario(test_client, init_database):
    response = test_client.delete('/api/usuario/1')
    assert response.status_code == 200
    assert response.json['message'] == 'Usuário deletado com sucesso!'
