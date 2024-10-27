from models.baseModel import BaseModel
from typing import Optional
from enum import Enum
from datetime import datetime
from pydantic import Field

class SensorType(str, Enum):
    # TODO: modify this to include all sensor types
    TEMPERATURE = "temperature"
    HUMIDITY = "humidity"
    PRESSURE = "pressure"

class Sensor(BaseModel):
    name: str 
    description: Optional[str] = None
    type : SensorType
    last_active : Optional[datetime] = None
    module_code_name : str