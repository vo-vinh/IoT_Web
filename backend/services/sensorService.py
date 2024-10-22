from backend.models.sensor import Sensor
from backend.serializers import sensorSerializer
from backend.serializers.sensorSerializer import CreateSensorSerializer, SensorSerializer, UpdateSensorSerializer
from database import Database

class SensorService:
    def __init__(self, db: Database):
        self.db = db
    
    def create_sensor(self, sensor : CreateSensorSerializer):
        sensor_obj = Sensor.model_validate_json(sensor.model_dump_json())
        sensor_obj.save(self.db)
        return SensorSerializer.model_validate(sensor_obj.model_dump())

    def get_sensor(self, sensor_id):
        sensor_obj = Sensor.find({"_id": sensor_id}, self.db)
        return SensorSerializer.model_validate(sensor_obj.model_dump())
    
    def update_sensor(self, sensor_id, sensor : UpdateSensorSerializer):
        sensor_obj = Sensor.find({"_id": sensor_id}, self.db)
        sensor_obj = sensor_obj.update(sensor.model_dump_json(), self.db)
        return SensorSerializer.model_validate(sensor_obj.model_dump())
    
    def delete_sensor(self, sensor_id):
        sensor_obj = Sensor.find({"_id": sensor_id}, self.db)
        sensor_obj.delete(self.db)
        return SensorSerializer.model_validate(sensor_obj.model_dump())
    
    def get_all_sensors(self):
        sensors = Sensor.find({}, self.db)
        return [SensorSerializer.model_validate(sensor.model_dump()) for sensor in sensors]
    