from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import SessionLocal
from models import Registration
from schemas import RegistrationCreate

router = APIRouter()

# DB Dependency
def get_db():
    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()


# REGISTER FOR EVENT
@router.post("/register-event")
def register_event(
    registration: RegistrationCreate,
    db: Session = Depends(get_db)
):

    # CHECK DUPLICATE
    existing = db.query(Registration).filter(
        Registration.user_email == registration.user_email,
        Registration.event_id == registration.event_id
    ).first()

    if existing:
        return {"message": "Already registered"}

    new_registration = Registration(
        user_email=registration.user_email,
        event_id=registration.event_id,
        event_title=registration.event_title
    )

    db.add(new_registration)

    db.commit()

    return {"message": "Registration successful"}


# MY EVENTS
@router.get("/my-events/{email}")
def my_events(
    email: str,
    db: Session = Depends(get_db)
):

    events = db.query(Registration).filter(
        Registration.user_email == email
    ).all()

    return events

# CHECK IN
@router.get("/check-in/{event_id}")

def check_in(
    event_id: int,
    email: str,
    db: Session = Depends(get_db)
):

    registration = db.query(Registration).filter(
        Registration.event_id == event_id,
        Registration.user_email == email
    ).first()

    if not registration:
        return {"message": "User not registered"}

    registration.attendance = "Present"

    db.commit()

    return {
        "message": "Attendance marked present"
    }