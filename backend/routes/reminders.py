from fastapi import APIRouter
from database import SessionLocal
from models import Event, Notification
from datetime import datetime, timedelta

router = APIRouter()

@router.get("/generate-reminders")
def generate_reminders():

    db = SessionLocal()

    events = db.query(Event).all()

    tomorrow = (
        datetime.now() + timedelta(days=1)
    ).strftime("%Y-%m-%d")

    created = 0

    for event in events:

        if event.date == tomorrow:

            message = (
                f"Reminder: {event.title} tomorrow at "
                f"{event.time} in {event.location}"
            )

            existing = db.query(Notification).filter(
                Notification.message == message
            ).first()

            if not existing:

                new_notification = Notification(
                    title="Upcoming Event Reminder",
                    message=message
                )

                db.add(new_notification)

                created += 1

    db.commit()

    return {
        "message": f"{created} reminders created"
    }