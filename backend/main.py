from fastapi import FastAPI
from fastapi.responses import JSONResponse
from exception.badRequest import BadRequestException
from controllers.userController import router as user_router
import uvicorn

app = FastAPI()

app.include_router(user_router)

app.exception_handler(BadRequestException)
async def bad_request_exception_handler(request, exc : BadRequestException):
    return JSONResponse(
        status_code=400,
        content={"message": exc.message}
    )
    
if __name__ == "__main__":
    uvicorn.run(app)