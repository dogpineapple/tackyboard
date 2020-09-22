import os
from flask import Flask, request, redirect, session, g
from flask_login import (
  LoginManager,
  current_user,
  login_required,
  login_user,
  logout_user
)
from models import db, connect_db, User, JobPost, PostNote
from flask_cors import CORS

CURR_USER_KEY = "curr_user"

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', 'postgresql:///tackyboard')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'dianaiscoolaf')

connect_db(app)

@app.before_request
def add_user_to_g():
    """If user is logged in, add current user to Flask global."""

    if CURR_USER_KEY in session:
        g.user = User.query.get(session[CURR_USER_KEY])
    else:
        g.user = None


@app.route('/job-posts/new', methods=["POST", "GET"])
def add_job_post():
    """Add a job posting card. 
    Request object expects: the job listing URL, origin OR form data for self-input

    If the form isn't valid, return error. 

    If a URL is provided, then run webscraper on the URL. The scraping steps will be based
        on the origin_name provided.  
    """

    # if request.json['scrape'] = True, then run the webscraper. else, use manual input form.
    
        # execute webscrapper
        # webscrapper returns the job details/company associated
        # create an instance of the job_post model
        # db.add(job_post_instance)
        # db.commit()
        # return successful json message or w/e



# @app.route('/test', methods=["POST"])
# def test():
#     """Dev test route"""