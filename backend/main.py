from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi import WebSocket
from websocket_manager import manager
from routes.recommendations import router as recommendation_router

from database import Base, engine
from routes import auth
from routes import events
from routes import registrations
from routes import qr
from routes import certificates
from routes import recommendations
from routes.analytics import router as analytics_router
from routes.reviews import router as reviews_router
from routes.attendance import router as attendance_router
from routes.ai_reports import router as ai_report_router
from routes.notifications import router as notification_router
from routes.reminders import router as reminder_router
from routes.cancel_reschedule import router as cancel_router
from fastapi.staticfiles import StaticFiles
import models

app = FastAPI()

# Create tables
Base.metadata.create_all(bind=engine)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # React frontend allowed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routes
app.include_router(auth.router)
app.include_router(events.router)
app.include_router(registrations.router)
app.include_router(qr.router)
app.include_router(certificates.router)
app.include_router(recommendations.router)
app.include_router(analytics_router)
app.include_router(reviews_router)
app.include_router(attendance_router)
app.include_router(ai_report_router)
app.include_router(notification_router)
app.include_router(reminder_router)
app.include_router(cancel_router)

@app.get("/")
def home():
    return {"message": "Event System Running"}

@app.websocket("/ws")

async def websocket_endpoint(
    websocket: WebSocket
):

    await manager.connect(websocket)

    try:

        while True:

            await websocket.receive_text()

    except:

        manager.disconnect(websocket)

app.mount(

    "/uploads",

    StaticFiles(directory="uploads"),

    name="uploads"
)