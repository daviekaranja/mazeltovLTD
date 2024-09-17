# import logging
# from contextlib import asynccontextmanager
#
# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware
# from fastapi.staticfiles import StaticFiles
# from pathlib import Path
#
# from starlette.responses import FileResponse
#
# from .api.api import api_router
# from .core.config import settings
# from .db.initDb import main
#
# logger = logging.getLogger(__name__)
#
#
# @asynccontextmanager
# async def lifespan(app: FastAPI):
#     logger.info('Checking a few things')
#     main()
#     yield
#     # Shutdown code
#
#
# app = FastAPI(lifespan=lifespan)
#
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=['*'],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )
#
# app.include_router(api_router, prefix=settings.api_string)
# app.mount("/", StaticFiles(directory=Path('../frontEnd/dist'), html=True), name="static")
#
#
# # Catch-all route for client-side routing in the SPA
# @app.get("/{catch_all:path}")
# async def serve_spa(catch_all: str):
#     logger.info(f'Route Intercepted: {catch_all}')
#     return FileResponse(Path('../frontEnd/dist/index.html'))

import logging
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pathlib import Path
from starlette.responses import FileResponse
from .api.api import api_router
from .core.config import settings
from .db.initDb import main as init_db

logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info('Checking a few things')
    # await init_db()
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
logger.info(Path(__file__))
app.mount("/static", StaticFiles(directory=base_path, html=True), name="static")


# Catch-all route for client-side routing in SPA
@app.get("/{catch_all:path}")
async def serve_spa(catch_all: str):
    print(f'Intecepted: {catch_all}')
    logger.info(f'Catch-all route triggered: {catch_all}')
    return FileResponse(base_path / 'index.html')
