import os
from flask import Flask, request, redirect, session, jsonify, make_response
from flask_login import (
    LoginManager,
    current_user,
    login_required,
    login_user,
    logout_user,
)
from models import db, connect_db, User, Task, Tackynote, Tackyboard
from flask_cors import CORS
from functools import wraps
import jwt

CURR_USER_KEY = "curr_user"
DOMAIN = "localhost:3000"

app = Flask(__name__)
CORS(app, supports_credentials=True, origins="http://localhost:3000")

app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get(
    "DATABASE_URL", "postgresql:///tackyboard"
)
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SQLALCHEMY_ECHO"] = False
app.config["SECRET_KEY"] = os.environ.get("SECRET_KEY", "dianaiscoolaf")

connect_db(app)


##### DECORATORS #####
def token_required(f):
    @wraps(f)
    def _verify(*args, **kwargs):
        token = request.cookies.get("token")

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
        encoded_jwt = jwt.encode(
            {"user_id": resp.user_id, "email": resp.email},
            app.config["SECRET_KEY"],
            algorithm="HS256",
        )
        res = make_response(User.serialize())
        res.set_cookie(
            "token", value=encoded_jwt.decode("utf-8"), httponly=True, domain=DOMAIN
        )
        return (res, 201)

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
        res = make_response(resp.serialize())
        res.set_cookie(
            "token", encoded_jwt.decode("utf-8"), httponly=True, domain=DOMAIN
        )
        return res

    return ({"error": "E-mail and password did not match."}, 400)


# must be LOGGED IN, SAME USER
@app.route("/users/<user_id>", methods=["PATCH"])
@token_required
def userUpdate(user_id):
    """Update an existing, logged-in user."""


@app.route("/logout", methods=["GET"])
def logout():
    """Logout a user."""
    res = make_response()
    print(request.cookies.get("token"))
    res.delete_cookie("token")
    return res


####################
# TACKYBOARD ROUTES #
####################


@app.route("/tackyboards", methods=["GET"])
@token_required
def get_tackyboards(user):
    """Retrieve all tackyboards for a user."""

    # query for the job posts in the database
    tackyboards = Tackyboard.getAllTackyboards(user.user_id)

    # list comprehension to serialize all the job_post
    return (
        {"tackyboards": [tackyboard.serialize() for tackyboard in tackyboards]},
        200,
    )


@app.route("/tackyboards", methods=["POST"])
@token_required
def add_tackyboard(user):
    """Create a new tackyboard for a user, expects `user_id` and `name` (of tackyboard)"""
    try:
        user_id = user.user_id
        name = request.json["name"]

        new_tackyboard = Tackyboard(user_id=user_id, name=name)
        db.session.add(new_tackyboard)
        db.session.commit()

    except Exception as e:
        return (f"error occurred when creating the tackyboard, {e}", 400)

    return (
        {
            "tackyboard": new_tackyboard.serialize(),
        },
        201,
    )


@app.route("/tackyboards/<tackyboard_id>", methods=["DELETE"])
@token_required
def delete_tackyboard(user, tackyboard_id):
    """
    Deletes a tackyboard by tackyboard_id.
    Returns { "message": "Deleted Tackyboard #[n]" }
    """
    print("yeeet")
    message = Tackyboard.deleteTackyboard(tackyboard_id)

    return (message, 200)


# TODO: PATCH route for a tackyboard -> should allow renaming a tackyboard
# and return the entire serialized tackyboard
@app.route("/tackyboards/<tackyboard_id>", methods=["PATCH"])
@token_required
def patch_tackyboard(user, tackyboard_id):
    # TODO: implement code for the patch.
    return ({"message": "route is under development"}, 200)


####################
# TASK ROUTES #
####################


@app.route("/tackyboard/<tackyboard_id>/tasks", methods=["GET"])
@token_required
def get_tasks(user, tackyboard_id):
    """Retrieve all tasks for a tackyboard."""

    # query for the job posts in the database
    tasks = Task.getAllTasks(tackyboard_id)

    # list comprehension to serialize all the job_post
    return ({"tasks": [task.serialize() for task in tasks]}, 200)


@app.route("/tackyboard/<tackyboard_id>/tasks/<task_id>", methods=["GET"])
@token_required
def get_task(user, tackyboard_id, task_id):
    """Retrieve all tasks for a tackyboard."""

    task = Task.query.filter_by(task_id=task_id).first()
    tackynotes = Tackynote.getAllTackyNotes(task_id)

    
    # list comprehension to serialize all 
    return (
        {
            "task": task.serialize(),
            "tackynotes": [tackynote.serialize() for tackynote in tackynotes],
        },
        200,
    )


@app.route("/tackyboard/<tackyboard_id>/tasks", methods=["POST"])
@token_required
def add_task(user, tackyboard_id):
    """
    Add a task to a tackyboard.
    If successful, return json object.
    """
    try:
        task_title = request.json["task_title"]
        task_description = request.json.get("task_description")
        status_id = request.json["status_id"]
        deadline = request.json["deadline"]  # can be None or a date.
        new_task = Task.add(
            task_title, task_description, status_id, tackyboard_id, deadline
        )
    except Exception as e:
        return (f"error occurred when creating the task, {e}", 400)
    return (
        {
            "task": new_task.serialize(),
        },
        201,
    )


@app.route("/tackyboard/<tackyboard_id>/tasks/<task_id>", methods=["DELETE"])
def delete_task(tackyboard_id, task_id):
    """
    Removes a job post by task id.
    Returns a json message confirmation of deletion success.
    """

    Task.query.filter_by(task_id=task_id).delete()
    db.session.commit()

    return ({"message": f"Task #{task_id} has been deleted"}, 200)


#####################
# TACKYNOTES ROUTES #
#####################

@app.route("/tackyboard/<tackyboard_id>/tasks/<task_id>/tackynotes", methods=["POST"])
@token_required
def add_tackynotes(user, tackyboard_id, task_id):
    """
    adds tacky note by task id
    Returns a json message of post note additions
    """
    try:
        tackynote_title = request.json["note_title"]
        note = request.json["note"]
        new_tackynote = Tackynote(
            task_id=task_id, note=note, note_title=tackynote_title
        )
        print(new_tackynote)
        db.session.add(new_tackynote)
        db.session.commit()
    except Exception as e:
        print(e)
        return (f"error occurred when creating new post note, {e}", 400)
    return (
        {
            "tackynote": new_tackynote.serialize(),
        },
        201,
    )


@app.route(
    "/tackyboard/<tackyboard_id>/tasks/<task_id>/tackynotes/<tackynote_id>",
    methods=["DELETE"],
)
@token_required
def delete_tackynote(user, tackyboard_id, task_id, tackynote_id):
    """
    Deletes tacky note by task id.
    Returns message on successful deletion.
    """
    message = Tackynote.deleteTackyNote(tackynote_id)
    return (message, 200)


@app.route("/tackyboard/<tackyboard_id>/tasks/<task_id>/tackynotes", methods=["GET"])
@token_required
def get_tackynotes(user, tackyboard_id, task_id):
    """Retrieve all tackynotes for a user."""

    # query for the job posts in the database
    tackynotes = Tackynote.getAllTackyNotes(task_id)

    # list comprehension to serialize all the job_post
    return ({"tackynotes": [tackynotes.serialize() for tackynote in tackynotes]}, 200)
