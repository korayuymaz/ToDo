# Generated by Django 4.0.2 on 2022-02-24 10:56

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0003_alter_task_datetime'),
    ]

    operations = [
        migrations.AlterField(
            model_name='task',
            name='datetime',
            field=models.DateTimeField(default=datetime.datetime(2022, 2, 24, 13, 56, 11, 558594)),
        ),
    ]
