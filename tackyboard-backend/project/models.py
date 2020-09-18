from datetime import datetime
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt

bcrypt = Bcrypt()
db = SQLAlchemy()


class User(db.Model):

    __tablename__ = 'users'

    user_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    email = db.Column(db.String(60), nullable=False, unique=True)
    password = db.Column(db.String(30), nullable=False)
    fname = db.Column(db.String(30), nullable=False)
    lname = db.Column(db.String(30), nullable=False)
    created_date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    def __repr__(self):
        return f"<User #{self.id}: {self.email}>"

    @classmethod
    def register(cls, email, password, first_name, last_name):
        """ Register a new user """

        hashed_pwd = bcrypt.generate_password_hash(password).decode("UTF-8")

        user = User(email=email, password=hashed_pwd, fname=first_name, lname=last_name)

        try:
            db.session.add(user)
            db.session.commit()
        except:
            return {"error": {"email": "Email is already used."}}

        return user

    @classmethod
    def authenticate(cls, email, password):
        """
        Search for the user's record in db, if passwords match, returns the user.
        If unable to match or find the user, return False
        """
        user = cls.query.filter_by(username=username).first()

        if user:
            is_auth = bcrypt.check_password_hash(user.password, password)
            if is_auth:
                return user

        return False


class ApplicationStatus(db.Model):

    __tablename__ = 'application_statuses'

    status_id = db.Column(db.Integer, primary_key=True)
    status = db.Column(db.String, nullable=False)


class ClickCopyNote(db.Model):

    __tablename__ = 'click_copy_notes'

    clickcopy_note_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id', ondelete='CASCADE'), nullable=False)
    note = db.Column(db.Text, nullable=False)

    user = db.relationship('User', backref='click_copy_notes')

# class UrlOrigin():

#     __tablename__ = 'url_origins'

#     url_origin_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
#     origin_name = db.Column(db.String(50), nullable=False, default="Unknown")

class JobPost(db.Model):

    __tablename__ = 'job_posts'

    job_post_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    post_url = db.Column(db.String, nullable=False)
    company = db.Column(db.String(50), nullable=False)
    application_status_id = db.Column(db.Integer, db.ForeignKey('application_statuses.status_id'), nullable=False, default=0)
    position = db.Column(db.String(50), nullable=False, default='Unknown')
    origin_name = db.Column(db.String(50), nullable=False, default="Unknown")
    created_date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow())
    last_status_update = db.Column(db.DateTime, nullable=False, default=datetime.utcnow())
    interview_date_time = db.Column(db.DateTime, nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id', ondelete='CASCADE'), nullable=False)

    user = db.relationship('User', backref='job_posts')
    # origin = db.relationship('UrlOrigin', backref='job_posts')
    status = db.relationship('ApplicationStatus', backref='job_posts')

class PostNote(db.Model):

    __tablename__ = 'post_notes'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    post_id = db.Column(db.Integer, db.ForeignKey('job_posts.job_post_id', ondelete='CASCADE'), nullable=False)
    note = db.Column(db.Text, nullable=False)

    job_post = db.relationship('JobPost', backref='post_notes')


def connect_db(app):
    """Connect this database to provided Flask app."""

    db.app = app
    db.init_app(app)
