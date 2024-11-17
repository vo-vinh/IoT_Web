from database import Database
from serializers.sensorDataSerializer import SensorDataSerializer, FilterSensorDataSerializer, CreateSensorDataSerializer
from models.sensorData import SensorData
from models.sensor import Sensor
from models.module import Module
from fastapi import UploadFile, File
from exception.badRequest import BadRequestException
import pandas as pd
from models.logModel import LogModel
import os, csv
from controllers.websocket_handler import manager


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
    
    async def create_sensor_data(self, sensor_data : CreateSensorDataSerializer):
        sensor_dict = self.__check_sensor_data(sensor_data)
        for data in sensor_data.data:
            data_dict = data.model_dump()
            data_dict["module_code_name"] = sensor_data.module_code_name
            sensor_data_obj = SensorData.model_validate(data_dict)
            sensor_data_obj.save(self.db)
            
            # create log 
            log_obj = LogModel.model_validate({"timestamp": sensor_data_obj.timestamp, 
                                               "module_code_name": sensor_data.module_code_name, 
                                               "sensor_type": data.sensor_type, "value": data.value, 
                                               "sensor_id" : str(sensor_dict[data.sensor_type].id), 
                                               "sensor_name": sensor_dict[data.sensor_type].name})
            log_obj.save(self.db)
            # update last data to sensor 
            sensor_obj = Sensor.find({"module_code_name": sensor_data.module_code_name, "type": data.sensor_type}, self.db)
            if (sensor_obj.last_active is None) or (sensor_obj.last_active.replace(tzinfo=None) < sensor_data_obj.timestamp.replace(tzinfo=None)):
                sensor_obj.last_active = sensor_data_obj.timestamp
                sensor_obj.value = sensor_data_obj.value
                sensor_obj.update(sensor_obj.model_dump(), self.db)
                # broadcast to all clients
                data_send = {
                    "timestamp": sensor_data_obj.timestamp.isoformat(),
                    "module_code_name": sensor_data_obj.module_code_name,
                    "sensor_type": sensor_data_obj.sensor_type,
                    "value": sensor_data_obj.value
                }
                await manager.broadcast(message = data_send, channel = sensor_data.module_code_name)
        return True
    
    def __validate_sensor_data_file(self, file: UploadFile):
        if file.content_type != "text/csv":
            raise BadRequestException("File must be csv")
        
        try:
            df = pd.read_csv(file.file, header=0)
        except Exception as e:
            raise BadRequestException("Invalid CSV file")
        
        required_headers = {"value", "timestamp", "sensor_type"}
        if not required_headers.issubset(df.columns):
            raise BadRequestException(f"CSV file must contain the following headers: {', '.join(required_headers)}")
        
        if not pd.api.types.is_numeric_dtype(df["value"]):
            raise BadRequestException("Column 'value' must be numeric")
        try:
            df["timestamp"] = pd.to_datetime(df["timestamp"])
        except Exception as e:
            raise BadRequestException("Column 'timestamp' must be datetime")
        
        return df 
    
    def import_sensor_data(self, module_code_name : str, file: UploadFile = File(...)):
        df = self.__validate_sensor_data_file(file)
        for index,row in df.iterrows():
            try:
                sensor_data_obj = SensorData.model_validate({
                    "value": row["value"],
                    "timestamp": row["timestamp"],
                    "sensor_type": row["sensor_type"],
                    "module_code_name": module_code_name
                })
            except Exception as e:
                raise BadRequestException(f"Invalid data at row {index+2}")
            
            sensor_data_obj.save(self.db)
            # create log 
            sensor_obj = Sensor.find({"module_code_name": module_code_name, "type": row["sensor_type"]}, self.db)
            if not sensor_obj:
                raise BadRequestException(f"Sensor with type {row['sensor_type']} does not exist")
            log_obj = LogModel.model_validate({"timestamp": sensor_data_obj.timestamp, 
                                                "sensor_id": str(sensor_obj.id),
                                               "module_code_name": module_code_name, 
                                               "sensor_type": row["sensor_type"], 
                                               "sensor_name": sensor_obj.name,
                                               "value": row["value"]})
            log_obj.save(self.db)
        return True
    
    def export_all_data(self):
        sensor_data_lst = SensorData.find_all({}, self.db)
        file_name = f"{os.getcwd()}/backend/media/temp_csv/sensor-data.csv"
        
        with open(file_name, mode='w', newline="", encoding="utf-8") as file:
            writer = csv.writer(file)
            writer.writerow(["timestamp", "sensor_type", "module_code_name", "value"])
            for sensor_data in sensor_data_lst:
                writer.writerow([sensor_data.timestamp, sensor_data.sensor_type, sensor_data.module_code_name, sensor_data.value])
        return file_name