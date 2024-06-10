from flask import Flask
from flask_migrate import Migrate
from models import db
from config import Config
from routes.usuario_routes import usuario_bp
from routes.funcionario_routes import funcionario_bp
from routes.servico_routes import servico_bp
from routes.agendamento_routes import agendamento_bp
from auth.auth_routes import auth_bp
from routes.admin_routes import admin_bp
from mail_extension import mail

app = Flask(__name__)
app.config.from_object(Config)

db.init_app(app)
migrate = Migrate(app, db)
mail.init_app(app)

app.register_blueprint(usuario_bp, url_prefix='/api')
app.register_blueprint(funcionario_bp, url_prefix='/api')
app.register_blueprint(servico_bp, url_prefix='/api')
app.register_blueprint(agendamento_bp, url_prefix='/api')
app.register_blueprint(auth_bp, url_prefix='/api/auth')
app.register_blueprint(admin_bp, url_prefix='/api')

@app.route('/')
def home():
    return "Bem-vindo à Barbearia!"

if __name__ == "__main__":
    app.run(debug=True)
