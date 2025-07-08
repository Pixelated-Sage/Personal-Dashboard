from django.urls import path, include
from .views import SkillViewSet , WeeklyPlanViewSet, CertificateViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r"skills" , SkillViewSet , basename = "skills")
router.register(r"plans" , WeeklyPlanViewSet , basename = "plans")
router.register(r"certificates" , CertificateViewSet , basename = "certificates")


urlpatterns = [
    path("" , include(router.urls)),
]