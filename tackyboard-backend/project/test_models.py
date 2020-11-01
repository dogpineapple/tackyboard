"""User model tests."""

# TODO: Move this to another folder if there are too many tests
# run tests with `python -m unittest test_*`
import os
import sys
from unittest import TestCase
from sqlalchemy import exc
from models import db, User
from app import app


class User_TestCase(TestCase):
    """ Test functionalities of User model.
    """
    def setUp(self):
        """Create a test client with dummy data."""
        User.query.delete()

        self.u1 = User.register(
            email="test@test.com", password="password",
            first_name="user", last_name="name"
        )

        print("Test user:", self.u1)

    def tearDown(self):
        User.query.delete()
        db.session.commit()
        db.session.remove()

    def test_register(self):
        """Tests registration functionality of User model"""
        User.register(
            email="test2@test.com", password="password2",
            first_name="user2", last_name="name2"
        )
        response = User.login("test2@test.com", "password2")
        self.assertIsInstance(response, User)

        self.assertEqual(len(User.query.all()), 2)

    # TODO: fix this test
    # def test_duplicate_register(self):
    #     """Tests registration unhappy path, duplicate email"""
    #     with self.assertRaises(exc.IntegrityError) as context:
    #         try:
    #             User.register(
    #                 email="test@test.com", password="password",
    #                 first_name="user1", last_name="name1"
    #             )
    #         except:
    #             exc_type, exc_obj, exc_tb = sys.exc_info()
    #             print("****", exc_type)