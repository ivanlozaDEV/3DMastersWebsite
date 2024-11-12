from flask import Blueprint, jsonify, request
from backend.models import User, Category, Product, Quote, ProductRequest
from backend.extensions import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, get_jwt


api_blueprint = Blueprint('api', __name__)

@api_blueprint.route('/1$9DJS470cMFeSks4F$', methods=['POST'])
def user_register():
    body= request.json
    name = body.get('name')
    username = body.get('username')
    password = body.get('password')

    if User.query.filter_by(username=username).first():
        return jsonify({'error': 'Username already exists'}), 400
    
    if name is None or username is None or password is None:
        return jsonify({'error': 'Missing Data'}), 400
    
    password_hash = generate_password_hash(password)

    try:
        new_user = User(name=name, username=username, password=password_hash)
        db.session.add(new_user)
        db.session.commit()
        return jsonify({'message': 'user created succesfully'}), 201
    except Exception as error:
        db.session.rollback()
        return jsonify({'error': f"{error}"}), 500

