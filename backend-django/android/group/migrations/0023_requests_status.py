# Generated by Django 3.1.7 on 2021-04-19 13:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('group', '0022_auto_20210419_0704'),
    ]

    operations = [
        migrations.AddField(
            model_name='requests',
            name='status',
            field=models.CharField(blank=True, max_length=100),
        ),
    ]