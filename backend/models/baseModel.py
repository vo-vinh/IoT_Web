from pydantic import BaseModel as PydanticBaseModel
from pydantic import Field
from typing import Optional
from utils.customObjectId import CustomObjectId
from datetime import datetime
from database import Database

class BaseModel(PydanticBaseModel):
    id : Optional[CustomObjectId] = Field(default_factory= CustomObjectId, alias="_id")
    created_at : datetime = Field(default_factory= datetime.now, alias="created_at")
    
    class Config: 
        json_encoders = {
            CustomObjectId: str,
            datetime: lambda dt: dt.isoformat() 
        }
    
    def save(self, db: Database):
        res = db.insert_one(self.__class__.__name__.lower(), self.model_dump())
        self.id = str(res.inserted_id)
    
    def update(self, db: Database):
        db.update(self.__class__.__name__.lower(), {"_id": self._id}, self.model_dump())
    
    def delete(self, db: Database):
        db.delete(self.__class__.__name__.lower(), {"_id": self._id})
        
    @classmethod
    def find(cls, query, db: Database):
        document = db.find_one(cls.__name__.lower(), query)
        return cls.model_validate_json(document)
        