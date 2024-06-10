from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

from .usuario import Usuario
from .funcionario import Funcionario 
from .servico import Servico
from .agendamento import Agendamento 

