from fastapi.responses import JSONResponse
from database import get_database
from fastapi import APIRouter, Depends
from serializers.sensorSerializer import UpdateSensorSerializer
from services.sensorService import SensorService

router = APIRouter(prefix="/sensor")

@router.get("/{sensor_id}")
def get_sensor(sensor_id, db = Depends(get_database)):
    return SensorService(db).get_sensor(sensor_id)

@router.patch("/{sensor_id}")
def update_sensor(sensor_id, sensor : UpdateSensorSerializer, db = Depends(get_database)):
    return SensorService(db).update_sensor(sensor_id, sensor)
    
@router.delete("/{sensor_id}")
def delete_sensor(sensor_id, db = Depends(get_database)):
    SensorService(db).delete_sensor(sensor_id)
    return JSONResponse(status_code=200, content= "")
