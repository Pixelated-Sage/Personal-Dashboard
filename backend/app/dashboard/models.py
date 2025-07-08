from django.db import models

# Create your models here.
class Skill(models.Model):
    name = models.CharField(max_length=100)
    Category = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    Status = models.CharField(max_length=50, choices=[
        ('Not Started', 'Not Started'),
        ('In Progress', 'In Progress'),
        ('Completed', 'Completed'),
        ('On Hold', 'On Hold'),
        ('Cancelled', 'Cancelled'),
    ], default='Not Started')
    created_at = models.DateTimeField(auto_now_add=True)

class WeeklyPlan(models.Model):
    Date = models.DateField()
    Text = models.TextField()

class Certificate (models.Model):
    file = models.FileField(upload_to='certificates/')
    skill = models.ForeignKey(Skill, on_delete=models.CASCADE, related_name='certificates')
    issued_by = models.CharField(max_length=100)
    issued_date = models.DateField()