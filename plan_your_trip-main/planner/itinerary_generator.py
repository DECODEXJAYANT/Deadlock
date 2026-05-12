import os
import pandas as pd
from datetime import datetime, timedelta
import logging
import numpy as np

logger = logging.getLogger(__name__)

def load_data(file_path):
    """Load CSV data with error handling"""
    try:
        if not os.path.exists(file_path):
            raise FileNotFoundError(f"Data file not found: {file_path}")
        return pd.read_csv(file_path)
    except Exception as e:
        logger.error(f"Error loading {file_path}: {str(e)}")
        raise

def generate_plan(budget, destination, from_date, to_date, trip_type):
    """Generate travel itinerary with proper error handling"""
    try:
        # Load data files with error handling
        data_dir = os.path.join(os.path.dirname(__file__), 'data')
        hotels = load_data(os.path.join(data_dir, "hotels.csv"))
        activities = load_data(os.path.join(data_dir, "activities.csv"))
        transport = load_data(os.path.join(data_dir, "transport.csv"))

        # Validate date format and calculate days
        try:
            from_date = datetime.strptime(from_date, "%Y-%m-%d")
            to_date = datetime.strptime(to_date, "%Y-%m-%d")
            num_days = (to_date - from_date).days + 1
            if num_days <= 0:
                raise ValueError("End date must be after start date")
        except ValueError as e:
            raise ValueError(f"Invalid date format: {str(e)}")

        # Weather functionality removed
        weather = "Weather information unavailable"

        # Find matching hotel
        hotel_matches = hotels[hotels['destination'] == destination]
        if len(hotel_matches) == 0:
            raise ValueError(f"No hotels found for destination: {destination}")
        hotel = hotel_matches.iloc[0]
        stay_cost = hotel['price_per_night'] * num_days

        # Find matching activities
        act = activities[(activities['destination'] == destination) & 
                         (activities['type'] == trip_type)]
        if len(act) == 0:
            raise ValueError(f"No activities found for {trip_type} in {destination}")
        selected_activities = act.head(num_days)

        # Build daily plan
        daily_plan = []
        total_activity_cost = 0
        for i in range(num_days):
            activity = selected_activities.iloc[i % len(selected_activities)]
            total_activity_cost += activity['price']
            daily_plan.append({
                "day": f"Day {i+1}",
                "activity": activity['activity'],
                "stay": hotel['hotel_name'],
                "cost": {
                    "stay": hotel['price_per_night'],
                    "food": 500,
                    "activity": activity['price']
                }
            })

        # Calculate transport cost
        transport_matches = transport[transport['to'] == destination]
        if len(transport_matches) == 0:
            raise ValueError(f"No transport options found to {destination}")
        travel_cost = transport_matches.iloc[0]['price']

        total = travel_cost + stay_cost + total_activity_cost + (500 * num_days)
        
        return {
            "destination": destination,
            "from": from_date.strftime("%Y-%m-%d"),
            "to": to_date.strftime("%Y-%m-%d"),
            "type": trip_type,
            "weather": weather,
            "total_estimated_expense": total,
            "itinerary": daily_plan
        }
    except Exception as e:
        logger.error(f"Error generating plan: {str(e)}")
        raise


def generate_personalized_plan(budget, destination, from_date, to_date, travelers, 
                               user_preferences, user_profile, preference_matcher):
    """
    Generate personalized travel itinerary using ML preference matching
    
    Args:
        budget: Total trip budget
        destination: Destination city
        from_date: Start date (YYYY-MM-DD)
        to_date: End date (YYYY-MM-DD)
        travelers: Number of travelers
        user_preferences: Dict with activity_preferences, accommodation_type, etc.
        user_profile: Dict with age, fitness_level, travel_style
        preference_matcher: PreferenceMatcher instance for ML-based matching
    
    Returns:
        Personalized itinerary dict with recommendations
    """
    try:
        # Load data files
        data_dir = os.path.join(os.path.dirname(__file__), 'data')
        hotels = load_data(os.path.join(data_dir, "hotels.csv"))
        activities = load_data(os.path.join(data_dir, "activities.csv"))
        transport = load_data(os.path.join(data_dir, "transport.csv"))

        # Validate dates
        try:
            from_date_obj = datetime.strptime(from_date, "%Y-%m-%d")
            to_date_obj = datetime.strptime(to_date, "%Y-%m-%d")
            num_days = (to_date_obj - from_date_obj).days + 1
            if num_days <= 0:
                raise ValueError("End date must be after start date")
        except ValueError as e:
            raise ValueError(f"Invalid date format: {str(e)}")

        # Calculate budgets per category
        daily_budget = budget / num_days
        accommodation_budget = daily_budget * 0.4
        activity_budget = daily_budget * 0.4
        food_budget = daily_budget * 0.2

        # Find matching hotels using ML scoring
        hotel_matches = hotels[hotels['destination'] == destination]
        if len(hotel_matches) == 0:
            raise ValueError(f"No hotels found for destination: {destination}")
        
        # Score and select best hotels using preference matching
        scored_hotels = []
        for idx, hotel in hotel_matches.iterrows():
            score = preference_matcher.score_hotel_match(
                hotel.to_dict(),
                user_preferences,
                accommodation_budget
            )
            scored_hotels.append({
                'hotel': hotel,
                'score': score
            })
        
        scored_hotels.sort(key=lambda x: x['score'], reverse=True)
        selected_hotel = scored_hotels[0]['hotel'] if scored_hotels else hotel_matches.iloc[0]
        stay_cost = selected_hotel['price_per_night'] * num_days

        # Find and score activities using ML-based preference matching
        activity_matches = activities[activities['destination'] == destination]
        if len(activity_matches) == 0:
            raise ValueError(f"No activities found for {destination}")

        # Score all activities against user preferences
        scored_activities = []
        for idx, activity in activity_matches.iterrows():
            score = preference_matcher.score_activity_match(
                activity.to_dict(),
                user_preferences,
                activity_budget
            )
            scored_activities.append({
                'activity': activity,
                'score': score
            })
        
        scored_activities.sort(key=lambda x: x['score'], reverse=True)

        # Build daily plan with personalized selections
        daily_plan = []
        total_activity_cost = 0
        
        for day_num in range(num_days):
            current_date = from_date_obj + timedelta(days=day_num)
            day_activities = []
            day_activity_cost = 0
            remaining_activity_budget = activity_budget
            
            # Select up to 3 best matching activities for the day
            for scored_item in scored_activities:
                activity = scored_item['activity']
                activity_cost = activity.get('price', 0)
                
                if activity_cost <= remaining_activity_budget and len(day_activities) < 3:
                    day_activities.append({
                        "name": activity.get('activity', 'Activity'),
                        "type": activity.get('type', 'General'),
                        "cost": activity_cost,
                        "match_score": scored_item['score'],
                        "satisfaction": activity.get('satisfaction_score', 70)
                    })
                    day_activity_cost += activity_cost
                    remaining_activity_budget -= activity_cost
                    total_activity_cost += activity_cost
            
            daily_plan.append({
                "day": f"Day {day_num + 1} ({current_date.strftime('%Y-%m-%d')})",
                "hotel": selected_hotel.get('hotel_name', 'Hotel'),
                "hotel_rating": selected_hotel.get('rating', 3.5),
                "activities": day_activities,
                "cost": {
                    "accommodation": selected_hotel['price_per_night'],
                    "food": food_budget,
                    "activities": day_activity_cost,
                    "daily_total": selected_hotel['price_per_night'] + food_budget + day_activity_cost
                }
            })

        # Calculate transport cost
        transport_matches = transport[transport['to'] == destination]
        travel_cost = transport_matches.iloc[0]['price'] if len(transport_matches) > 0 else 2000

        total = travel_cost + stay_cost + total_activity_cost + (food_budget * num_days)
        
        # Apply personalization adjustments based on user profile
        itinerary = {
            "destination": destination,
            "from": from_date,
            "to": to_date,
            "num_days": num_days,
            "travelers": travelers,
            "selected_hotel": {
                "name": selected_hotel.get('hotel_name', 'Hotel'),
                "rating": selected_hotel.get('rating', 3.5),
                "price_per_night": selected_hotel['price_per_night'],
                "amenities": selected_hotel.get('amenities', 'Standard amenities')
            },
            "total_estimated_expense": total,
            "budget_breakdown": {
                "accommodation": stay_cost,
                "transport": travel_cost,
                "activities": total_activity_cost,
                "food": food_budget * num_days
            },
            "itinerary": daily_plan,
            "personalization_applied": {
                "activity_preferences": user_preferences.get('activity_preferences', ''),
                "accommodation_type": user_preferences.get('accommodation_type', 'mid_range'),
                "user_profile": user_profile
            },
            "recommendations": {
                "best_time": get_best_time_recommendation(destination),
                "packing_tips": get_packing_tips(destination),
                "local_cuisine": get_local_cuisine_suggestions(destination)
            }
        }
        
        return itinerary
        
    except Exception as e:
        logger.error(f"Error generating personalized plan: {str(e)}", exc_info=True)
        raise


def get_best_time_recommendation(destination):
    """Get best time to visit a destination"""
    season_recommendations = {
        'Manali': 'March-June (Summer) for trekking; October-November (Autumn) for clear skies',
        'Shimla': 'October-February (Winter) for snow; March-May (Spring) for blooms',
        'Dharamshala': 'March-May (Spring) and September-November (Autumn)',
        'Dalhousie': 'May-June and September-October for pleasant weather',
        'Kullu': 'March-June and September-October for best weather'
    }
    return season_recommendations.get(destination, 'October-November for ideal weather')


def get_packing_tips(destination):
    """Get packing recommendations based on destination"""
    packing_guides = {
        'Manali': ['Warm clothing', 'Trekking shoes', 'Sunscreen', 'Rain jacket'],
        'Shimla': ['Winter clothes', 'Thermal wear', 'Umbrella', 'Comfortable shoes'],
        'Dharamshala': ['Light layers', 'Comfortable shoes', 'Sunglasses', 'Meditation shawl'],
        'Dalhousie': ['Cozy sweater', 'Hiking boots', 'Camera', 'Rain gear'],
        'Kullu': ['Adventure gear', 'Waterproof jacket', 'Sports shoes', 'Camera']
    }
    return packing_guides.get(destination, ['Comfortable clothes', 'Sunscreen', 'Water bottle'])


def get_local_cuisine_suggestions(destination):
    """Get local cuisine recommendations"""
    cuisine_recommendations = {
        'Manali': ['Momos', 'Thukpa', 'Himachali Dham', 'Trout fish'],
        'Shimla': ['Chole Bhature', 'Himachali Khichdi', 'Mithai', 'Local honey'],
        'Dharamshala': ['Tibetan momos', 'Thukpa', 'Butter tea', 'Noodles'],
        'Dalhousie': ['Pahari cuisine', 'Fresh cheese', 'Local vegetables', 'Homemade bread'],
        'Kullu': ['Siddu', 'Aktori', 'Himachali Dham', 'Apricot products']
    }
    return cuisine_recommendations.get(destination, ['Local specialties', 'Fresh produce', 'Regional dishes'])
