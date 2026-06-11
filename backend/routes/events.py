from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from websocket_manager import manager

from database import SessionLocal
from dependencies import (
    get_current_user,
    admin_only
)
from schemas import EventCreate, RegistrationCreate
from models import Event, Registration
from fastapi import UploadFile, File, Form
import shutil

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# CREATE EVENT
@router.post("/events")

async def create_event(

    title: str = Form(...),

    description: str = Form(...),

    category: str = Form(...),

    location: str = Form(...),

    date: str = Form(...),

    time: str = Form(...),

    organizer: str = Form(...),

    image: UploadFile = File(...),

    db: Session = Depends(get_db)

):

    image_path = f"uploads/{image.filename}"


    with open(image_path, "wb") as buffer:

        shutil.copyfileobj(
            image.file,
            buffer
        )


    new_event = Event(

        title=title,

        description=description,

        category=category,

        location=location,

        date=date,

        time=time,

        organizer=organizer,

        image=image_path
    )

    db.add(new_event)

    db.commit()

    return {
        "message": "Event created"
    }

# GET ALL EVENTS
@router.get("/events")
def get_events(db: Session = Depends(get_db)):

    events = db.query(Event).all()

    return events


# GET SINGLE EVENT
@router.get("/events/{event_id}")
def get_event(event_id: int, db: Session = Depends(get_db)):

    event = db.query(Event).filter(Event.id == event_id).first()

    return event

@router.get("/trending-events")

def trending_events(db: Session = Depends(get_db)):

    events = db.query(Event).all()

    return events[:3]

@router.post("/register-event")

async def register_event(

    registration: RegistrationCreate,

    db: Session = Depends(get_db),

    current_user: str = Depends(get_current_user)

):

    new_registration = Registration(

        user_email=current_user,

        event_id=registration.event_id,

        event_title=registration.event_title

    )

    db.add(new_registration)

    db.commit()

    await manager.broadcast(
    f"Event {registration.event_id} updated"
)

    return {
        "message": "Registered Successfully"
    }

@router.delete("/events/{event_id}")

def delete_event(

    event_id: int,

    db: Session = Depends(get_db),

    current_admin: str = Depends(admin_only)

):

    event = db.query(Event).filter(
        Event.id == event_id
    ).first()

    db.delete(event)

    db.commit()

    return {
        "message": "Event deleted"
    }