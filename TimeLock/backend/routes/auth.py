from werkzeug.security import generate_password_hash, check_password_hash
from flask import Flask, request, jsonify, Blueprint, redirect, url_for
from flask_cors import CORS

auth_bp = Blueprint("auth", __name__)
from server import mysql

@auth_bp.route("/sign-up", methods=['GET', 'POST'])
def sign_up():
    data = request.get_json()
    if not data:
        return jsonify({'error': 'No JSON received'}), 400

    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    print(f"""
          Flask received the following...
          username = {username!s}
          email = {email!s}
          password = {password!s}
""")

    return jsonify({'status': 'received', 'user': {'username': username, 'email': email}}), 201