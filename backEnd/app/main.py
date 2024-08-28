from fastapi import FastAPI
from fastapi_offline import FastAPIOffline
from .db.session import engine
from .db.base import Base
from .api.api import api_router
from fastapi.middleware.cors import CORSMiddleware
from .core.config import settings
app = FastAPIOffline()
app.include_router(api_router)

# Allow CORS for specific origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.frontend_origin],  # List of allowed origins
    allow_credentials=True,
    allow_methods=["*"],  # HTTP methods allowed
    allow_headers=["*"],  # HTTP headers allowed
)


@app.get("/")
def read_root():
    return {"Hello": "World"}
