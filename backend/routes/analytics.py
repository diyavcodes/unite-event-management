from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func

from database import SessionLocal
from models import User, Event, Registration
from dependencies import admin_only

router = APIRouter()


# DATABASE
def get_db():

    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()


# ANALYTICS ROUTE
@router.get("/analytics")

def analytics(

    db: Session = Depends(get_db)

):

    # TOTAL USERS
    total_users = db.query(User).count()

    # TOTAL EVENTS
    total_events = db.query(Event).count()

    # TOTAL REGISTRATIONS
    total_registrations = db.query(
        Registration
    ).count()

    # EVENTS DATA
    events = db.query(Event).all()

    formatted_events = []

    for event in events:

        registration_count = db.query(
            Registration
        ).filter(
            Registration.event_id == event.id
        ).count()

        formatted_events.append({

            "title": event.title,

            "category": event.category,

            "date": event.date,

            "location": event.location,

            "registrations": registration_count
        })

    # FINAL RESPONSE
    return {

        "total_users": total_users,

        "total_events": total_events,

        "total_registrations":
            total_registrations,

        "events":
            formatted_events
    }