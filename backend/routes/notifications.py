from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import SessionLocal
from models import Notification, Registration

from datetime import datetime

router = APIRouter()


# DB
def get_db():

    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()


# CREATE NOTIFICATION
@router.post("/create-notification")
def create_notification(
    data: dict,
    db: Session = Depends(get_db)
):

    notification = Notification(

        user_email=data["user_email"],

        title=data["title"],

        message=data["message"],

        created_at=str(datetime.now())
    )

    db.add(notification)

    db.commit()

    return {
        "message": "Notification Created"
    }


# GET USER NOTIFICATIONS
@router.get("/notifications/{email}")
def get_notifications(
    email: str,
    db: Session = Depends(get_db)
):

    notifications = db.query(
        Notification
    ).filter(
        Notification.user_email == email
    ).all()

    return notifications


# MARK AS READ
@router.put("/mark-read/{notification_id}")
def mark_as_read(
    notification_id: int,
    db: Session = Depends(get_db)
):

    notification = db.query(
        Notification
    ).filter(
        Notification.id == notification_id
    ).first()

    if notification:

        notification.is_read = True

        db.commit()

    return {
        "message": "Updated"
    }


# SEND EVENT ANNOUNCEMENT
@router.post("/announce/{event_id}")
def send_announcement(
    event_id: int,
    data: dict,
    db: Session = Depends(get_db)
):

    attendees = db.query(
        Registration
    ).filter(
        Registration.event_id == event_id
    ).all()

    for attendee in attendees:

        notification = Notification(

            user_email=attendee.user_email,

            title=data["title"],

            message=data["message"],

            created_at=str(datetime.now())
        )

        db.add(notification)

    db.commit()

    return {
        "message": "Announcement Sent"
    }

@router.get("/all-announcements")
def get_all_announcements(db: Session = Depends(get_db)):

    notices = db.query(Notification).all()

    unique = {}

    for notice in notices:
        key = f"{notice.title}-{notice.message}"

        if key not in unique:
            unique[key] = notice

    return list(unique.values())