from app import db
from models import User, Status, ClickCopyNote
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
    [Status(status_id=key, status=val) for (key, val) in statuses]
)
# db.session.add_all([UrlOrigin(id=key, origin_name=val) for (key, val) in url_origins])

db.session.commit()