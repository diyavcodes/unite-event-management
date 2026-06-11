from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas

from database import SessionLocal
from models import Registration

router = APIRouter()


# DB Dependency
def get_db():
    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()


# GENERATE CERTIFICATE
@router.get("/generate-certificate")

def generate_certificate(
    email: str,
    event_id: int,
    db: Session = Depends(get_db)
):

    registration = db.query(Registration).filter(
        Registration.user_email == email,
        Registration.event_id == event_id
    ).first()

    if not registration:
        return {"message": "Registration not found"}

    if registration.attendance != "Present":
        return {
            "message": "Attendance required for certificate"
        }

    file_name = (
        f"certificates/"
        f"{registration.user_email}_{event_id}.pdf"
    )

    c = canvas.Canvas(file_name, pagesize=letter)

    width, height = letter

    # TITLE
    c.setFont("Helvetica-Bold", 28)

    c.drawCentredString(
        width / 2,
        700,
        "Certificate of Participation"
    )

    # BODY
    c.setFont("Helvetica", 18)

    c.drawCentredString(
        width / 2,
        620,
        f"This certificate is awarded to"
    )

    c.setFont("Helvetica-Bold", 24)

    c.drawCentredString(
        width / 2,
        580,
        registration.user_email
    )

    c.setFont("Helvetica", 18)

    c.drawCentredString(
        width / 2,
        520,
        f"For participating in"
    )

    c.setFont("Helvetica-Bold", 22)

    c.drawCentredString(
        width / 2,
        480,
        registration.event_title
    )

    c.save()

    return {
        "message": "Certificate generated",
        "file": file_name
    }