# from fastapi import FastAPI, Request, APIRouter, HTTPException
# from fastapi.responses import StreamingResponse
# import asyncio
# import os
# from pathlib import Path
#
# router = APIRouter()
#
#
# async def log_streamer():
#     log_file = 'app.log'
#     if os.path.isfile(log_file):
#         print('file found')
#     else:
#         raise HTTPException(status_code=404, detail="Log file not found")
#
#     """Generator to read the log file in real-time"""
#     with open(log_file, 'r') as log_file:
#         log_file.seek(0, 2)  # Go to the end of the file
#         while True:
#             line = log_file.readline()
#             if line:
#                 yield f"data: {line}\n\n"  # SSE format: `data: message\n\n`
#             else:
#                 await asyncio.sleep(1)  # Avoid busy waiting
#
#
# @router.get("/log-stream", status_code=200)
# async def stream_logs():
#
#     """Serve logs as a streaming response (real-time updates)"""
#     return StreamingResponse(log_streamer(), media_type="text/event-stream")


from fastapi import APIRouter, HTTPException
from fastapi.responses import StreamingResponse
import asyncio
import os
from pathlib import Path

router = APIRouter()


async def log_streamer():
    log_file_path = Path("app.log").resolve()  # Get absolute path to ensure correct file location

    if not log_file_path.is_file():
        raise HTTPException(status_code=404, detail="Log file not found")

    print(f'File found: {log_file_path}')  # Log the exact file path for debugging

    """Generator to read the log file in real-time"""
    with open(log_file_path, 'r') as log_file:
        log_file.seek(0, 2)  # Move to the end of the file
        while True:
            line = log_file.readline()
            if line:
                yield f"data: {line}\n\n"  # SSE format: `data: message\n\n`
            else:
                await asyncio.sleep(1)  # Wait before checking for new lines


@router.get("/log-stream", status_code=200)
async def stream_logs():
    """Serve logs as a streaming response (real-time updates)"""
    return StreamingResponse(log_streamer(), media_type="text/event-stream")
