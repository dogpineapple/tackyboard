from datetime import datetime
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt

bcrypt = Bcrypt()
db = SQLAlchemy()


class User(db.Model):

    __tablename__ = "users"

    user_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    email = db.Column(db.String(60), nullable=False, unique=True)
    password = db.Column(db.String, nullable=False)
    fname = db.Column(db.String(60), nullable=False)
    lname = db.Column(db.String(60), nullable=False)
    created_date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    def __repr__(self):
        return f"<User #{self.user_id}: {self.email}>"

    @classmethod
    def register(cls, email, password, first_name, last_name):
        """ Register a new user """

        hashed_pwd = bcrypt.generate_password_hash(password).decode("UTF-8")

        user = User(email=email, password=hashed_pwd, fname=first_name, lname=last_name)

        try:
            db.session.add(user)
            db.session.commit()

        except:
            return {"error": "E-mail already exists in the database."}

        return user

    @classmethod
    def login(cls, email, password):
        """
        Search for the user's record in db, if passwords match, returns the user.
        If unable to match or find the user, return False
        """
        user = cls.query.filter_by(email=email).first()

        if user:
            is_auth = bcrypt.check_password_hash(user.password, password)
            if is_auth:
                return user

        return False

    def serialize(self):
        """Serialize the instance object of a user."""
        return {
            "user_id": self.user_id,
            "first_name": self.fname,
            "last_name": self.lname,
            "email": self.email,
            "created_date": self.created_date,
        }


class ApplicationStatus(db.Model):

    __tablename__ = "application_statuses"

    status_id = db.Column(db.Integer, primary_key=True)
    status = db.Column(db.String, nullable=False)


class ClickCopyNote(db.Model):

    __tablename__ = "click_copy_notes"

    clickcopy_note_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(
        db.Integer, db.ForeignKey("users.user_id", ondelete="CASCADE"), nullable=False
    )
    note = db.Column(db.Text, nullable=False)

    user = db.relationship("User", backref="click_copy_notes")


class JobPost(db.Model):

    __tablename__ = "job_posts"

    job_post_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    post_url = db.Column(db.String, nullable=False)
    company = db.Column(db.String(50), nullable=False)
    application_status_id = db.Column(
        db.Integer,
        db.ForeignKey("application_statuses.status_id"),
        nullable=False,
        default=0,
    )
    position = db.Column(db.String(50), nullable=False, default="Unknown")
    origin_name = db.Column(db.String(50), nullable=False, default="Unknown")
    created_date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow())
    last_status_update = db.Column(
        db.DateTime, nullable=False, default=datetime.utcnow()
    )
    interview_date_time = db.Column(db.DateTime, nullable=True)
    user_id = db.Column(
        db.Integer, db.ForeignKey("users.user_id", ondelete="CASCADE"), nullable=True
    )

    user = db.relationship("User", backref="job_posts")
    status = db.relationship("ApplicationStatus", backref="job_posts")

    def serialize(self):
        """Serialize the instance object to be sent as JSON."""
        return {
            "job_post_id": self.job_post_id,
            "post_url": self.post_url,
            "company": self.company,
            "application_status_id": self.application_status_id,
            "position": self.position,
            "origin_name": self.origin_name,
            "created_date": self.created_date,
            "last_status_update": self.last_status_update,
            "interview_date_time": self.interview_date_time,
            "user_id": self.user_id,
        }

    @classmethod
    def add(cls, post_url, company, position, origin_name, user_id):
        """
        Creates an instance of JobPost and inserts into the database.
        Returns a job_post instance.
        """

        new_job_post = JobPost(
            post_url=post_url,
            company=company,
            position=position,
            origin_name=origin_name,
            user_id=user_id,
        )

        try:
            db.session.add(new_job_post)
            db.session.flush()  # use flush() to access the unique primary key `job_post_id`
        except Exception as e:
            return {"error": {"Database add error": e}}

        return new_job_post


class PostNote(db.Model):

    __tablename__ = "post_notes"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    job_post_id = db.Column(
        db.Integer,
        db.ForeignKey("job_posts.job_post_id", ondelete="CASCADE"),
        nullable=False,
    )
    note_title = db.Column(db.Text, nullable=False)
    note = db.Column(db.Text, nullable=False)

    job_post = db.relationship("JobPost", backref="post_notes")

    def serialize(self):
        """Serialize the instance object to be sent as JSON."""
        return {
            "post_note_id": self.id,
            "job_post_id": self.job_post_id,
            "note_title": self.note_title,
            "note": self.note,
        }


def connect_db(app):
    """Connect this database to provided Flask app."""

    db.app = app
    db.init_app(app)
