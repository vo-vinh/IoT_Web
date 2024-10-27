from exception.badRequest import BadRequestException
from models.sensor import Sensor
from models.module import Module
from serializers.sensorSerializer import CreateSensorSerializer, SensorSerializer, UpdateSensorSerializer
from database import Database

class SensorService:
    def __init__(self, db: Database):
        self.db = db
    
    def create_sensor(self, module_code_name: str, sensor : CreateSensorSerializer):
        # begin validate with rule:
        # 1. Check if module with sensor type already exists
        # 2. If sensor exists, check if sensor with name already exists
        module_obj = Module.find({"code_name": module_code_name}, self.db)
        if not module_obj:
            raise BadRequestException("Module does not exist")
        sensor_obj = Sensor.find({"module_code_name" : module_code_name, "type": sensor.type}, self.db)
        if sensor_obj:
            raise BadRequestException("Sensor with name already exists")
        # end validate
        data = sensor.model_dump()
        data["module_code_name"] = module_code_name # add module_code_name to sensor (because module_code_name send in url)
        sensor_obj = Sensor.model_validate(data)
        sensor_obj.save(self.db)
        return SensorSerializer.model_validate(sensor_obj.model_dump())

    def get_sensor(self, sensor_id):
        sensor_obj = Sensor.find({"_id": sensor_id}, self.db)
        if not sensor_obj:
            raise BadRequestException("Sensor does not exist")
        return SensorSerializer.model_validate(sensor_obj.model_dump())
    
    def update_sensor(self, sensor_id, sensor : UpdateSensorSerializer):
        sensor_obj = Sensor.find({"_id": sensor_id}, self.db)
        sensor_obj = sensor_obj.update(sensor.model_dump(), self.db)
        return SensorSerializer.model_validate(sensor_obj.model_dump())
    
    def delete_sensor(self, sensor_id):
        sensor_obj = Sensor.find({"_id": sensor_id}, self.db)
        if not sensor_obj:
            raise BadRequestException("Sensor does not exist")
        sensor_obj.delete(self.db)
        return True
    