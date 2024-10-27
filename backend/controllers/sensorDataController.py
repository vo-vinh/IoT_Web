from fastapi.responses import JSONResponse
from services.sensorDataService import SensorDataService
from serializers.sensorDataSerializer import FilterSensorDataSerializer, CreateSensorDataSerializer
from database import get_database
from fastapi import APIRouter, Depends, UploadFile, File, Query
from typing import Annotated

router = APIRouter(prefix="/sensor-data")

@router.get("")
async def get_all_sensor_data(filter : Annotated[FilterSensorDataSerializer, Query()], db = Depends(get_database)):
    return SensorDataService(db).get_all_sensor_data(filter)

@router.post("")
async def create_sensor_data(sensor_data : CreateSensorDataSerializer, db = Depends(get_database)):
    SensorDataService(db).create_sensor_data(sensor_data)
    return JSONResponse(status_code=200, content= "")

@router.post("/import/{module_code_name}")
async def import_sensor_data(module_code_name : str, file: UploadFile = File(...), db = Depends(get_database)):
    return SensorDataService(db).import_sensor_data(module_code_name, file)