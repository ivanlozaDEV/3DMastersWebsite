import sys
import os
from extensions import db  # Asegúrate de que esto apunte a la extensión correcta

# Agregar el directorio backend al path de Python
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'backend')))

from app import create_app  # Importar la función create_app
from flask_migrate import upgrade, migrate  # Asegúrate de importar migrate si lo necesitas

def initialize_database():
    app = create_app()
    with app.app_context():
        try:
            # Aplica las migraciones
            # migrate()  # Opcional: si necesitas crear nuevas migraciones
            upgrade()
            print("Database upgraded successfully!")
        except Exception as e:
            print(f"Error upgrading database: {e}")

if __name__ == "__main__":
    initialize_database()
