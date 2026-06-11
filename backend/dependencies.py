from fastapi import Header, HTTPException

from utils.jwt_handler import verify_token


def get_current_user(
    authorization: str = Header(None)
):
    print("AUTH:", authorization)

    if not authorization:

        raise HTTPException(
            status_code=401,
            detail="Token missing"
        )

    # REMOVE "Bearer "
    token = authorization.split(" ")[1]

    email = verify_token(token)

    print("VERIFY RESULT:", email)

    if not email:

        raise HTTPException(
            status_code=401,
            detail="Invalid token"
        )

    return email

from database import SessionLocal
from models import User


def admin_only(

    authorization: str = Header(None)

):

    if not authorization:

        raise HTTPException(
            status_code=401,
            detail="Token missing"
        )

    token = authorization.split(" ")[1]

    email = verify_token(token)

    db = SessionLocal()

    user = db.query(User).filter(
        User.email == email
    ).first()

    # USER NOT FOUND
    if not user:

        raise HTTPException(
            status_code=401,
            detail="User not found"
        )

    # ADMIN CHECK
    if user.role != "admin":

        raise HTTPException(
            status_code=403,
            detail="Admins only"
        )

    return email