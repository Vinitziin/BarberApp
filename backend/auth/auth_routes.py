from flask import Blueprint, request, jsonify, make_response
from models import db, Usuario
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
import datetime
from functools import wraps

auth_bp = Blueprint('auth_bp', __name__)

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('x-access-token')
        if not token:
            return jsonify({'message': 'Token é necessário!'}), 403
        try:
            data = jwt.decode(token, "secret", algorithms=["HS256"])
            current_user = Usuario.query.get(data['id'])
        except:
            return jsonify({'message': 'Token inválido!'}), 403
        return f(current_user, *args, **kwargs)
    return decorated

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    if not data or 'nome' not in data or 'email' not in data or 'senha' not in data or 'role' not in data:
        return jsonify({"message": "Dados incompletos!"}), 400
    
    hashed_password = generate_password_hash(data['senha'], method='pbkdf2:sha256')
    new_user = Usuario(nome=data['nome'], email=data['email'], senha=hashed_password, role=data['role'])
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": "Usuário registrado com sucesso!"}), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    if not data or 'email' not in data or 'senha' not in data:
        return jsonify({"message": "Dados incompletos!"}), 400

    user = Usuario.query.filter_by(email=data['email']).first()
    if not user or not check_password_hash(user.senha, data['senha']):
        return jsonify({"message": "Credenciais inválidas!"}), 401
    token = jwt.encode({'id': user.id_usuario, 'role': user.role, 'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)}, "secret", algorithm="HS256")
    return jsonify({'token': token})

@auth_bp.route('/me', methods=['GET'])
@token_required
def get_current_user(current_user):
    return jsonify({
        'id': current_user.id_usuario,
        'nome': current_user.nome,
        'email': current_user.email,
        'role': current_user.role
    })
