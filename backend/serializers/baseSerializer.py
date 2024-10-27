from pydantic import BaseModel as PydanticBaseModel, field_validator
from typing import Optional
from utils.customObjectId import ObjectIdPydantic
from datetime import datetime
from pydantic import Field

class BaseSerializer(PydanticBaseModel):
    
    id: Optional[ObjectIdPydantic] = Field(None)
    created_at : datetime = Field(default_factory= datetime.now, alias="created_at")
    
    class Config: 
        json_encoders = {
            datetime: lambda dt: dt.isoformat() 
        }
        arbitrary_types_allowed = True
    