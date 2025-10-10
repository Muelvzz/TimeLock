from flask import Blueprint, jsonify

landing_page_route_bp = Blueprint('landing_page_route', __name__)

@landing_page_route_bp.route('/landing-page')
def get_landing_page_route():
    landing_page_api = {
        "title1": "Where teams and time",
        "title2": "tracking data meet.",
        }
    return jsonify(landing_page_api)