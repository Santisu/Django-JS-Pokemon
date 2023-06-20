from django.urls import path
from . import views


urlpatterns = [
    path('', views.PokedexIndexView.as_view(), name="index" ),
]