from werkzeug.utils import secure_filename
from store_api import app, db, generate_uuid
from flask import request, jsonify, send_from_directory
from store_api.models import Product, Category
from store_api.serializers import product_item
from sqlalchemy import desc
import time
import os

imagePath = None
productUuid = None


def categories_init():
    for i in range(0, 12):
        t = Category(name="Category " + str(i))
        db.session.add(t)

    db.session.commit()


@app.route('/api/get_image/<path:filename>')
def download_file(filename):
    return send_from_directory(os.path.abspath(app.config['UPLOAD_FOLDER']),
                               filename, as_attachment=False)


def save_image():

    if request.files:
        global productUuid
        global imagePath
        productUuid = generate_uuid()
        file = request.files["file"]
        file_name = secure_filename(file.filename)
        imagePath = productUuid + "_" + file_name
        file.save(os.path.join(
            app.config['UPLOAD_FOLDER'], imagePath))


def product_describe():

    if request.json:
        global productUuid
        global imagePath
        p = Product(name=request.json["name"], product_uuid=productUuid, image_path=imagePath)
        db.session.add(p)
        db.session.commit()

        productUuid = generate_uuid()
        imagePath = None


def add_product():
    save_image()
    time.sleep(0.1)
    product_describe()


@app.route("/api/add_product_image", methods=["POST"])
@app.route("/api/products", methods=["GET", "POST"])
def order():
    if request.method == "POST":
        add_product()

        return jsonify({"message": "Product has been added!"}), 201

    if request.method == "GET":

        products = Product.query.order_by(desc(Product.id)).all()
        productList = []
        for p in products:
            productList.append(product_item(p))
        return jsonify({"products": productList})


@app.route("/api/edit_product/<product_uuid>", methods=["POST", "PUT"])
def edit_product(product_uuid):

    if request.method == "PUT":
        p = Product.query.filter_by(product_uuid=product_uuid).first()
        p.name = request.json["name"]
        db.session.commit()
        return jsonify({"message": "Product has been updated!"})


@app.route("/api/edit_product_image/<product_uuid>", methods=["POST"])
def edit_product_image(product_uuid):
    if request.method == "POST":
        print("product_uuid: ", product_uuid)
        if request.files:
            file = request.files["file"]
            file_name = secure_filename(file.filename)
            imagePath = product_uuid + "_" + file_name
            file.save(os.path.join(
                app.config['UPLOAD_FOLDER'], imagePath))

            p = Product.query.filter_by(product_uuid=product_uuid).first()
            print("p: ", p)
            p.image_path = imagePath
            db.session.commit()
        return jsonify({"message": "Image has been changed!"})
    return jsonify({"message": "Image has been changed!"})
