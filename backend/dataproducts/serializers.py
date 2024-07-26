from rest_framework import serializers

from .models import DataCollection, DataProducts


class DataProductsGetSerializer(serializers.ModelSerializer):
    class Meta:
        model = DataProducts
        fields = ('id', 'name', 'created_at', 'updated_at')

    def to_representation(self, instance):
        data = super().to_representation(instance)
        if 'created_at' in data:
            data['created_at'] = instance.created_at.strftime(
                "%Y-%m-%d %H:%M:%S")
        if 'updated_at' in data:
            data['updated_at'] = instance.updated_at.strftime(
                "%Y-%m-%d %H:%M:%S")
        return data


class DataCollectionGetSerializer(serializers.ModelSerializer):
    class Meta:
        model = DataCollection
        fields = ('id', 'observatory', 'observation',
                  'created_at', 'updated_at')

    def to_representation(self, instance):
        data = super().to_representation(instance)
        if 'created_at' in data:
            data['created_at'] = instance.created_at.strftime(
                "%Y-%m-%d %H:%M:%S")
        if 'updated_at' in data:
            data['updated_at'] = instance.updated_at.strftime(
                "%Y-%m-%d %H:%M:%S")
        return data
