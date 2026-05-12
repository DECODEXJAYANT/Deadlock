from django.urls import path
from .views import GenerateItineraryView, GeneratePersonalizedItineraryView

urlpatterns = [
    path('generate/', GenerateItineraryView.as_view()),
    path('generate-personalized/', GeneratePersonalizedItineraryView.as_view()),
]
