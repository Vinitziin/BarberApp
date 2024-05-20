from sqlalchemy import create_engine, Column, Integer, String, Date, Time, ForeignKey, DECIMAL, Enum
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship, sessionmaker
from werkzeug.security import generate_password_hash, check_password_hash
import json

Base = declarative_base()

# Tabela Usuário, com Hash para proteção de senha
class Usuario(Base):
    __tablename__ = 'usuarios'
    id_usuario = Column(Integer, primary_key=True, autoincrement=True)
    nome = Column(String(255), nullable=False)
    email = Column(String(255), nullable=False)
    senha = Column(String(255), nullable=False)
    role =  Column(Enum('admin', 'cliente' ,'funcionario'), nullable=False)

    def set_senha(self, senha):
        self.senha = generate_password_hash(senha)
    
    def check_senha(self, senha):
        return check_password_hash(self.senha, senha)

    def to_dict(self):
        return {
            'id_usuario': self.id_usuario,
            'nome': self.nome,
            'email': self.email,
            'role': self.role
        }

class Funcionario(Base):
    __tablename__ = "funcionarios"
    id_funcionario = Column(Integer, primary_key=True, autoincrement=True)
    id_usuario = Column(Integer, ForeignKey('usuarios.id_usuario'))
    contato = Column(String(255))
    cargo = Column(String(255))
    usuario = relationship("Usuario")


class Servico(Base):
    __tablename__ = 'servicos'
    id_servico = Column(integer, primary_key=True, autoincrement=True)
    descricao = Column(String(255), nullable=False)
    preco = Column(DECIMAL(10, 2), nullable=False)
    durucao = Column(Time, nullable=False)

class Agendamento(Base):
    __tablename__ = "agendamentos"
    id_agendamento = Column(integer, primary_key=True, autoincrement=True)
    id_funcionario = Column(Integer, ForeignKey('funcionarios.id_funcionario'))
    id_usuario = Column(Integer, ForeignKey("usuarios.id_usuario"))
    id_servico = Column(Integer, ForeignKey("servicos.id_servico"))
    data = Column(Date, nullable=False)
    hora = Column(Time, nullable=False)
    funcionario = relationship("Funcionario")
    usuario = relationship("Usuario")
    servico = relationship("Servico")


# Vou abrir o Json para puxar as minhas credenciais 

with open('credenciais.json', 'r') as f:
    config = json.load(f)

engine = create_engine(config['database']['connection_string'])
Base.metadata.create_all(engine)
Session = sessionmaker(bind=engine)
session = Session()