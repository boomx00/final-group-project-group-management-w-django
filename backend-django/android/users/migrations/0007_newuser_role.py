# Generated by Django 3.1.7 on 2021-04-14 15:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0006_auto_20210414_0832'),
    ]

    operations = [
        migrations.AddField(
            model_name='newuser',
            name='role',
            field=models.CharField(blank=True, max_length=150),
        ),
    ]