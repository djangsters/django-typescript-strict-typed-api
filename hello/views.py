from django.http import HttpRequest, HttpResponse
from django.shortcuts import render
from django.views.decorators.csrf import ensure_csrf_cookie


@ensure_csrf_cookie
def index(request: HttpRequest) -> HttpResponse:
    return render(request, "hello/index.html")
