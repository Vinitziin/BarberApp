from flask import Blueprint, request, jsonify
from models import db, Funcionario

funcionario_bp = Blueprint('funcionario_bp', __name__)

@funcionario_bp.route('/funcionarios', methods=['GET'])
def get_funcionarios():
    funcionarios = Funcionario.query.all()
    return jsonify([{"id": funcionario.id_funcionario, "id_usuario": funcionario.id_usuario, "contato": funcionario.contato, "cargo": funcionario.cargo} for funcionario in funcionarios])

@funcionario_bp.route('/funcionario', methods=['POST'])
def add_funcionario():
    data = request.get_json()
    try:
        new_funcionario = Funcionario(id_usuario=data['id_usuario'], contato=data['contato'], cargo=data['cargo'])
        db.session.add(new_funcionario)
        db.session.commit()
        return jsonify({"message": "Funcionário adicionado com sucesso!"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@funcionario_bp.route('/funcionario/<int:id>', methods=['GET'])
def get_funcionario(id):
    funcionario = Funcionario.query.get(id)
    if not funcionario:
        return jsonify({"message": "Funcionário não encontrado"}), 404
    return jsonify({"id": funcionario.id_funcionario, "id_usuario": funcionario.id_usuario, "contato": funcionario.contato, "cargo": funcionario.cargo})

@funcionario_bp.route('/funcionario/<int:id>', methods=['PUT'])
def update_funcionario(id):
    data = request.get_json()
    funcionario = Funcionario.query.get(id)
    if not funcionario:
        return jsonify({"message": "Funcionário não encontrado"}), 404
    funcionario.contato = data['contato']
    funcionario.cargo = data['cargo']
    db.session.commit()
    return jsonify({"message": "Funcionário atualizado com sucesso!"})

@funcionario_bp.route('/funcionario/<int:id>', methods=['DELETE'])
def delete_funcionario(id):
    funcionario = Funcionario.query.get(id)
    if not funcionario:
        return jsonify({"message": "Funcionário não encontrado"}), 404
    db.session.delete(funcionario)
    db.session.commit()
    return jsonify({"message": "Funcionário deletado com sucesso!"})
