from rest_framework import viewsets
from .models import Skill, WeeklyPlan, Certificate
from .serializers import SkillSerializer, WeeklyPlanSerializer, CertificateSerializer


class SkillViewSet(viewsets.ModelViewSet):
    queryset = Skill.objects.all().order_by('-created_at')
    serializer_class = SkillSerializer

class WeeklyPlanViewSet(viewsets.ModelViewSet):
    queryset = WeeklyPlan.objects.all().order_by('-Date')
    serializer_class = WeeklyPlanSerializer

class CertificateViewSet(viewsets.ModelViewSet):
    queryset = Certificate.objects.all().order_by('-issued_date')
    serializer_class = CertificateSerializer