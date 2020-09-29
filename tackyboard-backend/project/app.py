import os
from flask import Flask, request, redirect, session, jsonify
from flask_login import (
    LoginManager,
    current_user,
    login_required,
    login_user,
    logout_user,
)
from models import db, connect_db, User, JobPost, PostNote
from flask_cors import CORS
from functools import wraps
import jwt

CURR_USER_KEY = "curr_user"

app = Flask(__name__)
CORS(app)

app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get(
    "DATABASE_URL", "postgresql:///tackyboard"
)
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SQLALCHEMY_ECHO"] = True
app.config["SECRET_KEY"] = os.environ.get("SECRET_KEY", "dianaiscoolaf")

connect_db(app)


##### DECORATORS #####
def token_required(f):
    @wraps(f)
    def _verify(*args, **kwargs):
        token = request.json.get("_token", None)

        invalid_msg = {
            "message": "Invalid token. Registration and / or authentication required",
            "authenticated": False,
        }
        expired_msg = {
            "message": "Expired token. Reauthentication required.",
            "authenticated": False,
        }

        if not token:
            return jsonify(invalid_msg), 401

        try:
            data = jwt.decode(token, app.config["SECRET_KEY"])
            print("data....", data, "email from data...", data["email"])
            user = User.query.filter_by(email=data["email"]).first()
            if not user:
                raise RuntimeError("User not found")
            return f(user, *args, **kwargs)
        # except jwt.ExpiredSignatureError:
        #     return jsonify(expired_msg), 401 # 401 is Unauthorized HTTP status code
        except (jwt.InvalidTokenError, Exception) as e:
            print(e)
            return jsonify(invalid_msg), 401

    return _verify


################
# USERS ROUTES #
################


@app.route("/register", methods=["POST"])
def register():
    """Register a new user."""

    resp = User.register(**request.json)

    if isinstance(resp, User):
        return (resp.serialize(), 201)

    return (resp, 400)


@app.route("/login", methods=["POST"])
def login():
    """Logs in an existing user."""

    resp = User.login(**request.json)

    if resp:
        # jwt.encode returns a byte data type
        encoded_jwt = jwt.encode(
            {"user_id": resp.user_id, "email": resp.email},
            app.config["SECRET_KEY"],
            algorithm="HS256",
        )
        return ({"_token": encoded_jwt.decode("utf-8")}, 200)

    return ({"error": "E-mail and password did not match."}, 400)


# must be LOGGED IN, SAME USER
@app.route("/users/<user_id>", methods=["PATCH"])
@token_required
def userUpdate(user_id):
    """Update an existing, logged-in user."""
    

####################
# JOB POSTS ROUTES #
####################

@app.route("/job-posts", methods=["POST"])
@token_required
def add_job_post(user):
    """Add a job posting card.
    Request object expects: the job listing URL, origin OR form data for self-input

    If the form isn't valid, return error.

    If a URL is provided, then run webscraper on the URL. The scraping steps will be based
        on the origin_name provided.

    If successful, return json object.
    """

    try:
        user_id = user.user_id
        post_url = request.json["post_url"]
        company = request.json["company"]
        position = request.json["position"]
        origin_name = request.json["origin_name"]
        job_description = request.json["job_description"]

        new_job_post = JobPost.add(post_url, company, position, origin_name, user_id)

        new_post_note = PostNote(
            job_post_id=new_job_post.job_post_id,
            note=job_description,
            note_title="Job Listing Details",
        )
        db.session.add(new_post_note)
        db.session.commit()

    except Exception as e:
        return (f"error occurred when creating the job post, {e}", 400)

    return (
        {
            "job_post": new_job_post.serialize(),
            "post_notes": [new_post_note.serialize()],
        },
        201,
    )


@app.route("/job-posts/<job_post_id>", methods=["DELETE"])
def remove_job_post(job_post_id):
    """
    Removes a job post by job id.
    Returns a json message confirmation of deletion success.
    """

    JobPost.query.filter_by(job_post_id=job_post_id).delete()
    db.session.commit()

    return ({"message": f"Job Post #{job_post_id} has been deleted"}, 200)

#####################
# POST NOTES ROUTES #
#####################

@app.route("/job-posts/<job_post_id>/post-notes", methods=["POST"])
@token_required
def add_post_note(user, job_post_id):
    try:
        post_note_title = request.json["note_title"]
        note = request.json["note"]
        new_post_note = PostNote(job_post_id=job_post_id, note=note, note_title=post_note_title)
        db.session.add(new_post_note)
        db.session.commit()
    except Exception as e:
        return(f"error occurred when creating new post note, {e}", 400)
    return (
        {
            "post_note": new_post_note.serialize(),
        },
        201,
    )

# implement route/view fxn to add a new post note to a job post


