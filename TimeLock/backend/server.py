from flask import Flask
from flask_cors import CORS
from routes import landing_page_route_bp
from flask_mysqldb import MySQL
from routes.auth import auth_bp
import os

app = Flask(__name__)
CORS(app)
mysql = MySQL()


def create_app():

    app.config['MYSQL_HOST'] = os.getenv('LOCALHOST')
    app.config['MYSQL_USER'] = os.getenv('ROOT')
    app.config['MYSQL_PASSWORD'] = os.getenv('PASSWORD')
    app.config['MYSQL_DB'] = 'timelockDB'
    app.config['SECRET_KEY'] = 'my_secret_key'

    mysql.init_app(app)

    app.register_blueprint(landing_page_route_bp, url_prefix='/api')
    app.register_blueprint(auth_bp, url_prefix='/api')

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)