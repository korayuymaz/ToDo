from re import T
from django.db import models
from datetime import datetime

# Create your models here.
class Task(models.Model):
    description = models.CharField(max_length=1000)
    datetime = models.DateTimeField(default=datetime.now())
    completed = models.BooleanField(editable=True, blank=True)
    complition_datetime = models.DateTimeField(blank=True, null=True)
    