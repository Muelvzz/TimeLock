from flask import Blueprint, jsonify

api_bp = Blueprint('api', __name__)

@api_bp.route('/landing-page')
def get_api():
    api = {
        "title1": "Where teams and time",
        "title2": "tracking data meet.",
        }
    return jsonify(api)