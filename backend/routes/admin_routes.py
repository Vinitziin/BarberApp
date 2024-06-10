from flask import Blueprint, request, jsonify
from models import db, Usuario, Funcionario, Servico, Agendamento
from auth.auth_routes import token_required

admin_bp = Blueprint('admin_bp', __name__)

@admin_bp.route('/admin/usuarios', methods=['GET'])
@token_required
def get_usuarios(current_user):
    if current_user.role != 'admin':
        return jsonify({"message": "Acesso negado!"}), 403
    usuarios = Usuario.query.all()
    return jsonify([{"id": usuario.id_usuario, "nome": usuario.nome, "email": usuario.email, "role": usuario.role} for usuario in usuarios])

@admin_bp.route('/admin/funcionarios', methods=['GET'])
@token_required
def get_funcionarios(current_user):
    if current_user.role != 'admin':
        return jsonify({"message": "Acesso negado!"}), 403
    funcionarios = Funcionario.query.all()
    return jsonify([{"id": funcionario.id_funcionario, "id_usuario": funcionario.id_usuario, "contato": funcionario.contato, "cargo": funcionario.cargo} for funcionario in funcionarios])

@admin_bp.route('/admin/servicos', methods=['GET'])
@token_required
def get_servicos(current_user):
    if current_user.role != 'admin':
        return jsonify({"message": "Acesso negado!"}), 403
    servicos = Servico.query.all()
    return jsonify([{"id": servico.id_servico, "descricao": servico.descricao, "preco": servico.preco, "duracao": servico.duracao.strftime('%H:%M:%S')} for servico in servicos])

@admin_bp.route('/admin/agendamentos', methods=['GET'])
@token_required
def get_agendamentos(current_user):
    if current_user.role != 'admin':
        return jsonify({"message": "Acesso negado!"}), 403
    agendamentos = Agendamento.query.all()
    return jsonify([{
        "id_agendamento": agendamento.id_agendamento,
        "id_usuario": agendamento.id_usuario,
        "id_funcionario": agendamento.id_funcionario,
        "id_servico": agendamento.id_servico,
        "data": agendamento.data.strftime('%Y-%m-%d'),
        "hora": agendamento.hora.strftime('%H:%M:%S')
    } for agendamento in agendamentos])
