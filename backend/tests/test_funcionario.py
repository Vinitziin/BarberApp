import pytest
from app import app, db
from models import Funcionario, Usuario

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

    # Criação de dados de exemplo
    user = Usuario(nome='User1', email='user1@example.com', senha='password', role='cliente')
    db.session.add(user)
    db.session.commit()

    funcionario1 = Funcionario(id_usuario=1, contato='123456789', cargo='Barbeiro')
    db.session.add(funcionario1)
    db.session.commit()

    yield db

    db.drop_all()

def test_add_funcionario(test_client, init_database):
    response = test_client.post('/api/funcionario', json={
        'id_usuario': 1, 'contato': '987654321', 'cargo': 'Barbeiro'
    })
    assert response.status_code == 201

def test_get_funcionarios(test_client, init_database):
    response = test_client.get('/api/funcionarios')
    assert response.status_code == 200
    assert len(response.json) > 0

def test_get_funcionario(test_client, init_database):
    response = test_client.get('/api/funcionario/1')
    assert response.status_code == 200
    assert response.json['contato'] == '123456789'

def test_update_funcionario(test_client, init_database):
    response = test_client.put('/api/funcionario/1', json={
        'contato': '111111111', 'cargo': 'Barbeiro'
    })
    assert response.status_code == 200
    assert response.json['message'] == 'Funcionário atualizado com sucesso!'

def test_delete_funcionario(test_client, init_database):
    response = test_client.delete('/api/funcionario/1')
    assert response.status_code == 200
    assert response.json['message'] == 'Funcionário deletado com sucesso!'
