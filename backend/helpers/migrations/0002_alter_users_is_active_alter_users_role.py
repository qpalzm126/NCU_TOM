# Generated by Django 4.2.6 on 2024-05-29 07:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('helpers', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='users',
            name='is_active',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='users',
            name='role',
            field=models.IntegerField(choices=[(1, 'Admin'), (2, 'Faculty'), (3, 'User'), (4, 'Visitor')], default=4),
        ),
    ]