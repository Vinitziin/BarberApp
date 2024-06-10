from flask import Blueprint, request, jsonify
from models import db, Usuario

usuario_bp = Blueprint('usuario_bp', __name__)

@usuario_bp.route('/usuarios', methods=['GET'])
def get_usuarios():
    usuarios = Usuario.query.all()
    return jsonify([{"id": usuario.id_usuario, "nome": usuario.nome, "email": usuario.email, "role": usuario.role} for usuario in usuarios])

@usuario_bp.route('/usuario', methods=['POST'])
def add_usuario():
    data = request.get_json()
    try:
        new_usuario = Usuario(nome=data['nome'], email=data['email'], senha=data['senha'], role=data['role'])
        db.session.add(new_usuario)
        db.session.commit()
        return jsonify({"message": "Usuário adicionado com sucesso!"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@usuario_bp.route('/usuario/<int:id>', methods=['GET'])
def get_usuario(id):
    usuario = Usuario.query.get(id)
    if not usuario:
        return jsonify({"message": "Usuário não encontrado"}), 404
    return jsonify({"id": usuario.id_usuario, "nome": usuario.nome, "email": usuario.email, "role": usuario.role})

@usuario_bp.route('/usuario/<int:id>', methods=['PUT'])
def update_usuario(id):
    data = request.get_json()
    usuario = Usuario.query.get(id)
    if not usuario:
        return jsonify({"message": "Usuário não encontrado"}), 404
    usuario.nome = data['nome']
    usuario.email = data['email']
    usuario.senha = data['senha']
    usuario.role = data['role']
    db.session.commit()
    return jsonify({"message": "Usuário atualizado com sucesso!"})

@usuario_bp.route('/usuario/<int:id>', methods=['DELETE'])
def delete_usuario(id):
    usuario = Usuario.query.get(id)
    if not usuario:
        return jsonify({"message": "Usuário não encontrado"}), 404
    db.session.delete(usuario)
    db.session.commit()
    return jsonify({"message": "Usuário deletado com sucesso!"})
