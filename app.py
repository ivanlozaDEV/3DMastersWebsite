from flask import Flask, redirect, url_for, send_from_directory
from extensions import db
from flask_cors import CORS
from backend.routes import api_blueprint
from backend.config import Config
from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView
from backend.models import Item  # Asegúrate de tener el modelo definido en models.py
from dotenv import load_dotenv
import os

# Cargar variables de entorno desde el archivo .env
load_dotenv()

def create_app():
    app = Flask(__name__, static_folder='dist', static_url_path='')  # Cambia a 'dist'

    app.config.from_object(Config)

    # Inicializar la base de datos
    db.init_app(app)

    # Habilitar CORS
    CORS(app)

    # Registrar las rutas de la API
    app.register_blueprint(api_blueprint, url_prefix='/api')

    # Configurar Flask-Admin
    admin = Admin(app, name='Admin Panel', template_mode='bootstrap3')
    admin.add_view(ModelView(Item, db.session))  # Agrega el modelo Item al panel de administración

    # Ruta para el frontend
    @app.route('/')
    def serve_frontend():
        return send_from_directory(app.static_folder, 'index.html')

    # Ruta para servir otros archivos estáticos (CSS, JS, etc.)
    @app.route('/<path:path>')
    def send_static(path):
        return send_from_directory(app.static_folder, path)

    return app

if __name__ == '__main__':
    app = create_app()
    PORT = int(os.environ.get('PORT', 3001))
    debug_mode = os.environ.get('FLASK_DEBUG', '0') == '1'
    app.run(host='0.0.0.0', port=PORT, debug=debug_mode)  # Usar la variable de entorno para debug
