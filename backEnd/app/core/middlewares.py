from starlette.middleware.base import BaseHTTPMiddleware
from starlette.responses import Response


class JSONResponseMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request, call_next):
        response = await call_next(request)
        if 'application/json' not in response.headers.get('Content-Type', ''):
            response.headers['Content-Type'] = 'application/json'
        return response
