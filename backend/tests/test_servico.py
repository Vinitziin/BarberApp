import pytest
import logging
from app import app, db
from models import Servico
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

    servico = Servico(descricao='Corte', preco=30.0, duracao='00:30:00')
    db.session.add(servico)
    db.session.commit()

    yield db

    logger.debug("Dropping all tables")
    db.drop_all()

def test_add_servico(test_client, init_database):
    logger.debug("Starting test_add_servico")
    response = test_client.post('/api/servico', json={
        'descricao': 'Barba', 'preco': 20.0, 'duracao': '00:20:00'
    })
    logger.debug(f"Response: {response.json}")
    assert response.status_code == 201
    assert response.json['message'] == 'Serviço adicionado com sucesso!'

def test_get_servicos(test_client, init_database):
    logger.debug("Starting test_get_servicos")
    response = test_client.get('/api/servicos')
    logger.debug(f"Response: {response.json}")
    assert response.status_code == 200
    assert len(response.json) > 0

def test_get_servico(test_client, init_database):
    logger.debug("Starting test_get_servico")
    response = test_client.get('/api/servico/1')
    logger.debug(f"Response: {response.json}")
    assert response.status_code == 200
    assert response.json['descricao'] == 'Corte'

def test_update_servico(test_client, init_database):
    logger.debug("Starting test_update_servico")
    response = test_client.put('/api/servico/1', json={
        'descricao': 'Corte Atualizado', 'preco': 35.0, 'duracao': '00:40:00'
    })
    logger.debug(f"Response: {response.json}")
    assert response.status_code == 200
    assert response.json['message'] == 'Serviço atualizado com sucesso!'

def test_delete_servico(test_client, init_database):
    logger.debug("Starting test_delete_servico")
    response = test_client.delete('/api/servico/1')
    logger.debug(f"Response: {response.json}")
    assert response.status_code == 200
    assert response.json['message'] == 'Serviço deletado com sucesso!'
