from . import db

class Servico(db.Model):
    id_servico = db.Column(db.Integer, primary_key=True)
    descricao = db.Column(db.String(255), nullable=False)
    preco = db.Column(db.Numeric(10, 2), nullable=False)
    duracao = db.Column(db.Time, nullable=False)

    def __repr__(self):
        return f'<Servico {self.descricao}>'
