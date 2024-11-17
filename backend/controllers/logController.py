from fastapi import APIRouter, Depends
from database import get_database
from services.logService import LogService
from fastapi.responses import JSONResponse
from fastapi.responses import FileResponse

router = APIRouter(prefix="/log")

@router.get("/{module_code_name}")
def list_logs(module_code_name, db = Depends(get_database)):
    return LogService(db).list(module_code_name)

@router.delete("/{module_code_name}")
def remove_log(module_code_name, db = Depends(get_database)):
    LogService(db).remove_log(module_code_name)
    return JSONResponse(status_code=200, content= "")

@router.get("/download/{module_code_name}")
def download_log(module_code_name, db = Depends(get_database)):
    file_name = LogService(db).download_log(module_code_name)
    return FileResponse(file_name, media_type='text/csv', filename='log.csv')