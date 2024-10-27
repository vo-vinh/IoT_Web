from bson import ObjectId
from pydantic import BaseModel as PydanticBaseModel
from pydantic import Field
from typing import Optional
from utils.customObjectId import ObjectIdPydantic
from datetime import datetime
from database import Database
from typing import Annotated, Any
from bson.json_util import dumps
import re 

class BaseModel(PydanticBaseModel):
    id: Optional[ObjectIdPydantic] = Field(None, alias="_id")
    created_at : datetime = Field(default_factory= datetime.now, alias="created_at")
    
    class Config: 
        json_encoders = {
            datetime: lambda dt: dt.isoformat() 
        }
        arbitrary_types_allowed = True
    
    def _get_collection_name(cls):
        name = cls.__class__.__name__
        s1 = re.sub('(.)([A-Z][a-z]+)', r'\1_\2', name)
        return re.sub('([a-z0-9])([A-Z])', r'\1_\2', s1).lower()
    
    @classmethod
    def get_collection_name(cls):
        name = cls.__name__
        s1 = re.sub('(.)([A-Z][a-z]+)', r'\1_\2', name)
        return re.sub('([a-z0-9])([A-Z])', r'\1_\2', s1).lower()
    
    def save(self, db: Database):
        res = db.insert_one(self._get_collection_name(), self.model_dump())
        self.id = str(res.inserted_id)
    
    def update(self, update_data : dict, db: Database):
        # add attribute to update_data
        for key, value in self.model_dump().items():
            if key not in update_data.keys() or update_data[key] is None:
                update_data[key] = value
        # handcode not update _id and created_at
        if "_id" in update_data:
            del update_data["_id"]
        if "sensor_lst" in update_data:
            del update_data["sensor_lst"]
        update_data["created_at"] = self.created_at
                
        db.update(self.get_collection_name(), {"_id": self.id}, {"$set": update_data})
        for key, value in update_data.items():
            setattr(self, key, value)
        return self
    
    def delete(self, db: Database):
        db.delete(self._get_collection_name(), {"_id": self.id})
        
    @classmethod
    def find(cls, query, db: Database):
        if (isinstance(query, dict) and "_id" in query):
            query["_id"] = ObjectId(query["_id"])
        document = db.find_one(cls.get_collection_name(), query)
        if document:
            document["_id"] = str(document["_id"])
            document["created_at"] = document["created_at"].isoformat()
            return cls.model_validate_json(dumps(document)) 
        return None
    
    @classmethod
    def find_all(cls, query, db: Database):
        documents = db.find(cls.get_collection_name(), query)
        document_lst = []
        for document in documents:
            document["_id"] = str(document["_id"])
            document["created_at"] = document["created_at"].isoformat()
            document_lst.append(document)
        return [cls.model_validate_json(dumps(document)) for document in document_lst]
        