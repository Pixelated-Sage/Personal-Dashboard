from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    SkillViewSet, WeeklyPlanViewSet, CertificateViewSet,
    QuoteViewSet, ProjectViewSet, DailyTaskViewSet
)

router = DefaultRouter()
router.register(r'skills', SkillViewSet)
router.register(r'plans', WeeklyPlanViewSet)
router.register(r'certificates', CertificateViewSet)
router.register(r'quotes', QuoteViewSet)
router.register(r'projects', ProjectViewSet)
router.register(r'tasks', DailyTaskViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
