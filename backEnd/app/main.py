from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .api.api import api_router
from .core.config import settings
# from .db.base_class import Base
# from .db.session import engine
from .db.initDb import main
from .core.middlewares import JSONResponseMiddleware


@asynccontextmanager
async def lifespan(app: FastAPI):
    main()
    yield
    # Shutdown code
    print("Shutting down!")


app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.frontend_origin],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix=settings.api_string)


@app.get("/")
def read_root():
    return {"Hello": "World"}
