from store_api import app, db
from flask import jsonify
from store_api.models import Product, Category, Admin
from werkzeug.security import generate_password_hash


def categories_init():
    for i in range(0, 12):
        t = Category(name="Category " + str(i))
        db.session.add(t)

    db.session.commit()


def product_init():
    db.drop_all()
    db.create_all()
    for i in range(0, 200):
        p = Product(name="Product " + str(i), price=i*10, quantity=i*2)
        db.session.add(p)

    db.session.commit()


def admin_init():
    hashed_password = generate_password_hash("admin", method="sha256")
    a = Admin(admin_name="admin", password=hashed_password)
    db.session.add(a)
    db.session.commit()


@app.route("/")
def index():
    print("home")
    product_init()
    categories_init()
    admin_init()
    return jsonify({"message": "Home"})
