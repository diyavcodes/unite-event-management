from fastapi import APIRouter, Depends

from sqlalchemy.orm import Session

from database import SessionLocal

from models import Event, Registration, Review

from groq import Groq

import os
from dotenv import load_dotenv

load_dotenv()


router = APIRouter()


# GEMINI KEY
client = Groq(api_key=os.getenv("GROQ_API_KEY"))


# DB
def get_db():

    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()


# AI REPORT
@router.get("/ai-report/{event_id}")

def generate_ai_report(

    event_id: int,

    db: Session = Depends(get_db)

):

    # EVENT
    event = db.query(Event).filter(
        Event.id == event_id
    ).first()


    # REGISTRATIONS
    attendees = db.query(
        Registration
    ).filter(

        Registration.event_id == event_id

    ).all()


    # REVIEWS
    reviews = db.query(
        Review
    ).filter(

        Review.event_id == event_id

    ).all()


    total_attendees = len(attendees)


    avg_rating = 0

    if reviews:

        avg_rating = sum(

            review.rating

            for review in reviews

        ) / len(reviews)


    review_text = "\n".join(

        [

            review.comment

            for review in reviews

        ]

    )


    prompt = f"""

    Create a professional AI event report.

    EVENT:
    {event.title}

    DESCRIPTION:
    {event.description}

    CATEGORY:
    {event.category}

    LOCATION:
    {event.location}

    TOTAL ATTENDEES:
    {total_attendees}

    AVERAGE RATING:
    {avg_rating}

    USER REVIEWS:
    {review_text}

    Generate:

    1. Executive summary

    2. Attendee insights

    3. Sentiment analysis

    4. Engagement analysis

    5. Recommendations

    6. Future improvements

    """


    response = client.chat.completions.create(

        model="llama-3.1-8b-instant",

        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    report = response.choices[0].message.content

    return {
        "report": report
    }