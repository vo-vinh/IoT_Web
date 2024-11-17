from serializers.baseSerializer import BaseSerializer
from datetime import datetime
from models.sensor import SensorType


class LogSerializer(BaseSerializer):
    id : str 
    timestamp : datetime
    sensor_id : str
    value : float
    module_code_name : str
    sensor_type : SensorType
    sensor_name : str 