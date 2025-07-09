from rest_framework import viewsets
from .models import Skill, WeeklyPlan, Certificate, Quote, Project, DailyTask
from .serializers import (
    SkillSerializer, WeeklyPlanSerializer, CertificateSerializer,
    QuoteSerializer, ProjectSerializer, DailyTaskSerializer
)

class SkillViewSet(viewsets.ModelViewSet):
    queryset = Skill.objects.all().order_by('-added_on')
    serializer_class = SkillSerializer

class WeeklyPlanViewSet(viewsets.ModelViewSet):
    queryset = WeeklyPlan.objects.all().order_by('-Date')
    serializer_class = WeeklyPlanSerializer

class CertificateViewSet(viewsets.ModelViewSet):
    queryset = Certificate.objects.all().order_by('-issued_date')
    serializer_class = CertificateSerializer

class QuoteViewSet(viewsets.ModelViewSet):
    queryset = Quote.objects.all().order_by('-created_at')
    serializer_class = QuoteSerializer

class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all().order_by('-created_at')
    serializer_class = ProjectSerializer

class DailyTaskViewSet(viewsets.ModelViewSet):
    queryset = DailyTask.objects.all().order_by('-date')
    serializer_class = DailyTaskSerializer
