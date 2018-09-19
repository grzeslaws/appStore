from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import uuid


def generate_uuid():
    return str(uuid.uuid4())


STATIC_FOLDER = "/static"
UPLOAD_FOLDER = "store_api" + STATIC_FOLDER + "/images"
ALLOWED_EXTENSIONS = set(["txt", "pdf", "png", "jpg", "jpeg", "gif"])

app = Flask(__name__, static_folder=STATIC_FOLDER)
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///test.db"
app.config["SECRET_KEY"] = "thissecretkey"

db = SQLAlchemy(app)

from store_api.routes import product_public_routes  # noqa: E402, F401
from store_api.routes import product_admin_routes  # noqa: E402, F401
from store_api.routes import home_routes  # noqa: E402, F401
from store_api.routes import order_routes  # noqa: E402, F401
from store_api.routes import login_routes  # noqa: E402, F401 
from store_api.routes import profile_routes  # noqa: E402, F401 
