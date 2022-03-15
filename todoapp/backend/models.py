from django.db import models
from datetime import datetime
from django.contrib.auth.models import User

# Create your models here.
class Task(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    description = models.CharField(max_length=1000)
    completed = models.BooleanField(editable=True, blank=True)
    complition_datetime = models.DateTimeField(blank=True, null=True)
    date = models.DateField(blank=True, null=True)
    duration = models.CharField(blank=True, null=True, max_length=3)