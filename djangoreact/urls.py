from django.contrib import admin
from django.contrib.admin.views.decorators import staff_member_required
from django.urls import include, path
from ninja import NinjaAPI
from ninja.security import django_auth

from hello.api import router as hello_router

api = NinjaAPI(
    auth=django_auth,
    docs_decorator=staff_member_required,
)

api.add_router("/hello/", hello_router)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", api.urls),
    path("", include("hello.urls")),
]
