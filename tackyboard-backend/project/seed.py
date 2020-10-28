from app import db
from models import User, ApplicationStatus, ClickCopyNote
db.drop_all()
db.create_all()

statuses = [
  (0, "planned"),
  (1, "in progress"),
  (2, "done"),
  (3, "dropped"),
  (4, "pending")
]

db.session.add_all(
    [ApplicationStatus(status_id=key, status=val) for (key, val) in application_statuses]
)
# db.session.add_all([UrlOrigin(id=key, origin_name=val) for (key, val) in url_origins])

db.session.commit()