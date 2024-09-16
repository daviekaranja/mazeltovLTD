from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pathlib import Path

from .api.api import api_router
from .core.config import settings
from .db.initDb import main


@asynccontextmanager
async def lifespan(app: FastAPI):
    main()
    yield
    # Shutdown code


app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix=settings.api_string)
app.mount("/", StaticFiles(directory=Path('../frontEnd/dist'), html=True), name="static")


@app.get("/")
def read_root():
    return {"Hello": "World"}
