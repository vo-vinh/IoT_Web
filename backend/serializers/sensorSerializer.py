from serializers.baseSerializer import BaseSerializer
from typing import Optional
from datetime import datetime
from utils.customObjectId import ObjectIdPydantic
from models.sensor import SensorType
from pydantic import Field

class SensorSerializer(BaseSerializer):
    id : ObjectIdPydantic = Field(None)
    name: str 
    description: Optional[str] = None
    type : SensorType
    last_active : Optional[datetime] = None
    module_code_name : str
    

class CreateSensorSerializer(BaseSerializer):
    name: str 
    description: Optional[str] = None
    type : SensorType
    

class UpdateSensorSerializer(BaseSerializer):
    name: Optional[str] = None
    description: Optional[str] = None
    type : Optional[SensorType] = None