from sqlalchemy import create_engine, Column, Integer, String, Date, Time, ForeignKey, DECIMAL
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship, sessionmaker
from werkzeug.security import generate_password_hash, check_password_hash
import json

Base = declarative_base()

class Funcionario(Base):
    __tablename__ = 'funcionario'
    id_funcionario = Column(Integer, primary_key=True, autoincrement=True)
    nome = Column(String(255), nullable=False)
    contato = Column(String(255), nullable=False)
    cargo = Column(String(255), nullable=False)

class Servico(Base):
    __tablename__ = 'servico'
    id_servico = Column(Integer, primary_key=True, autoincrement=True)
    descricao = Column(String(255), nullable=False)
    preco = Column(DECIMAL(10, 2), nullable=False)
    duracao = Column(Time, nullable=False)

class Cliente(Base):
    __tablename__ = 'cliente'
    id_cliente = Column(Integer, primary_key=True, autoincrement=True)
    nome = Column(String(255), nullable=False)
    email = Column(String(255), nullable=False)
    telefone = Column(String(255), nullable=False)
    endereco = Column(String(255), nullable=False)
    dt_nascimento = Column(Date, nullable=False)
    genero = Column(String(15), nullable=False)

class Agendamento(Base):
    __tablename__ = 'agendamento'
    id_agendamento = Column(Integer, primary_key=True, autoincrement=True)
    id_cliente = Column(Integer, ForeignKey('cliente.id_cliente'))
    id_servico = Column(Integer, ForeignKey('servico.id_servico'))
    id_funcionario = Column(Integer, ForeignKey('funcionario.id_funcionario'))
    data = Column(Date)
    hora = Column(Time)
    cliente = relationship("Cliente")
    servico = relationship("Servico")
    funcionario = relationship("Funcionario")

class Usuario(Base):
    __tablename__ = 'usuario'
    id_usuario = Column(Integer, primary_key=True, autoincrement=True)
    nome = Column(String(255), nullable=False)
    email = Column(String(255), nullable=False, unique=True)
    senha = Column(String(255), nullable=False)

    def set_senha(self, senha):
        self.senha = generate_password_hash(senha)

    def check_senha(self, senha):
        return check_password_hash(self.senha, senha)

    def to_dict(self):
        return {
            'id_usuario': self.id_usuario,
            'nome': self.nome,
            'email': self.email
        }

with open('credenciais.json', 'r') as f:
    config = json.load(f)

# Configurar a conexão com o banco de dados
engine = create_engine(config['database']['connection_string'])
Base.metadata.create_all(engine)

# Criar uma sessão
Session = sessionmaker(bind=engine)
session = Session()
