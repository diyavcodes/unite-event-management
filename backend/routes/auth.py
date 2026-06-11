from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import SessionLocal
from models import User
from schemas import UserCreate, UserLogin

from auth import (
    hash_password,
    verify_password
)

from utils.jwt_handler import create_access_token

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# REGISTER
@router.post("/register")
def register(
    user: UserCreate,
    db: Session = Depends(get_db)
):

    existing_user = db.query(User).filter(
        User.email == user.email
    ).first()

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )

    # Admin requires approval
    if user.role == "admin":
        status = "pending"
    else:
        status = "approved"

    new_user = User(
        name=user.name,
        email=user.email,
        password=hash_password(user.password),
        role=user.role,
        status=status
    )

    db.add(new_user)
    db.commit()

    return {
        "message": "User created successfully"
    }


# LOGIN
@router.post("/login")
def login(
    user: UserLogin,
    db: Session = Depends(get_db)
):

    existing_user = db.query(User).filter(
        User.email == user.email
    ).first()

    # User not found
    if not existing_user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    # Wrong password
    if not verify_password(
        user.password,
        existing_user.password
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid password"
        )

    # Admin approval check
    if (
        existing_user.role == "admin"
        and existing_user.status != "approved"
    ):
        raise HTTPException(
            status_code=403,
            detail="Admin approval pending"
        )

    token = create_access_token(
        {"sub": existing_user.email}
    )

    return {
        "access_token": token,
        "user": existing_user.email,
        "role": existing_user.role,
        "status": existing_user.status
    }