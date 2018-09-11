from store_api import app
from flask import jsonify, request
from store_api.models import Profile

@app.route("/api/admi_profile/<id>", methods=["POST"])
def admi_profile(id):
    if request.method == "POST":
        p = Profile.query.filter_by(id=id).first()

