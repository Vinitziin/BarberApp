from . import db

class Agendamento(db.Model):
    id_agendamento = db.Column(db.Integer, primary_key=True)
    id_usuario = db.Column(db.Integer, db.ForeignKey('usuario.id_usuario'), nullable=False)
    id_funcionario = db.Column(db.Integer, db.ForeignKey('funcionario.id_funcionario'), nullable=False)
    id_servico = db.Column(db.Integer, db.ForeignKey('servico.id_servico'), nullable=False)
    data = db.Column(db.Date, nullable=False)
    hora = db.Column(db.Time, nullable=False)
    
    usuario = db.relationship('Usuario', backref=db.backref('agendamentos', lazy=True))
    funcionario = db.relationship('Funcionario', backref=db.backref('agendamentos', lazy=True))
    servico = db.relationship('Servico', backref=db.backref('agendamentos', lazy=True))

    def __repr__(self):
        return f'<Agendamento {self.id_agendamento}>'
