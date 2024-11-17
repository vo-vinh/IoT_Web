from bson import ObjectId
from database import Database
from models.baseModel import BaseModel
from typing import Optional
from enum import Enum
from datetime import datetime
from pydantic import Field

class SensorType(str, Enum):
    HUMIDITY = "humidity"
    TEMPERATURE = "temperature"
    PH = "pH"
    CONDUCTIVITY = "conductivity"
    NITROGEN = "nitrogen"
    PHOSPHORUS = "phosphorus"
    POTASSIUM = "potassium"
    LIGHT = "light"
    SOIL_MOISTURE = "soilMoisture"

class Sensor(BaseModel):
    name: str 
    description: Optional[str] = None
    type : SensorType
    last_active : Optional[datetime] = None
    value : Optional[float] = 0.0
    module_code_name : str
    
    @classmethod
    def find(cls, query, db: Database):
        if (isinstance(query, dict) and "_id" in query):
            query["_id"] = ObjectId(query["_id"])
        sensor = db.find_one(cls.get_collection_name(), query)
        if sensor:
            if sensor.get("last_active"):
                sensor["last_active"] = sensor["last_active"].isoformat()
            return cls.model_validate(sensor)
        return None