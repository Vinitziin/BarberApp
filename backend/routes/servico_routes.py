from flask import Blueprint, jsonify, request
from models import db, Servico

servico_bp = Blueprint('servico_bp', __name__)

@servico_bp.route('/servicos', methods=['GET'])
def get_servicos():
    servicos = Servico.query.all()
    return jsonify([{
        'id_servico': servico.id_servico, 
        'descricao': servico.descricao, 
        'preco': str(servico.preco), 
        'duracao': servico.duracao.strftime('%H:%M:%S')
    } for servico in servicos])

@servico_bp.route('/servico', methods=['POST'])
def add_servico():
    data = request.get_json()
    new_servico = Servico(
        descricao=data['descricao'],
        preco=data['preco'],
        duracao=data['duracao']
    )
    db.session.add(new_servico)
    db.session.commit()
    return jsonify({
        'id_servico': new_servico.id_servico, 
        'descricao': new_servico.descricao, 
        'preco': str(new_servico.preco), 
        'duracao': new_servico.duracao.strftime('%H:%M:%S')
    }), 201

@servico_bp.route('/servico/<int:id>', methods=['GET'])
def get_servico(id):
    servico = Servico.query.get(id)
    if servico is None:
        return jsonify({'error': 'Servico not found'}), 404
    return jsonify({
        'id_servico': servico.id_servico, 
        'descricao': servico.descricao, 
        'preco': str(servico.preco), 
        'duracao': servico.duracao.strftime('%H:%M:%S')
    })

@servico_bp.route('/servico/<int:id>', methods=['PUT'])
def update_servico(id):
    data = request.get_json()
    servico = Servico.query.get(id)
    if servico is None:
        return jsonify({'error': 'Servico not found'}), 404
    servico.descricao = data['descricao']
    servico.preco = data['preco']
    servico.duracao = data['duracao']
    db.session.commit()
    return jsonify({
        'id_servico': servico.id_servico, 
        'descricao': servico.descricao, 
        'preco': str(servico.preco), 
        'duracao': servico.duracao.strftime('%H:%M:%S')
    })

@servico_bp.route('/servico/<int:id>', methods=['DELETE'])
def delete_servico(id):
    servico = Servico.query.get(id)
    if servico is None:
        return jsonify({'error': 'Servico not found'}), 404
    db.session.delete(servico)
    db.session.commit()
    return jsonify({'message': 'Servico deleted successfully'})
