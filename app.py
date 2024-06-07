from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from models import Session, Usuario, Funcionario, Servico, Agendamento
import jwt
from datetime import datetime, timedelta
from functools import wraps
import json

with open('credenciais.json', 'r') as s:
    chave = json.load(s)

chave_secreta = chave['chave_secreta']['chave']
app = Flask(__name__, static_folder='static', template_folder='templates')
CORS(app)
app.config['SECRET_KEY'] = chave_secreta

session = Session()

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if 'x-access-token' in request.headers:
            token = request.headers['x-access-token']
        if not token:
            return jsonify({'message': 'Token is missing!'}), 401
        try:
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
            current_user = session.query(Usuario).filter_by(id_usuario=data['id']).first()
        except:
            return jsonify({'message': 'Token is invalid!'}), 401
        return f(current_user, *args, **kwargs)
    return decorated

def admin_required(f):
    @wraps(f)
    def decorated(current_user, *args, **kwargs):
        if current_user.role != 'admin':
            return jsonify({'message': 'Permission denied!'}), 403
        return f(current_user, *args, **kwargs)
    return decorated

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/register', methods=['POST'])
def register():
    data = request.json #pega os dados JSON da requisição
    if session.query(Usuario).filter_by(email=data['email']).first():
        return jsonify({'message': 'Email já registrado'}), 400
    novo_usuario = Usuario(nome=data['nome'], email=data['email'], role='cliente')
    novo_usuario.set_senha(data['senha'])
    session.add(novo_usuario)
    session.commit()
    return jsonify(novo_usuario.to_dict()), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    usuario = session.query(Usuario).filter_by(email=data['email']).first()
    if usuario and usuario.check_senha(data['senha']):
        token = jwt.encode({'id': usuario.id_usuario, 'exp': datetime.utcnow() + timedelta(minutes=30)}, app.config['SECRET_KEY'], algorithm="HS256")
        return jsonify({'token': token}), 200
    return jsonify({'message': 'Email ou senha incorretos'}), 401

@app.route('/cadastro-funcionario', methods=['POST'])
@token_required
@admin_required
def cadastro_funcionario(current_user):
    data = request.json
    if session.query(Funcionario).filter_by(email=data['email']).first():
        return jsonify({'message': 'Email já registrado'}), 400
    novo_funcionario = Funcionario(nome=data['nome'], contato=data['contato'], cargo=data['cargo'], email=data['email'])
    novo_funcionario.set_senha(data['senha'])
    session.add(novo_funcionario)
    session.commit()
    return jsonify(novo_funcionario.to_dict()), 201

@app.route('/agendamento', methods=['POST'])
@token_required
@admin_required
def add_agendamento(current_user):
    data = request.json
    novo_agendamento = Agendamento(id_usuario=current_user.id_usuario, id_servico=data['id_servico'], id_funcionario=data['id_funcionario'], data=data['data'], hora=data['hora'])
    session.add(novo_agendamento)
    session.commit()
    return jsonify(novo_agendamento.to_dict()), 201

@app.route('/agendamento/<int:id>', methods=['PUT'])
@token_required
@admin_required
def update_agendamento(current_user, id):
    data = request.json
    agendamento = session.query(Agendamento).filter_by(id_agendamento=id).first()
    if agendamento:
        agendamento.id_servico = data.get('id_servico', agendamento.id_servico)
        agendamento.id_funcionario = data.get('id_funcionario', agendamento.id_funcionario)
        agendamento.data = data.get('data', agendamento.data)
        agendamento.hora = data.get('hora', agendamento.hora)
        session.commit()
        return jsonify(agendamento.to_dict())
    return jsonify({'message': 'Agendamento não encontrado'}), 404

@app.route('/agendamento/<int:id>', methods=['DELETE'])
@token_required
@admin_required
def delete_agendamento(current_user, id):
    agendamento = session.query(Agendamento).filter_by(id_agendamento=id).first()
    if agendamento:
        session.delete(agendamento)
        session.commit()
        return jsonify({'message': 'Agendamento excluído'}), 200
    return jsonify({'message': 'Agendamento não encontrado'}), 404

if __name__ == '__main__':
    app.run(debug=True)
