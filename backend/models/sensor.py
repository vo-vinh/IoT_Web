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
    module_code_name : str