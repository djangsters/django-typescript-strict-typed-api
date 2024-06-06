from django.http import HttpRequest
from ninja import Router, Schema

router = Router()

class AddSchema(Schema):
    a: int
    b: int

@router.post("/add")
def add(request: HttpRequest, data: AddSchema):  # type: ignore[no-untyped-def] # noqa: ARG001
    return {"result": data.a + data.b}
