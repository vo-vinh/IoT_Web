from database import get_database
from fastapi import APIRouter, Depends
from serializers.sensorSerializer import CreateSensorSerializer, SensorSerializer, UpdateSensorSerializer
from services.sensorService import SensorService

router = APIRouter(prefix="/sensor")

@router.post("")
def create_sensor(sensor : CreateSensorSerializer, db = Depends(get_database)):
    return SensorService(db).create_sensor(sensor) 

@router.get("/{sensor_id}")
def get_sensor(sensor_id, db = Depends(get_database)):
    return SensorService(db).get_sensor(sensor_id)

@router.patch("/{sensor_id}")
def update_sensor(sensor_id, sensor : UpdateSensorSerializer, db = Depends(get_database)):
    return SensorService(db).update_sensor(sensor_id, sensor)
    
@router.delete("/{sensor_id}")
def delete_sensor(sensor_id, db = Depends(get_database)):
    return SensorService(db).delete_sensor(sensor_id)

@router.get("")
def get_all_sensors(db = Depends(get_database)):
    return SensorService(db).get_all_sensors()