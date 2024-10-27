from serializers.baseSerializer import BaseSerializer
from pydantic import BaseModel as PydanticBaseModel
from pydantic import Field
from typing import Optional
from utils.customObjectId import ObjectIdPydantic
from exception.badRequest import BadRequestException
from datetime import datetime, date
from typing import List, Literal
from models.sensor import SensorType

class SensorDataSerializer(BaseSerializer):
    id : Optional[ObjectIdPydantic] = Field(None)
    value : float
    timestamp : str
    sensor_type : SensorType
    module_code_name : str
    
class SensorData(PydanticBaseModel):
    value : float 
    timestamp : datetime
    sensor_type : SensorType

class CreateSensorDataSerializer(BaseSerializer):
    data : List[SensorData]
    module_code_name : str

class FilterSensorDataSerializer(BaseSerializer):
    sensor_type : Optional[str] = None
    module_code_name : Optional[str] = None
    start_date : Optional[date] = None
    end_date : Optional[date] = None
    limit : Optional[int] = None
    offset : Optional[int] = None
    sort_by : Literal['timestamp', 'value', 'module_code_name'] = None
    sort_order : Literal['asc', 'desc'] = None
    
    def get_query(self):
        query = {}
        if self.sensor_type:
            query['sensor_type'] = self.sensor_type
        if self.module_code_name:
            query['module_code_name'] = self.module_code_name
        if self.start_date:
            query['timestamp'] = {"$gte": datetime.combine(self.start_date, datetime.min.time())}
        if self.end_date:
            query['timestamp'] = {"$lte": datetime.combine(self.end_date, datetime.min.time())}
        if self.limit:
            query['limit'] = self.limit
        if self.offset:
            query['offset'] = self.offset
        if self.sort_by:
            query['sort_by'] = self.sort_by
        if self.sort_order:
            query['sort_order'] = self.sort_order
        return query
            