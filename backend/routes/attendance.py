from fastapi import APIRouter, Depends

from sqlalchemy.orm import Session

from database import SessionLocal

from models import Registration


router = APIRouter()


def get_db():

    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()


# MARK ATTENDANCE
@router.put("/check-in/{registration_id}")

def check_in(

    registration_id: int,

    db: Session = Depends(get_db)

):

    registration = db.query(
        Registration
    ).filter(

        Registration.id == registration_id

    ).first()


    if not registration:

        return {
            "message": "Registration not found"
        }


    registration.attended = True
    registration.attendance = "Present"

    db.commit()

    return {
        "message": "Attendance marked"
    }


# GET EVENT ATTENDEES
@router.get("/attendees/{event_id}")

def attendees(

    event_id: int,

    db: Session = Depends(get_db)

):

    registrations = db.query(
        Registration
    ).filter(

        Registration.event_id == event_id

    ).all()


    return registrations