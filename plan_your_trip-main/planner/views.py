from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .itinerary_generator import generate_plan, generate_personalized_plan
from .preference_matcher import PreferenceMatcher
import logging

logger = logging.getLogger(__name__)
preference_matcher = PreferenceMatcher()


class GenerateItineraryView(APIView):
    def get(self, request):
        return Response(
            {'error': 'This endpoint only accepts POST requests.'},
            status=status.HTTP_405_METHOD_NOT_ALLOWED
        )

    def post(self, request):
        try:
            # Validate required fields (5+ inputs as per requirements)
            required_fields = ['budget', 'destination', 'from_date', 'to_date', 'trip_type']
            if not all(field in request.data for field in required_fields):
                return Response(
                    {'error': f'Missing required fields. Required: {", ".join(required_fields)}'},
                    status=status.HTTP_400_BAD_REQUEST
                )

            # Generate itinerary using basic rule-based approach
            itinerary = generate_plan(
                request.data['budget'],
                request.data['destination'],
                request.data['from_date'],
                request.data['to_date'],
                request.data['trip_type']
            )
            return Response(itinerary)

        except ValueError as e:
            logger.error(f"Validation error: {str(e)}")
            return Response(
                {'error': str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )
        except Exception as e:
            logger.error(f"Unexpected error: {str(e)}")
            return Response(
                {'error': 'An unexpected error occurred while generating itinerary'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class GeneratePersonalizedItineraryView(APIView):
    """
    Enhanced endpoint that uses ML-based preference matching and text classification
    Accepts 5+ inputs: budget, dates, travelers, preferences, profile info, etc.
    """
    
    def post(self, request):
        try:
            # Extract and validate core inputs (5+)
            data = request.data
            
            # Core inputs (required)
            budget = data.get('budget')
            destination = data.get('destination')
            from_date = data.get('from_date')
            to_date = data.get('to_date')
            travelers = data.get('travelers', 1)
            
            if not all([budget, destination, from_date, to_date]):
                return Response(
                    {'error': 'Missing core fields: budget, destination, from_date, to_date'},
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            # Additional preference inputs (for personalization)
            user_preferences = {
                'activity_preferences': data.get('activity_preferences', ''),
                'accommodation_type': data.get('accommodation_type', 'mid_range'),
                'weather_preference': data.get('weather_preference', 'any'),
                'special_interests': data.get('special_interests', '')
            }
            
            # User profile for personalization
            user_profile = {
                'age': data.get('age', 30),
                'fitness_level': data.get('fitness_level', 'moderate'),
                'travel_style': data.get('travel_style', 'balanced')
            }
            
            logger.info(f"Generating personalized itinerary with preferences: {user_preferences}")
            
            # Use ML-enhanced generation
            itinerary = generate_personalized_plan(
                budget=budget,
                destination=destination,
                from_date=from_date,
                to_date=to_date,
                travelers=travelers,
                user_preferences=user_preferences,
                user_profile=user_profile,
                preference_matcher=preference_matcher
            )
            
            return Response({
                'success': True,
                'data': itinerary,
                'personalization_metadata': {
                    'preferences_used': user_preferences,
                    'profile_applied': user_profile
                }
            })

        except ValueError as e:
            logger.error(f"Validation error: {str(e)}")
            return Response(
                {'error': str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )
        except Exception as e:
            logger.error(f"Unexpected error: {str(e)}", exc_info=True)
            return Response(
                {'error': f'An error occurred: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
