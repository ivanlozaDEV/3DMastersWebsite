from flask import Flask, redirect, url_for
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
    app = Flask(__name__)
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

    # Redirigir la ruta raíz al panel de administración
    @app.route('/')
    def index():
        return redirect(url_for('admin.index'))  # Redirige a la vista principal de Flask-Admin

    return app

if __name__ == '__main__':
    app = create_app()
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)