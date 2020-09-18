from app import db
from models import User, ApplicationStatus, ClickCopyNote
db.drop_all()
db.create_all()

application_statuses = [
  (0, "applied"),
  (1, "interviewing"),
  (2, "rejected"),
  (3, "offer received"),
  (4, "offer declined"),
  (5, "pending")
]

# url_origins = [
#   (0, "AngelList"),
#   (1, "LinkedIn"),
#   (2, "Greenhouse"),
#   (3, "Indeed")
# ]

db.session.add_all(
    [ApplicationStatus(status_id=key, status=val) for (key, val) in application_statuses]
)
# db.session.add_all([UrlOrigin(id=key, origin_name=val) for (key, val) in url_origins])

db.session.commit()