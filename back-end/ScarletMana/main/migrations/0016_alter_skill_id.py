# Generated by Django 3.2.15 on 2023-06-14 14:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0015_alter_skill_tag'),
    ]

    operations = [
        migrations.AlterField(
            model_name='skill',
            name='ID',
            field=models.IntegerField(primary_key=True, serialize=False),
        ),
    ]
