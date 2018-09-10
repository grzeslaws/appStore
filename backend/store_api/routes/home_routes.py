from store_api import app, db
from flask import jsonify
from store_api.models import Product, Category


def categories_init():
    for i in range(0, 12):
        t = Category(name="Category " + str(i))
        db.session.add(t)

    db.session.commit()


def product_init():
    db.drop_all()
    db.create_all()
    for i in range(0, 200):
        p = Product(name="Product " + str(i))
        db.session.add(p)

    db.session.commit()


@app.route("/")
def index():
    print("home")
    product_init()
    categories_init()
    return jsonify({"message": "Home"})
