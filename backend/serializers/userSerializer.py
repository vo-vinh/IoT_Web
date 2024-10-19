from serializers.baseSerializer import BaseSerializer
from pydantic import field_validator
from exception.badRequest import BadRequestException

class CreateUserSerializer(BaseSerializer):
    username : str 
    password : str 
    
    @field_validator("password")
    def password_length(cls, value):
        if len(value) < 8:
            raise BadRequestException("Password must be at least 8 characters long")
        return value


class userSerializer(BaseSerializer):
    username : str 
    password : str 
    id : str 
    