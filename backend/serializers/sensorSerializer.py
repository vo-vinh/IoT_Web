from serializers.baseSerializer import BaseSerializer
from typing import Optional
from datetime import datetime
from bson import ObjectId
from models.sensor import SensorType

class SensorSerializer(BaseSerializer):
    id : ObjectId
    name: str 
    description: Optional[str] = None
    type : SensorType
    last_active : Optional[datetime] = None
    module_id : ObjectId
    

class CreateSensorSerializer(BaseSerializer):
    name: str 
    description: Optional[str] = None
    type : SensorType
    module_id : ObjectId
    

class UpdateSensorSerializer(BaseSerializer):
    name: Optional[str] = None
    description: Optional[str] = None
    type : Optional[SensorType] = None
    last_active : Optional[datetime] = None
    module_id : Optional[ObjectId] = None