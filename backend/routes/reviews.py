from fastapi import APIRouter, Depends

from sqlalchemy.orm import Session

from database import SessionLocal

from models import Review

from schemas import ReviewCreate

from dependencies import get_current_user


router = APIRouter()


# DB
def get_db():

    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()


# ADD REVIEW
@router.post("/reviews")

def add_review(

    review: ReviewCreate,

    db: Session = Depends(get_db),

    current_user: str = Depends(
        get_current_user
    )

):

    new_review = Review(

        user_email=current_user,

        event_id=review.event_id,

        comment=review.comment,

        rating=review.rating
    )

    db.add(new_review)

    db.commit()

    return {
        "message": "Review added"
    }


# GET EVENT REVIEWS
@router.get("/reviews/{event_id}")

def get_reviews(

    event_id: int,

    db: Session = Depends(get_db)

):

    reviews = db.query(Review).filter(
        Review.event_id == event_id
    ).all()

    return reviews