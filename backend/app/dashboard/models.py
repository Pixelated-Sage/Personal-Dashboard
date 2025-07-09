from django.db import models

class Quote(models.Model):
    content = models.TextField()
    created_at = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.content[:50]

class DailyTask(models.Model):
    PRIORITY_CHOICES = [
        ('low', 'Low'),
        ('medium', 'Medium'),
        ('high', 'High'),
    ]
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    date = models.DateField()
    status = models.CharField(max_length=50, choices=[
        ('pending', 'Pending'),
        ('in_progress', 'In Progress'),
        ('completed', 'Completed'),
    ], default='pending')
    priority = models.CharField(max_length=10, choices=PRIORITY_CHOICES, default='low')
    def __str__(self):
        return self.title

class Skill(models.Model):
    name = models.CharField(max_length=255)
    category = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    status = models.CharField(max_length=50, choices=[
        ('not_started', 'Not Started'),
        ('in_progress', 'In Progress'),
        ('completed', 'Completed'),
        ('on_hold', 'On Hold'),
        ('cancelled', 'Cancelled'),
    ], default='not_started')
    added_on = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.name

class Project(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    percent = models.PositiveIntegerField(default=0)
    status = models.CharField(max_length=50, default="Planning")
    color = models.CharField(max_length=100, default="text-purple-400")
    created_at = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.title

class Certificate(models.Model):
    issued_by = models.CharField(max_length=255)
    skill = models.CharField(max_length=255)
    issued_date = models.DateField()


    def __str__(self):
        return f"{self.skill} - {self.issued_by}"


class WeeklyPlan(models.Model): 
    Date = models.DateField()
    Text = models.TextField()

    def __str__(self):
        return f"Plan for {self.Date}"