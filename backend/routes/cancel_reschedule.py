from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel
from datetime import datetime

from database import SessionLocal
from models import Event, Notification, Registration

router = APIRouter()


class RescheduleData(BaseModel):
    date: str
    time: str


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# CANCEL EVENT
@router.put("/cancel-event/{event_id}")
async def cancel_event(
    event_id: int,
    db: Session = Depends(get_db)
):
    print("===== CANCEL ROUTE HIT =====")

    event = db.query(Event).filter(
        Event.id == event_id
    ).first()

    if not event:
        return {
            "error": "Event not found"
        }

    print("EVENT:", event)

    attendees = db.query(
        Registration
    ).filter(
        Registration.event_id == event_id
    ).all()

    print("ATTENDEES FOUND:", len(attendees))

    event.status = "cancelled"

    for attendee in attendees:

        print(
            "ADDING NOTIFICATION FOR:",
            attendee.user_email
        )

        notification = Notification(
            user_email=attendee.user_email,
            title="Event Cancelled",
            message=f"{event.title} has been cancelled by the organizer.",
            created_at=str(datetime.now())
        )

        db.add(notification)

    db.commit()

    print("COMMIT DONE")

    saved_notifications = db.query(
        Notification
    ).all()

    print(
        "TOTAL NOTIFICATIONS:",
        len(saved_notifications)
    )

    return {
        "message": "Event Cancelled"
    }


# RESCHEDULE EVENT
@router.put("/reschedule-event/{event_id}")
def reschedule_event(
    event_id: int,
    data: RescheduleData,
    db: Session = Depends(get_db)
):

    event = db.query(Event).filter(
        Event.id == event_id
    ).first()

    if not event:
        return {
            "error": "Event not found"
        }

    event.date = data.date
    event.time = data.time

    attendees = db.query(
        Registration
    ).filter(
        Registration.event_id == event_id
    ).all()

    for attendee in attendees:

        notification = Notification(
            user_email=attendee.user_email,
            title="Event Rescheduled",
            message=f"{event.title} moved to {data.date} at {data.time}",
            created_at=str(datetime.now())
        )

        db.add(notification)

    db.commit()

    return {
        "message": "Event Rescheduled"
    }