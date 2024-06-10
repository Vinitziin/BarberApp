from . import db

class Funcionario(db.Model):
    id_funcionario = db.Column(db.Integer, primary_key=True)
    id_usuario = db.Column(db.Integer, db.ForeignKey('usuario.id_usuario'), nullable=False)
    contato = db.Column(db.String(255))
    cargo = db.Column(db.String(255))
    
    usuario = db.relationship('Usuario', backref=db.backref('funcionario', uselist=False))

    def __repr__(self):
        return f'<Funcionario {self.id_funcionario}>'
