from fastapi import APIRouter, Depends

from sqlalchemy.orm import Session

from sklearn.feature_extraction.text import TfidfVectorizer

from sklearn.metrics.pairwise import cosine_similarity

from database import SessionLocal

from models import Event, Registration

from dependencies import get_current_user


router = APIRouter()


# DB
def get_db():

    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()


# AI RECOMMENDATION
@router.get("/recommend-events")

def recommend_events(

    db: Session = Depends(get_db),

    current_user: str = Depends(get_current_user)

):

    # USER REGISTRATIONS
    registrations = db.query(Registration).filter(

        Registration.user_email == current_user

    ).all()


    # REGISTERED EVENT TITLES
    user_interests = " ".join(

        [r.event_title for r in registrations]

    )


    # ALL EVENTS
    events = db.query(Event).all()


    if not events:

        return []


    # EVENT TEXTS
    event_texts = [

        f"{e.title} {e.description} {e.category}"

        for e in events
    ]


    # TF-IDF
    vectorizer = TfidfVectorizer()

    vectors = vectorizer.fit_transform(

        [user_interests] + event_texts

    )


    # COSINE SIMILARITY
    similarity = cosine_similarity(

        vectors[0:1],
        vectors[1:]

    ).flatten()


    # SORT EVENTS
    scored_events = list(zip(events, similarity))

    scored_events.sort(

        key=lambda x: x[1],

        reverse=True
    )


    recommended = [

        event for event, score in scored_events[:5]

    ]


    return recommended