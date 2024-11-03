from typing import Optional, List
from models.baseModel import BaseModel
from models.sensor import Sensor
from datetime import datetime

class Module(BaseModel):
    code_name : str 
    friendly_name : str
    description : str   
    longitude : float
    latitude : float
    last_active : Optional[datetime] = None
    sensor_lst : Optional[List[Sensor]] = None
    
    class Config:
        arbitrary_types_allowed = True
