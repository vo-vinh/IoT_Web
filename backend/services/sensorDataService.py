from database import Database
from serializers.sensorDataSerializer import SensorDataSerializer, FilterSensorDataSerializer, CreateSensorDataSerializer
from models.sensorData import SensorData
from models.sensor import Sensor
from models.module import Module
from fastapi import UploadFile, File
from exception.badRequest import BadRequestException
import pandas as pd


class SensorDataService:
    
    def __init__(self, db: Database):
        self.db = db
        
    def __check_sensor_data(self, sensor_data: CreateSensorDataSerializer):
        module = Module.find({"code_name": sensor_data.module_code_name}, self.db)
        if not module:
            raise BadRequestException("Module does not exist")
        sensor_dict = {}
        for data in sensor_data.data:
            if data.sensor_type not in sensor_dict:
                sensor = Sensor.find({"module_code_name": sensor_data.module_code_name, "type": data.sensor_type}, self.db)
                if not sensor:
                    raise BadRequestException(f"Sensor with type {data.sensor_type} does not exist")
                sensor_dict[data.sensor_type] = sensor
            else:
                pass 
        return sensor_dict
        
    def get_all_sensor_data(self, filter : FilterSensorDataSerializer):
        query = filter.get_query()
        sensor_data_lst = SensorData.find_all(query, self.db)
        for sensor_data in sensor_data_lst:
            sensor_data.timestamp = sensor_data.timestamp.isoformat()
        return [SensorDataSerializer.model_validate(sensor_data.model_dump()) for sensor_data in sensor_data_lst]
    
    def create_sensor_data(self, sensor_data : CreateSensorDataSerializer):
        sensor_dict = self.__check_sensor_data(sensor_data)
        for data in sensor_data.data:
            data_dict = data.model_dump()
            data_dict["module_code_name"] = sensor_data.module_code_name
            sensor_data_obj = SensorData.model_validate(data_dict)
            sensor_data_obj.save(self.db)
        return True
    
    def __validate_sensor_data_file(self, file: UploadFile):
        if file.content_type != "text/csv":
            raise BadRequestException("File must be csv")
        
        df = pd.read_csv(file.file)
        # TODO: check format of csv file, header list 
        return df 
    
    def import_sensor_data(self, module_code_name : str, file: UploadFile = File(...)):
        df = self.__validate_sensor_data_file(file)
        for _,row in df.iterrows():
            sensor_data_obj = SensorData.model_validate({
                "value": row["value"],
                "timestamp": row["timestamp"],
                "sensor_type": row["sensor_type"],
                "module_code_name": module_code_name
            })
            
            sensor_data_obj.save(self.db)
        return True
        
        