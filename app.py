# app.py

from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from models import Session, Funcionario, Servico, Cliente, Agendamento, Usuario

app = Flask(__name__, static_folder='static', template_folder='templates')
CORS(app)  # Permite que o frontend faça requisições para o backend

session = Session()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/register', methods=['POST'])
def register():
    data = request.json
    if session.query(Usuario).filter_by(email=data['email']).first():
        return jsonify({'message': 'Email já registrado'}), 400
    novo_usuario = Usuario(nome=data['nome'], email=data['email'])
    novo_usuario.set_senha(data['senha'])
    session.add(novo_usuario)
    session.commit()
    return jsonify(novo_usuario.to_dict()), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    usuario = session.query(Usuario).filter_by(email=data['email']).first()
    if usuario and usuario.check_senha(data['senha']):
        return jsonify(usuario.to_dict()), 200
    return jsonify({'message': 'Email ou senha incorretos'}), 401

# Rotas CRUD para Cliente
@app.route('/clientes', methods=['GET'])
def get_clientes():
    clientes = session.query(Cliente).all()
    return jsonify([cliente.to_dict() for cliente in clientes])

@app.route('/cliente', methods=['POST'])
def add_cliente():
    data = request.json
    novo_cliente = Cliente(nome=data['nome'], email=data['email'], telefone=data['telefone'], 
                           endereco=data['endereco'], dt_nascimento=data['dt_nascimento'], genero=data['genero'])
    session.add(novo_cliente)
    session.commit()
    return jsonify(novo_cliente.to_dict()), 201

@app.route('/cliente/<int:id>', methods=['PUT'])
def update_cliente(id):
    data = request.json
    cliente = session.query(Cliente).filter_by(id_cliente=id).first()
    if cliente:
        cliente.nome = data.get('nome', cliente.nome)
        cliente.email = data.get('email', cliente.email)
        cliente.telefone = data.get('telefone', cliente.telefone)
        cliente.endereco = data.get('endereco', cliente.endereco)
        cliente.dt_nascimento = data.get('dt_nascimento', cliente.dt_nascimento)
        cliente.genero = data.get('genero', cliente.genero)
        session.commit()
        return jsonify(cliente.to_dict())
    return jsonify({'message': 'Cliente não encontrado'}), 404

@app.route('/cliente/<int:id>', methods=['DELETE'])
def delete_cliente(id):
    cliente = session.query(Cliente).filter_by(id_cliente=id).first()
    if cliente:
        session.delete(cliente)
        session.commit()
        return jsonify({'message': 'Cliente excluído'}), 200
    return jsonify({'message': 'Cliente não encontrado'}), 404

if __name__ == '__main__':
    app.run(debug=True)
