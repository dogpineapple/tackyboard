import os
from flask import Flask, request, redirect, session, g
from flask_login import (
    LoginManager,
    current_user,
    login_required,
    login_user,
    logout_user,
)
from models import db, connect_db, User, JobPost, PostNote
from flask_cors import CORS

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


@app.before_request
def add_user_to_g():
    """If user is logged in, add current user to Flask global."""

    if CURR_USER_KEY in session:
        g.user = User.query.get(session[CURR_USER_KEY])
    else:
        g.user = None


@app.route("/job-posts", methods=["POST"])
def add_job_post():
    """Add a job posting card.
    Request object expects: the job listing URL, origin OR form data for self-input

    If the form isn't valid, return error.

    If a URL is provided, then run webscraper on the URL. The scraping steps will be based
        on the origin_name provided.

    If successful, return json object.
    """

    # if request.json['scrape'] = True, then run the webscraper. else, use manual input form.

    # execute webscrapper
    # webscrapper returns the job details/company associated
    # create an instance of the job_post model
    # db.add(job_post_instance)
    # db.commit()
    # return successful json message or w/e

    try:
        post_url = request.json["post_url"]
        company = request.json["company"]
        position = request.json["position"]
        origin_name = request.json["origin_name"]
        job_description = request.json["job_description"]

        new_job_post = JobPost.add(post_url, company, position, origin_name)

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
