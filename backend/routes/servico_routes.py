from flask import Blueprint, request, jsonify
from models import db, Servico

servico_bp = Blueprint('servico_bp', __name__)

@servico_bp.route('/servicos', methods=['GET'])
def get_servicos():
    servicos = Servico.query.all()
    return jsonify([{"id": servico.id_servico, "descricao": servico.descricao, "preco": servico.preco, "duracao": servico.duracao.strftime('%H:%M:%S')} for servico in servicos])

@servico_bp.route('/servico', methods=['POST'])
def add_servico():
    data = request.get_json()
    try:
        new_servico = Servico(
            descricao=data['descricao'], 
            preco=data['preco'], 
            duracao=data['duracao']
        )
        db.session.add(new_servico)
        db.session.commit()
        return jsonify({"message": "Serviço adicionado com sucesso!"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@servico_bp.route('/servico/<int:id>', methods=['GET'])
def get_servico(id):
    servico = Servico.query.get(id)
    if not servico:
        return jsonify({"message": "Serviço não encontrado"}), 404
    return jsonify({"id": servico.id_servico, "descricao": servico.descricao, "preco": servico.preco, "duracao": servico.duracao.strftime('%H:%M:%S')})

@servico_bp.route('/servico/<int:id>', methods=['PUT'])
def update_servico(id):
    data = request.get_json()
    servico = Servico.query.get(id)
    if not servico:
        return jsonify({"message": "Serviço não encontrado"}), 404
    servico.descricao = data['descricao']
    servico.preco = data['preco']
    servico.duracao = data['duracao']
    db.session.commit()
    return jsonify({"message": "Serviço atualizado com sucesso!"})

@servico_bp.route('/servico/<int:id>', methods=['DELETE'])
def delete_servico(id):
    servico = Servico.query.get(id)
    if not servico:
        return jsonify({"message": "Serviço não encontrado"}), 404
    db.session.delete(servico)
    db.session.commit()
    return jsonify({"message": "Serviço deletado com sucesso!"})
