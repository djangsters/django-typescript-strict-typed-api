from django.http import HttpRequest
from ninja import Router, Schema

router = Router()

class AddSchema(Schema):
    x: int
    y: int

@router.post("/add")
def add(request: HttpRequest, data: AddSchema):  # type: ignore[no-untyped-def] # noqa: ARG001
    return {"result": data.x + data.y}