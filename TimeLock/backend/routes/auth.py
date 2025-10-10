from werkzeug.security import generate_password_hash, check_password_hash
from flask import Flask, request, jsonify, Blueprint, redirect, url_for
from MySQLdb.cursors import DictCursor
from flask_cors import CORS

auth_bp = Blueprint("auth", __name__)
from server import mysql

@auth_bp.route("/sign-up", methods=['POST'])
def sign_up():
    data = request.get_json()
    if not data:
        return jsonify({
            'error': 'No JSON received'
            }), 400

    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    hashed_pw = generate_password_hash(password)

    cursor = mysql.connection.cursor()

    try:
        cursor.execute(
            'INSERT INTO users (username, email, password) VALUES (%s, %s, %s)', (username, email, hashed_pw)
        )
        mysql.connection.commit()
        cursor.close()

        return jsonify({
            'status': 'received', 
            'user': {
                'username': username, 
                'email': email
                },
            'redirect': '/dashboard'
            }), 201
    
    except Exception as e:
        mysql.connection.rollback()
        cursor.close()
        return jsonify({
            'error': str(e)
        }), 500

@auth_bp.route("/login", methods=['POST'])
def login():
    data = request.get_json()
    if not data:
        return jsonify({'error': 'No JSON received'}), 400

    email = data.get('email')
    password = data.get('password')

    cursor = mysql.connection.cursor(DictCursor)
    cursor.execute('SELECT * FROM users WHERE email = %s', (email,))
    user = cursor.fetchone()
    cursor.close()

    if not user:
        return jsonify({'error': 'User not found'}), 404
    
    if not check_password_hash(user['password'], password):
        return jsonify({'error': 'Incorrect password'}), 401

    return jsonify({
        'status': 'received',
        'user': {'email': email},
        'message': 'Login successful',
        'redirect': '/dashboard'
    }), 200