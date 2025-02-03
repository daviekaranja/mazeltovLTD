import logging
import os.path
from contextlib import asynccontextmanager
from fastapi_offline import FastAPIOffline
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pathlib import Path
from starlette.responses import FileResponse
from .api.api import api_router
from .core.config import settings
from .db.initDb import main
from .utilities.logger import log


@asynccontextmanager
async def lifespan(app: FastAPI):
    log.info('Checking a few things')
    main()
    yield
    # Shutdown code


app = FastAPIOffline(lifespan=lifespan)
print(settings.parse_origins())

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.parse_origins(),
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
