from sqlalchemy import Column, Integer, String, Boolean
from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    email = Column(String, unique=True)
    password = Column(String)
    role = Column(String, default="user")
    status = Column(
        String,
        default="approved"
    )

from sqlalchemy import Text

class Event(Base):
    __tablename__ = "events"

    id = Column(Integer, primary_key=True, index=True)

    title = Column(String)

    description = Column(Text)

    category = Column(String)

    location = Column(String)

    date = Column(String)

    time = Column(String)

    organizer = Column(String)

    status = Column(String, default="active")

    image = Column(String, nullable=True)

class Registration(Base):
    __tablename__ = "registrations"

    id = Column(Integer, primary_key=True, index=True)

    user_email = Column(String)

    event_id = Column(Integer)

    event_title = Column(String)

    attendance = Column(String, default="Absent")

    attended = Column(Boolean, default=False)

class Review(Base):

    __tablename__ = "reviews"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    user_email = Column(String)

    event_id = Column(Integer)

    comment = Column(String)

    rating = Column(Integer)

class Notification(Base):

    __tablename__ = "notifications"

    id = Column(Integer, primary_key=True)

    user_email = Column(String)

    title = Column(String)

    message = Column(String)

    is_read = Column(Boolean, default=False)

    created_at = Column(String)