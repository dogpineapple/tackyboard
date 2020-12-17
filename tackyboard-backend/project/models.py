from datetime import datetime
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from sqlalchemy.exc import IntegrityError

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

    def serialize(self):
        """Serialize the instance object of a user."""
        return {
            "user_id": self.user_id,
            "first_name": self.fname,
            "last_name": self.lname,
            "email": self.email,
            "created_date": self.created_date,
        }

    @classmethod
    def register(cls, email, password, first_name, last_name):
        """ Register a new user """

        hashed_pwd = bcrypt.generate_password_hash(password).decode("UTF-8")

        user = User(email=email, password=hashed_pwd, fname=first_name, lname=last_name)

        try:
            db.session.add(user)
            db.session.commit()
        except IntegrityError:
            # Should be a sqlalchemy.exc.IntegrityError for duplicates
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


class Status(db.Model):
    """
    Allows the user to identify the current status of a task.
    Possible statuses are:
        (0, "planned"),
        (1, "in progress"),
        (2, "done"),
        (3, "dropped"),
        (4, "pending")
    """

    __tablename__ = "statuses"

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


class Tackyboard(db.Model):

    __tablename__ = "tackyboards"

    tackyboard_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(50), default="My tackyboard", nullable=False)
    created_date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow())
    last_updated = db.Column(db.DateTime, nullable=False, default=datetime.utcnow())
    user_id = db.Column(
        db.Integer, db.ForeignKey("users.user_id", ondelete="CASCADE"), nullable=True
    )

    user = db.relationship("User", backref="tackyboards")

    def serialize(self):
        """Serialize the instance object to be sent as JSON."""
        return {
            "tackyboard_id": self.tackyboard_id,
            "name": self.name,
            "created_date": self.created_date,
            "last_updated": self.last_updated,
            "user_id": self.user_id,
        }


    @classmethod
    def getAllTackyboards(cls, user_id):
        """Retrieves all tackyboards for a user(id) and returns an array of tackyboards."""

        tackyboards = cls.query.filter_by(user_id=user_id).all()
        return tackyboards

    @classmethod
    def deleteTackyboard(cls, tackyboard_id):
        """Deletes a tackyboard by tackyboard_id."""

        record = cls.query.filter_by(tackyboard_id=tackyboard_id).first()
        db.session.delete(record)
        db.session.commit()
        
        return { "message": f"Successfully deleted Tackyboard #{tackyboard_id}!" }

#TODO: Also add tests.
class Task(db.Model):

    __tablename__ = "tasks"

    task_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    status_id = db.Column(
        db.Integer,
        db.ForeignKey("statuses.status_id"),
        nullable=False,
        default=0,
    )
    task_title = db.Column(db.String(75), nullable=True)
    task_description = db.Column(db.String(100), nullable=True)
    created_date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow())
    last_status_update = db.Column(
        db.DateTime, nullable=False, default=datetime.utcnow()
    )
    deadline = db.Column(db.DateTime, nullable=True)
    tackyboard_id = db.Column(
        db.Integer,
        db.ForeignKey("tackyboards.tackyboard_id", ondelete="CASCADE"),
        nullable=True,
    )

    # TODO: change from `user` to `tackyboard`
    tackyboard = db.relationship("Tackyboard", backref="tasks")
    status = db.relationship("Status", backref="tasks")

    def serialize(self):
        """Serialize the instance object to be sent as JSON."""
        return {
            "task_id": self.task_id,
            "status_id": self.status_id,
            "task_title": self.task_title,
            "task_description": self.task_description,
            "created_date": self.created_date,
            "last_status_update": self.last_status_update,
            "deadline": self.deadline,
            "tackyboard_id": self.tackyboard_id,
        }

    @classmethod
    def add(cls, task_title, task_description, status_id, tackyboard_id, deadline=None):
        """
        Creates a Task instance and inserts into the database.
        Returns a task instance.
        """

        new_task = Task(
            task_title=task_title,
            task_description=task_description,
            status_id=status_id,
            tackyboard_id=tackyboard_id,
            deadline=deadline,
        )

        try:
            db.session.add(new_task)
            db.session.commit()  # use flush() to access the unique primary key `task_id`
        except Exception as e:
            return {"error": {"Database add error": e}}

        return new_task

    @classmethod
    def getAllTasks(cls, tackyboard_id):
        """Retrieves all tasks for a tackyboard(id) and returns an array of tasks."""

        tasks = cls.query.filter_by(tackyboard_id=tackyboard_id).all()
        
        return tasks

    @classmethod
    def deleteTask(cls, task_id):
        """Deletes a task by task_id."""

        cls.query.filter_by(task_id=task_id).first().delete()
        db.session.commit()
        
        return { "message": f"Successfully deleted Task #{task_id}!" }
    
    def save(self):
        self.last_status_update = datetime.utcnow()
        db.session.commit()

class Tackynote(db.Model):

    __tablename__ = "tackynote"

    tackynote_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    task_id = db.Column(
        db.Integer,
        db.ForeignKey("tasks.task_id", ondelete="CASCADE"),
        nullable=False,
    )
    note_title = db.Column(db.Text, nullable=False)
    note = db.Column(db.Text, nullable=False)

    task = db.relationship("Task", backref="tackynotes")

    def serialize(self):
        """Serialize the instance object to be sent as JSON."""
        return {
            "tackynote_id": self.tackynote_id,
            "task_id": self.task_id,
            "note_title": self.note_title,
            "note": self.note,
        }

    @classmethod
    def getAllTackyNotes(cls, task_id):
        """Retrieves all tacky notes for a task_id and returns an array of post notes."""

        tackynotes = cls.query.filter_by(task_id=task_id).all()
        return tackynotes

    @classmethod
    def deleteTackyNote(cls, tackynote_id):
        """Deletes a tackynote by tackynote_id."""

        tackynote = cls.query.filter_by(tackynote_id=tackynote_id).first()
        db.session.delete(tackynote)
        
        return { "message": f"Successfully deleted Tackynote #{tackynote_id}!" }


def connect_db(app):
    """Connect this database to provided Flask app."""

    db.app = app
    db.init_app(app)
