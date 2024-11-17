from models.baseModel import BaseModel
from datetime import datetime
from database import Database
from models.sensor import SensorType
from bson.json_util import dumps

class LogModel(BaseModel):
    timestamp: datetime
    sensor_id : str
    value : float
    module_code_name : str
    sensor_type : SensorType
    sensor_name : str 
    
    @classmethod
    def delete_all(self, db: Database, query):
        db.delete(self.get_collection_name(), query)
        return True
    
    @classmethod
    def find_all(self, db: Database, query):
        documents = db.find(self.get_collection_name(), query)
        document_lst = []
        for document in documents:
            document["_id"] = str(document["_id"])
            document["created_at"] = document["created_at"].isoformat()
            document["timestamp"] = document["timestamp"].isoformat()
            document_lst.append(document)
        return [self.model_validate_json(dumps(document)) for document in document_lst]