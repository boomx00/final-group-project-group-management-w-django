# Generated by Django 3.1.7 on 2021-04-15 20:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('group', '0006_requests'),
    ]

    operations = [
        migrations.AddField(
            model_name='requests',
            name='name',
            field=models.CharField(blank=True, max_length=100),
        ),
    ]
