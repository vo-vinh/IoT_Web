from bson.json_util import dumps
from database import Database
from models.baseModel import BaseModel
from datetime import datetime
from models.sensor import SensorType

class SensorData(BaseModel):
    value: float
    timestamp: datetime
    sensor_type : SensorType 
    module_code_name : str
    
    @classmethod
    def find_all(cls, query, db: Database):
        documents = db.find(cls.get_collection_name(), query)
        document_lst = []
        for document in documents:
            document["_id"] = str(document["_id"])
            document["created_at"] = document["created_at"].isoformat()
            document["timestamp"] = document["timestamp"].isoformat()
            document_lst.append(document)
        return [cls.model_validate_json(dumps(document)) for document in document_lst]