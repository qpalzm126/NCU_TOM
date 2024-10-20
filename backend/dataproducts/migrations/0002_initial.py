# Generated by Django 4.2.6 on 2024-10-13 07:15

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('dataproducts', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('targets', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='lulindataproduct',
            name='target',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='targets.target'),
        ),
        migrations.AddField(
            model_name='lulindataproduct',
            name='user',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='dataproducts',
            name='user',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
