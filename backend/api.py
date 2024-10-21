from flask import Blueprint, jsonify, request
from models import Item  # Asegúrate de que este modelo esté definido
from extensions import db

api_blueprint = Blueprint('api', __name__)

@api_blueprint.route('/items', methods=['GET'])
def get_items():
    items = Item.query.all()
    return jsonify([item.to_dict() for item in items])  # Asegúrate de que Item tenga un método to_dict

@api_blueprint.route('/items', methods=['POST'])
def add_item():
    data = request.json
    new_item = Item(name=data['name'])  # Asumiendo que el modelo tiene un campo 'name'
    db.session.add(new_item)
    db.session.commit()
    return jsonify(new_item.to_dict()), 201
