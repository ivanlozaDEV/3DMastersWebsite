import sys
import os

# Agregar el directorio src al path de Python
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'src')))

from backend import create_app, db  # Asegúrate de que la importación sea correcta
from flask_migrate import upgrade

def initialize_database():
    app = create_app()
    with app.app_context():
        try:
            # Aplica las migraciones
            upgrade()
            print("Database upgraded successfully!")
        except Exception as e:
            print(f"Error upgrading database: {e}")

if __name__ == "__main__":
    initialize_database()
