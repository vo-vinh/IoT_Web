from fastapi import APIRouter, Depends
from database import get_database
from services.moduleService import moduleService
from serializers.moduleSerializer import CreateModuleSerializer, UpdateModuleSerializer
from services.sensorService import SensorService
from serializers.sensorSerializer import CreateSensorSerializer
from fastapi.responses import JSONResponse

router = APIRouter(prefix="/module")

@router.post("")
def create_module(module : CreateModuleSerializer, db = Depends(get_database)):
    return moduleService(db).create_module(module)

@router.get("/{module_id}")
def get_module(module_id, db = Depends(get_database)):
    return moduleService(db).get_module(module_id)

@router.patch("/{module_code_name}")
def update_module(module_code_name, module : UpdateModuleSerializer, db = Depends(get_database)):
    return moduleService(db).update_module(module_code_name, module)

@router.delete("/{module_code_name}")
def delete_module(module_code_name, db = Depends(get_database)):
    moduleService(db).delete_module(module_code_name)
    return JSONResponse(status_code=200, content= "")

@router.get("")
def get_all_modules(db = Depends(get_database)):
    return moduleService(db).get_all_modules()

@router.post("/{module_code_name}")
def create_sensor(module_code_name: str , sensor : CreateSensorSerializer, db = Depends(get_database)):
    return SensorService(db).create_sensor(module_code_name, sensor)