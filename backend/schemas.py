from pydantic import BaseModel

class UserCreate(BaseModel):
    name: str
    email: str
    password: str
    role: str

class UserLogin(BaseModel):
    email: str
    password: str

class EventCreate(BaseModel):
    title: str
    description: str
    category: str
    location: str
    date: str
    organizer: str

class RegistrationCreate(BaseModel):
    user_email: str
    event_id: int
    event_title: str

class ReviewCreate(BaseModel):

    event_id: int

    comment: str

    rating: int