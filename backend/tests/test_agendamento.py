import pytest
import logging
from app import app, db
from models import Agendamento, Usuario, Funcionario, Servico
import json

# Configure logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

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
    logger.debug("Creating database and adding initial data")
    db.create_all()

    user = Usuario(nome='User1', email='user1@example.com', senha='password', role='cliente')
    admin = Usuario(nome='Admin', email='admin@example.com', senha='password', role='admin')
    funcionario = Funcionario(id_usuario=1, contato='123456789', cargo='Barbeiro')
    servico = Servico(descricao='Corte', preco=30.0, duracao='00:30:00')
    db.session.add(user)
    db.session.add(admin)
    db.session.add(funcionario)
    db.session.add(servico)
    db.session.commit()

    agendamento1 = Agendamento(id_usuario=1, id_funcionario=1, id_servico=1, data='2023-12-31', hora='14:00:00')
    db.session.add(agendamento1)
    db.session.commit()

    yield db

    logger.debug("Dropping all tables")
    db.drop_all()

def get_token(test_client, email, senha):
    logger.debug(f"Getting token for {email}")
    response = test_client.post('/api/auth/login', json={
        'email': email,
        'senha': senha
    })
    logger.debug(f"Response: {response.json}")
    return json.loads(response.data.decode())['token']

def test_add_agendamento(test_client, init_database):
    token = get_token(test_client, 'admin@example.com', 'password')
    logger.debug(f"Adding agendamento with token {token}")
    response = test_client.post('/api/agendamento', json={
        'id_usuario': 1, 'id_funcionario': 1, 'id_servico': 1, 'data': '2023-12-31', 'hora': '15:00:00'
    }, headers={'x-access-token': token})
    logger.debug(f"Response: {response.json}")
    assert response.status_code == 201
    assert response.json['message'] == 'Agendamento adicionado com sucesso!'

def test_get_agendamentos(test_client, init_database):
    token = get_token(test_client, 'admin@example.com', 'password')
    logger.debug(f"Getting agendamentos with token {token}")
    response = test_client.get('/api/agendamentos', headers={'x-access-token': token})
    logger.debug(f"Response: {response.json}")
    assert response.status_code == 200
    assert len(response.json) > 0

def test_get_agendamento(test_client, init_database):
    token = get_token(test_client, 'admin@example.com', 'password')
    logger.debug(f"Getting agendamento with token {token}")
    response = test_client.get('/api/agendamento/1', headers={'x-access-token': token})
    logger.debug(f"Response: {response.json}")
    assert response.status_code == 200
    assert response.json['id_usuario'] == 1

def test_update_agendamento(test_client, init_database):
    token = get_token(test_client, 'admin@example.com', 'password')
    logger.debug(f"Updating agendamento with token {token}")
    response = test_client.put('/api/agendamento/1', json={
        'id_usuario': 1, 'id_funcionario': 1, 'id_servico': 1, 'data': '2023-12-31', 'hora': '16:00:00'
    }, headers={'x-access-token': token})
    logger.debug(f"Response: {response.json}")
    assert response.status_code == 200
    assert response.json['message'] == 'Agendamento atualizado com sucesso!'

def test_delete_agendamento(test_client, init_database):
    token = get_token(test_client, 'admin@example.com', 'password')
    logger.debug(f"Deleting agendamento with token {token}")
    response = test_client.delete('/api/agendamento/1', headers={'x-access-token': token})
    logger.debug(f"Response: {response.json}")
    assert response.status_code == 200
    assert response.json['message'] == 'Agendamento deletado com sucesso!'
