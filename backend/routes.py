from flask import Blueprint, jsonify, request
from backend.models import Item
from extensions import db

api_blueprint = Blueprint('api', __name__)

@api_blueprint.route('/items', methods=['GET'])
def get_items():
    items = Item.query.all()
    items_list = [{"id": item.id, "name": item.name} for item in items]
    return jsonify(items_list)

@api_blueprint.route('/items', methods=['POST'])
def add_item():
    try:
        data = request.json
        if 'name' not in data:
            return jsonify({"error": "Name is required"}), 400  # Respuesta si falta el campo 'name'

        new_item = Item(name=data['name'])
        db.session.add(new_item)
        db.session.commit()
        return jsonify({"message": "Item added successfully!"}), 201
    except Exception as e:
        print(f"Error adding item: {e}")  # Log del error
        return jsonify({"error": "Failed to add item"}), 500  # Respuesta en caso de error
