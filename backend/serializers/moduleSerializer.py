<<<<<<< Updated upstream
from datetime import datetime
from typing import Optional, List
from serializers.baseSerializer import BaseSerializer 
from serializers.sensorSerializer import SensorSerializer
from pydantic import Field


class ModuleSerializer(BaseSerializer):
    """
    Read all the attributes of a module
    include sensor_lst to show all the sensors in the module
    """
    id : str
    code_name : str 
    friendly_name : str
    description : str   
    longitute : float
    latitude : float
    last_active : Optional[datetime] = None
    sensor_lst : Optional[List[SensorSerializer]] = None
    
class CreateModuleSerializer(BaseSerializer):
    """
    create a new module without last_active field 
    """
    code_name : str 
    friendly_name : str
    description : str   
    longitute : float
    latitude : float
    
class UpdateModuleSerializer(BaseSerializer):
    """
    update a module without last_active, code_name field
    """
    friendly_name : Optional[str] = None
    description : Optional[str] = None
    longitute : Optional[float] = None
    latitude : Optional[float] = None
=======
from serializers.baseSerializer import BaseSerializer
from pydantic import field_validator
from exception.badRequest import BadRequestException
from datetime import datetime
from typing import Optional

class CreateModuleSerializer(BaseSerializer):
    name : str
    description : str
    longitute : float
    latitute : float
    

class ModuleSerializer(BaseSerializer):
    name : str
    description : str
    longitute : float
    latitute : float
    last_active : Optional[datetime]
    id : str 
    
>>>>>>> Stashed changes
