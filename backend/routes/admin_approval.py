from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import SessionLocal
from models import User, Notification

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# GET ALL PENDING ADMIN REQUESTS
@router.get("/pending-admins")
def get_pending_admins(
    db: Session = Depends(get_db)
):

    admins = db.query(User).filter(
        User.role == "admin",
        User.status == "pending"
    ).all()

    return admins


# APPROVE ADMIN
@router.put("/approve-admin/{user_id}")
def approve_admin(
    user_id: int,
    db: Session = Depends(get_db)
):

    user = db.query(User).filter(
        User.id == user_id
    ).first()

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    user.status = "approved"

    notification = Notification(
        user_email=user.email,
        title="Admin Approved",
        message="Your admin request has been approved"
    )

    db.add(notification)

    db.commit()

    return {
        "message": f"{user.email} approved as admin"
    }


# REJECT ADMIN
@router.put("/reject-admin/{user_id}")
def reject_admin(
    user_id: int,
    db: Session = Depends(get_db)
):

    user = db.query(User).filter(
        User.id == user_id
    ).first()

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    user.status = "rejected"

    notification = Notification(
        user_email=user.email,
        title="Admin Rejected",
        message="Your admin request has been rejected"
    )

    db.add(notification)

    db.commit()

    return {
        "message": f"{user.email} rejected"
    }


# GET ALL ADMINS
@router.get("/admins")
def get_admins(
    db: Session = Depends(get_db)
):

    admins = db.query(User).filter(
        User.role == "admin",
        User.status == "approved"
    ).all()

    return admins