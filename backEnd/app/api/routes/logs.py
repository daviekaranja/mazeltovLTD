from fastapi import FastAPI, Request, APIRouter
from fastapi.responses import StreamingResponse
import asyncio

router = APIRouter()


async def log_streamer(file_path: str):
    """Generator to read the log file in real-time"""
    with open(file_path, 'r') as log_file:
        log_file.seek(0, 2)  # Go to the end of the file
        while True:
            line = log_file.readline()
            if line:
                yield f"data: {line}\n\n"  # SSE format: `data: message\n\n`
            else:
                await asyncio.sleep(1)  # Avoid busy waiting


@router.get("/log-stream")
async def stream_logs():
    """Serve logs as a streaming response (real-time updates)"""
    return StreamingResponse(log_streamer("app.log"), media_type="text/event-stream")
