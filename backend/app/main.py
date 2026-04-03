from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import auth, triggers, dashboards, policies, tracking
from .db.database import engine
from .db import models

models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="VERO — Parametric Income Protection",
    version="2.0",
    description="AI-powered parametric insurance for India's food delivery workers.",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",  # local dev
        "http://localhost:3000",  # local dev alt
        "http://localhost:80",    # docker
        "http://localhost",       # docker (port 80 default)
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(policies.router)
app.include_router(triggers.router)
app.include_router(dashboards.router)
app.include_router(tracking.router)


@app.get("/", tags=["Health"])
def health_check():
    return {"status": "operational", "engine": "VERO v2.0"}
