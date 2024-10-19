from database import Database
from models.user import User
from serializers.userSerializer import CreateUserSerializer, userSerializer

class UserService:
    def __init__(self, db: Database):
        self.db = db
    
    def create_user(self, user : CreateUserSerializer):
        user_obj = User.model_validate_json(user.model_dump_json())
        user_obj.save(self.db)
        return userSerializer.model_validate(user_obj.model_dump())
    
    def get_user(self, user_id):
        user = User.find({"_id": user_id}, self.db)
        return user