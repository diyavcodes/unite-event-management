from fastapi import APIRouter
import qrcode

router = APIRouter()


# GENERATE QR
@router.get("/generate-qr/{event_id}")

def generate_qr(event_id: int):

    qr_data = f"http://127.0.0.1:8000/check-in/{event_id}"

    qr = qrcode.make(qr_data)

    file_path = f"qrcodes/event_{event_id}.png"

    qr.save(file_path)

    return {
        "message": "QR Generated",
        "qr_path": file_path,
        "qr_data": qr_data
    }