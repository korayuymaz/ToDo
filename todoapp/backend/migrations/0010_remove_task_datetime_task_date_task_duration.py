# Generated by Django 4.0.2 on 2022-03-09 06:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0009_task_user_alter_task_datetime'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='task',
            name='datetime',
        ),
        migrations.AddField(
            model_name='task',
            name='date',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='task',
            name='duration',
            field=models.CharField(blank=True, max_length=3, null=True),
        ),
    ]
