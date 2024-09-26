from fastapi import FastAPI, HTTPException, APIRouter, Query, Request
from fastapi.responses import PlainTextResponse
from sse_starlette import EventSourceResponse
from typing import Optional
import os
import time
from collections import deque
from fastapi import FastAPI, Request, APIRouter
import asyncio
from typing import List

router = APIRouter()

LOG_FILE_PATH = "app.log"  # Change this to your actual log file path


@router.get("/logs/", response_class=PlainTextResponse)
def read_log_lines(num_lines: Optional[int] = 10):
    """Reads the last `num_lines` from the log file."""

    if not os.path.exists(LOG_FILE_PATH):
        raise HTTPException(status_code=404, detail="Log file not found")

    try:
        with open(LOG_FILE_PATH, "r") as log_file:
            # Read all lines in the log file
            lines = log_file.readlines()

        # Return the last `num_lines` or all lines if the file has fewer lines
        last_lines = lines[-num_lines:] if num_lines <= len(lines) else lines

        return "".join(last_lines)

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get('/live-logs', status_code=200)
async def message_stream(request: Request):
    last_read_position = 0  # Track the last position read in the log file
    last_file_size = 0  # Track the size of the log file for rotation
    file_unavailable_sent = False  # To prevent multiple notifications about file unavailability
    stream_delay = 1  # seconds

    async def event_generator():
        nonlocal last_read_position, last_file_size, file_unavailable_sent

        while True:
            # Check if client is disconnected
            if await request.is_disconnected():
                break

            try:
                # Check if the log file exists
                if not os.path.exists(LOG_FILE_PATH):
                    if not file_unavailable_sent:
                        yield {
                            "event": "file_unavailable",
                            "data": "Log file is unavailable."
                        }
                        file_unavailable_sent = True
                    await asyncio.sleep(stream_delay)
                    continue

                file_unavailable_sent = False  # Reset the unavailable flag

                # Get the current size of the file
                current_file_size = os.path.getsize(LOG_FILE_PATH)

                # If the file size has changed, reset the last read position
                if current_file_size < last_file_size:
                    last_read_position = 0  # Resetting since the file has been rotated

                last_file_size = current_file_size  # Update the last file size

                # Open the file and read new lines from the last read position
                with open(LOG_FILE_PATH, 'r') as log_file:
                    log_file.seek(last_read_position)  # Move to the last read position
                    new_lines = log_file.readlines()  # Read all new lines

                    if new_lines:
                        # Update the last read position to the end of the file
                        last_read_position = log_file.tell()

                        # Yield each new line as an event
                        for line in new_lines:
                            yield {
                                "data": line.strip() # Remove any trailing newline characters
                            }
                    else:
                        await asyncio.sleep(stream_delay)  # No new lines, wait and check again

            except Exception as e:
                # If an error occurs (e.g., file access error), notify once
                if not file_unavailable_sent:
                    yield {
                        "event": "file_error",
                        "data": f"Error reading log file: {str(e)}"
                    }
                    file_unavailable_sent = True

                await asyncio.sleep(stream_delay)  # Wait before trying again

    return EventSourceResponse(event_generator())
