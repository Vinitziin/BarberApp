from . import db

class Usuario(db.Model):
    id_usuario = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    senha = db.Column(db.String(255), nullable=False)
    role = db.Column(db.Enum('admin', 'cliente', 'funcionario'), nullable=False)
    
    def __repr__(self):
        return f'<Usuario {self.nome}>'
