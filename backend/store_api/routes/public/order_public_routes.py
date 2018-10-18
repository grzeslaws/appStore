from store_api import app, db
from store_api.models import Order, Orderitem, Product
from store_api.serializers import product_item_in_order
from flask import jsonify, request
import urllib.parse
import urllib.request
import certifi


@app.route("/api/public/create_order", methods=["POST"])
def create_order():

    if request.method == "POST":
        order_items = request.json["orderItems"]
        order = Order()

        for oi in order_items:
            p = Product.query.filter_by(product_uuid=oi["product"]["productUuid"]).first()
            order_item = Orderitem(order=order, product=p, quantity=oi["quantity"])
            db.session.add(order_item)

        db.session.commit()

    return jsonify({"orderUuid": order.order_uuid}), 200


@app.route("/api/public/get_order/<order_uuid>")
def get_order(order_uuid):
    order = Order.query.filter_by(order_uuid=order_uuid).first()

    order_items = []

    for oi in order.orderitems:
        p = Product.query.filter_by(id=oi.product_id).first()
        product = {}
        product["product"] = product_item_in_order(p)
        product["quantity"] = oi.quantity
        order_items.append(product)

    return jsonify({"orderItems": order_items, "orderUuid": order.order_uuid, "timestamp": order.timastamp}), 200


@app.route("/api/public/get_access_token")
def get_access_token():
    data = urllib.parse.urlencode({"grant_type": "client_credentials", "client_id": 145227,
                                   "client_secret": "12f071174cb7eb79d4aac5bc2f07563f"})
    data = data.encode("ascii")
    headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
    req = urllib.request.Request('https://secure.payu.com/pl/standard/user/oauth/authorize', data, headers)

    with urllib.request.urlopen(req, cafile=certifi.where()) as response:
        access_token = response.read()
        return access_token, 200
