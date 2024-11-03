from database import Database
<<<<<<< Updated upstream
from exception.badRequest import BadRequestException
from exception.notFound import NotFoundException
from models.module import Module
from models.sensor import Sensor
from serializers.moduleSerializer import CreateModuleSerializer, ModuleSerializer, UpdateModuleSerializer
from bson.json_util import dumps

class moduleService:
    def __init__(self, db: Database):
        self.db = db
    
    def create_module(self, module : CreateModuleSerializer):
        # Check if module with code name already exists
        current_module = Module.find({"code_name": module.code_name}, self.db)
        if current_module:
            raise BadRequestException("Module with code name already exists")
        # Create module
        module_obj = Module.model_validate_json(module.model_dump_json())
        module_obj.save(self.db)
        return ModuleSerializer.model_validate(module_obj.model_dump())

    def update_module(self, module_code_name, module : UpdateModuleSerializer):
        module_obj = Module.find({"code_name": module_code_name}, self.db)
        if not module_obj:
            raise NotFoundException("Module does not exist")
        module_obj = module_obj.update(module.model_dump(), self.db)
        module_obj.id = str(module_obj.id)
        return ModuleSerializer.model_validate(module_obj.model_dump())

    def delete_module(self, module_code_name):
        module_obj = Module.find({"code_name": module_code_name}, self.db)
        if not module_obj:
            raise NotFoundException("Module does not exist")
        module_obj.delete(self.db)
        return True
    
    def get_all_modules(self):
        modules = Module.find_all({}, self.db)
        return [self.get_module(module.code_name) for module in modules]
    
    def get_module(self, module_code_name):
        module_obj = Module.find({"code_name": module_code_name}, self.db)
        if not module_obj:
            raise NotFoundException("Module does not exist")
        # Get all sensors in the module
        sensor_lst = Sensor.find_all({"module_code_name": module_code_name}, self.db)
        module_obj.sensor_lst = sensor_lst
        module_obj.id = str(module_obj.id)
        return ModuleSerializer.model_validate(module_obj.model_dump())
=======
from models.module import Module
from serializers.moduleSerializer import CreateModuleSerializer, ModuleSerializer

class ModuleService:
    def __init__(self, db: Database):
        self.db = db
    
    def create_module(self, module_serializer : CreateModuleSerializer):
        #TODO : check unique name
        module_obj = Module.model_validate_json(module_serializer.model_dump_json()) 
        module_obj.save(self.db)
        return ModuleSerializer.model_validate(module_obj.model_dump())
>>>>>>> Stashed changes
    