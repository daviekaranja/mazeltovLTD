import asyncio
import logging
import os.path
from contextlib import asynccontextmanager

from alembic import command
from alembic.config import Config
from fastapi_offline import FastAPIOffline
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pathlib import Path
from starlette.responses import FileResponse
from .api.api import api_router
from .core.config import settings
from .db.backend_prestart import logger
from .db.initDb import main
from .utilities.logger import log
from app.utilities.utils import ping_self
from app.utilities import seed_offers

def create_bingwa():
    return seed_offers

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Run Alembic migrations off the loop
    # await asyncio.to_thread(migrate_and_startup)

    # any sync startup work
    await asyncio.to_thread(main)

    # seed offers
    await asyncio.to_thread(create_bingwa)

    # schedule ping_self as a background task
    ping_task = asyncio.create_task(ping_self())

    # now yield immediately so FastAPI can start
    yield

    # on shutdown, cancel the background pinger
    ping_task.cancel()
    try:
        await ping_task
    except asyncio.CancelledError:
        log.info("ping_self task cancelled")

app = FastAPIOffline(lifespan=lifespan)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# API Router
app.include_router(api_router, prefix=settings.api_string)

# Serve static files
base_path = Path('../frontEnd/dist')
#
# # Serve static files from /static
if os.path.exists(base_path):
    app.mount("/static", StaticFiles(directory=base_path, html=True), name="static")
else:
    log.info('Static Files Not Found')
    raise HTTPException(status_code=404, detail='Static files not found')


# Catch-all route: Serve the index.html for any other routes
@app.get("/{full_path:path}")
async def serve_frontend(full_path: str):
    index_path = os.path.join(base_path, "index.html")
    if os.path.exists(index_path):
        return FileResponse(index_path)
    raise HTTPException(status_code=404, detail="Frontend not found")

@app.get('/', status_code=200)
def home():
    return {
        "message": "Welcome to the FastAPI application!"
    }


