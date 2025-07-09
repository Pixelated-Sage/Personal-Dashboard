from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import Quote, DailyTask, Skill, Project, Certificate

admin.site.register(Quote)
admin.site.register(DailyTask)
admin.site.register(Skill)
admin.site.register(Project)
admin.site.register(Certificate)
