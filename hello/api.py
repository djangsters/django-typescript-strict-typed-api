from django.http import HttpRequest
from ninja import Router, Schema

router = Router()

class AddSchema(Schema):
    x: int
    y: int

class ResultSchema(Schema):
    result: int

@router.post("/add", response=ResultSchema)
def add(request: HttpRequest, data: AddSchema):
    return {"result": data.x + data.y}