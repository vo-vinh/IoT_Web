from database import get_database
from fastapi import APIRouter, Depends
from serializers.userSerializer import CreateUserSerializer, userSerializer
from services.userService import UserService

router = APIRouter(prefix="/user")

@router.post("")
def create_user(user : CreateUserSerializer, db = Depends(get_database)):
    return UserService(db).create_user(user)