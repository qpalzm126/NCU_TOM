
from datetime import datetime
from typing import List

from django.db.models import Q
from django.http import HttpResponse, JsonResponse
from django.shortcuts import get_object_or_404
from drf_spectacular.utils import extend_schema
from helpers.models import Comments, Users
from helpers.paginator import Pagination
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from targets.views import get_targets_altaz
from targets.visibility import TargetAltAz

from .models import DataCollection, DataProducts
from .serializers import DataProductsGetSerializer


class DataProductsView(APIView):
    serializer_class = DataProductsGetSerializer
    paginator = Pagination()

    def get(self, request):
        dataproducts = DataProducts.objects.all()
        results = self.paginator.paginate_queryset(dataproducts, request)
        serializer = DataProductsGetSerializer(results, many=True)

        return self.paginator.get_paginated_response(serializer.data)


class DataCollectionView(APIView):
    serializer_class = DataProductsGetSerializer
    paginator = Pagination()

    def get(self, request):
        data_colletion = DataCollection.objects.all()
        results = self.paginator.paginate_queryset(data_colletion, request)
        serializer = DataProductsGetSerializer(results, many=True)

        return self.paginator.get_paginated_response(serializer.data)
