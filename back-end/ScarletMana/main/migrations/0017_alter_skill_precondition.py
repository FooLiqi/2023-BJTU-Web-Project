# Generated by Django 3.2.15 on 2023-06-14 14:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0016_alter_skill_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='skill',
            name='precondition',
            field=models.IntegerField(default=0, null=True),
        ),
    ]
