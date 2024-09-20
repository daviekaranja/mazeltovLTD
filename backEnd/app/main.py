import logging
import os.path
from contextlib import asynccontextmanager

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pathlib import Path
from starlette.responses import FileResponse
from .api.api import api_router
from .core.config import settings
from .db.initDb import main

logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info('Checking a few things')
    main()
    yield
    # Shutdown code


app = FastAPI(lifespan=lifespan)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# API Router
app.include_router(api_router, prefix=settings.api_string)

# Serve static files
base_path = Path('../frontEnd/dist')

if os.path.exists(base_path):
    app.mount("/static", StaticFiles(directory=base_path, html=True), name="static")
else:
    raise HTTPException(status_code=404, detail='Static files not found')


# Catch-all route for client-side routing in SPA
@app.get("/{catch_all:path}")
async def serve_spa(catch_all: str):
    logger.info(f'Catch-all route triggered: {catch_all}')
    return FileResponse(base_path / 'index.html')
