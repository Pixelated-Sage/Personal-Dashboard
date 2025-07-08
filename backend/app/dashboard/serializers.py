from rest_framework import serializers
from .models import Skill , WeeklyPlan , Certificate

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = '__all__'
class WeeklyPlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = WeeklyPlan
        fields = '__all__'
class CertificateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Certificate
        fields = '__all__'