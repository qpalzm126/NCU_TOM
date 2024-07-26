import uuid

from django.db import models
from helpers.models import Observatories


class DataProducts(models.Model):

    name = models.CharField(max_length=100, null=False, blank=True)
    observatory = models.IntegerField(choices=Observatories.choices)
    observation = models.ForeignKey(
        'observations.Observation', on_delete=models.CASCADE, null=False
    )
    user = models.ForeignKey(
        'helpers.Users', on_delete=models.CASCADE, null=True)
    path = models.FileField(upload_to='dataproducts/', null=False)
    created_at = models.DateTimeField(auto_now_add=True)
    shareable = models.BooleanField(default=False)
    thumbnail = models.FileField(upload_to='dataproducts/', null=True)

    @property
    def download_path(self):

        uuid_str = str(uuid.uuid5(uuid.NAMESPACE_DNS, self.path.name))
        # TODO setup download folder and path
        return f"dataproducts/{uuid_str}"


class DataCollection(models.Model):
    observatory = models.IntegerField(choices=Observatories.choices)
    observation = models.ForeignKey(
        'observations.Observation', on_delete=models.CASCADE, null=False
    )
    data = models.ManyToManyField(DataProducts)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
