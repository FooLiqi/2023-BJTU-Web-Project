# Generated by Django 3.2.15 on 2023-06-14 13:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0014_alter_skill_precondition'),
    ]

    operations = [
        migrations.AlterField(
            model_name='skill',
            name='tag',
            field=models.CharField(blank=True, default='', max_length=20, null=True),
        ),
    ]
