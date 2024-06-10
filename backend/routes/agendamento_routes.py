from flask import Blueprint, request, jsonify
from models import db, Agendamento, Usuario
from flask_mail import Message
from auth.auth_routes import token_required
from mail_extension import mail

agendamento_bp = Blueprint('agendamento_bp', __name__)

def send_notification(email, subject, body):
    msg = Message(subject, recipients=[email])
    msg.body = body
    mail.send(msg)

@agendamento_bp.route('/agendamentos', methods=['GET'])
@token_required
def get_agendamentos(current_user):
    agendamentos = Agendamento.query.all()
    resultado = [
        {
            "id_agendamento": agendamento.id_agendamento,
            "id_usuario": agendamento.id_usuario,
            "id_funcionario": agendamento.id_funcionario,
            "id_servico": agendamento.id_servico,
            "data": agendamento.data.strftime('%Y-%m-%d'),
            "hora": agendamento.hora.strftime('%H:%M:%S')
        } 
        for agendamento in agendamentos
    ]
    return jsonify(resultado)

@agendamento_bp.route('/agendamento', methods=['POST'])
@token_required
def add_agendamento(current_user):
    data = request.get_json()
    try:
        new_agendamento = Agendamento(
            id_usuario=data['id_usuario'],
            id_funcionario=data['id_funcionario'],
            id_servico=data['id_servico'],
            data=data['data'],
            hora=data['hora']
        )
        db.session.add(new_agendamento)
        db.session.commit()

        user = Usuario.query.get(data['id_usuario'])
        send_notification(user.email, "Novo Agendamento", "Seu agendamento foi confirmado!")

        return jsonify({"message": "Agendamento adicionado com sucesso!"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@agendamento_bp.route('/agendamento/<int:id>', methods=['GET'])
@token_required
def get_agendamento(current_user, id):
    agendamento = Agendamento.query.get(id)
    if not agendamento:
        return jsonify({"message": "Agendamento não encontrado"}), 404
    return jsonify({
        "id_agendamento": agendamento.id_agendamento,
        "id_usuario": agendamento.id_usuario,
        "id_funcionario": agendamento.id_funcionario,
        "id_servico": agendamento.id_servico,
        "data": agendamento.data.strftime('%Y-%m-%d'),
        "hora": agendamento.hora.strftime('%H:%M:%S')
    })

@agendamento_bp.route('/agendamento/<int:id>', methods=['PUT'])
@token_required
def update_agendamento(current_user, id):
    data = request.get_json()
    agendamento = Agendamento.query.get(id)
    if not agendamento:
        return jsonify({"message": "Agendamento não encontrado"}), 404
    agendamento.id_usuario = data['id_usuario']
    agendamento.id_funcionario = data['id_funcionario']
    agendamento.id_servico = data['id_servico']
    agendamento.data = data['data']
    agendamento.hora = data['hora']
    db.session.commit()
    return jsonify({"message": "Agendamento atualizado com sucesso!"})

@agendamento_bp.route('/agendamento/<int:id>', methods=['DELETE'])
@token_required
def delete_agendamento(current_user, id):
    agendamento = Agendamento.query.get(id)
    if not agendamento:
        return jsonify({"message": "Agendamento não encontrado"}), 404
    db.session.delete(agendamento)
    db.session.commit()
    return jsonify({"message": "Agendamento deletado com sucesso!"})
