from fastapi import FastAPI
from fastapi.responses import JSONResponse
from exception.badRequest import BadRequestException
from exception.notFound import NotFoundException
from bson.errors import InvalidId
from controllers.userController import router as user_router
from controllers.moduleController import router as module_router
from controllers.sensorController import router as sensor_router
from controllers.sensorDataController import router as sensor_data_router
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

app.include_router(user_router)
app.include_router(module_router)
app.include_router(sensor_router)
app.include_router(sensor_data_router)

@app.exception_handler(BadRequestException)
async def bad_request_exception_handler(request, exc : BadRequestException):
    return JSONResponse(
        status_code=400,
        content={"message": exc.message}
    )
    
@app.exception_handler(NotFoundException)
async def bad_request_exception_handler(request, exc : BadRequestException):
    return JSONResponse(
        status_code=404,
        content={"message": exc.message}
    )
    
@app.exception_handler(InvalidId)
async def bad_request_exception_handler(request, exc : InvalidId):
    return JSONResponse(
        status_code=400,
        content={"message": "Invalid id"}
    )

if __name__ == "__main__":
    uvicorn.run(app, host = "0.0.0.0", port = 8000)