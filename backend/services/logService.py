from database import Database
from models.logModel import LogModel
from serializers.logSerializer import LogSerializer
import csv
import uuid
import os

class LogService:
    def __init__(self, db: Database):
        self.db = db
        
    def list(self, module_code_name):
        obj_lst = LogModel.find_all(query= {"module_code_name": module_code_name}, db=self.db)
        for obj in obj_lst:
            obj.id = str(obj.id)
        return [LogSerializer.model_validate(obj.model_dump()) for obj in obj_lst]
    
    def remove_log(self, module_code_name):
        LogModel.delete_all(query={"module_code_name": module_code_name}, db = self.db)
        return True
    
    def download_log(self, module_code_name):
        obj_lst = LogModel.find_all(query= {"module_code_name": module_code_name}, db=self.db)
        file_name = f"{os.getcwd()}/backend/media/temp_csv/{uuid.uuid4()}.csv"
        with open(file_name, mode='w', newline="", encoding="utf-8") as file:
            writer = csv.writer(file)
            writer.writerow(["timestamp", "sensor_id", "value", "module_code_name", "sensor_type", "sensor_name"])
            for obj in obj_lst:
                writer.writerow([obj.timestamp, obj.sensor_id, obj.value, obj.module_code_name, obj.sensor_type, obj.sensor_name])
        return file_name