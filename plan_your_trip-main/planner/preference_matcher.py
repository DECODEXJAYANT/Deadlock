"""
ML-based preference matching engine for travel planning
Uses text classification and similarity scoring for personalized recommendations
"""

import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import logging

logger = logging.getLogger(__name__)


class PreferenceMatcher:
    """Matches user preferences to destination and activity recommendations"""
    
    def __init__(self):
        """Initialize the preference matcher"""
        self.vectorizer = TfidfVectorizer(lowercase=True, stop_words='english')
        self.activity_type_keywords = {
            'adventure': ['trek', 'climb', 'extreme', 'thrilling', 'paragliding', 'rafting', 'biking'],
            'cultural': ['temple', 'heritage', 'museum', 'local', 'tradition', 'art', 'culture'],
            'nature': ['lake', 'forest', 'mountain', 'nature', 'hiking', 'scenic', 'wildlife'],
            'relaxation': ['spa', 'yoga', 'meditation', 'wellness', 'calm', 'peaceful'],
            'family': ['kids', 'family', 'children', 'safe', 'educational', 'theme park'],
            'photography': ['photo', 'scenic', 'sunset', 'sunrise', 'landscape', 'vista']
        }
        
        self.accommodation_preferences = {
            'luxury': {'multiplier': 1.5, 'min_rating': 4.5},
            'budget': {'multiplier': 0.5, 'min_rating': 3.0},
            'mid_range': {'multiplier': 1.0, 'min_rating': 3.5}
        }
        
    def classify_activity_preferences(self, user_text):
        """
        Classify user text into activity preferences using text classification
        Returns dict of activity types with confidence scores
        """
        if not user_text:
            return {}
            
        user_text_lower = user_text.lower()
        classified = {}
        
        for activity_type, keywords in self.activity_type_keywords.items():
            # Count keyword matches
            matches = sum(1 for keyword in keywords if keyword in user_text_lower)
            if matches > 0:
                # Confidence based on keyword matches
                confidence = min(1.0, matches / len(keywords))
                classified[activity_type] = confidence
                
        return classified
    
    def calculate_preference_similarity(self, user_preferences, destination_data):
        """
        Calculate similarity score between user preferences and destination characteristics
        Uses cosine similarity on preference vectors
        """
        try:
            if not user_preferences or not destination_data:
                return 0.5
                
            # Create preference vectors
            pref_text = ' '.join([
                f"{k} {v}" for k, v in user_preferences.items() 
                if isinstance(v, str)
            ])
            
            dest_text = ' '.join([
                f"{k} {v}" for k, v in destination_data.items() 
                if isinstance(v, str)
            ])
            
            if not pref_text or not dest_text:
                return 0.5
                
            # Vectorize and calculate similarity
            texts = [pref_text, dest_text]
            tfidf_matrix = self.vectorizer.fit_transform(texts)
            similarity = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:2])[0][0]
            
            return float(similarity)
        except Exception as e:
            logger.error(f"Error calculating similarity: {str(e)}")
            return 0.5
    
    def score_hotel_match(self, hotel, user_preferences, budget_per_night):
        """
        Score how well a hotel matches user preferences
        Considers price, rating, amenities, and preference alignment
        """
        try:
            score = 0.0
            
            # Price alignment (40% weight)
            if 'accommodation_type' in user_preferences:
                acc_type = user_preferences['accommodation_type'].lower()
                if acc_type in self.accommodation_preferences:
                    price_multiplier = self.accommodation_preferences[acc_type]['multiplier']
                    ideal_price = budget_per_night * price_multiplier
                    hotel_price = hotel.get('price', budget_per_night)
                    price_diff = abs(hotel_price - ideal_price) / ideal_price
                    price_score = max(0, 1.0 - price_diff)
                    score += price_score * 0.4
                    
            # Rating match (30% weight)
            rating = hotel.get('rating', 3.0)
            rating_score = min(1.0, rating / 5.0)
            score += rating_score * 0.3
            
            # Amenities alignment (20% weight)
            if 'amenities_score' in hotel:
                amenities_score = hotel['amenities_score'] / 10.0
                score += min(1.0, amenities_score) * 0.2
                
            # Preference alignment (10% weight)
            hotel_text = f"{hotel.get('name', '')} {hotel.get('location', '')}"
            pref_text = ' '.join(str(v) for v in user_preferences.values())
            similarity = self.calculate_preference_similarity(
                {'description': pref_text},
                {'description': hotel_text}
            )
            score += similarity * 0.1
            
            return min(1.0, score)
        except Exception as e:
            logger.error(f"Error scoring hotel: {str(e)}")
            return 0.5
    
    def score_activity_match(self, activity, user_preferences, available_budget):
        """
        Score how well an activity matches user preferences
        Considers cost, duration, activity type match, and satisfaction potential
        """
        try:
            score = 0.0
            
            # Budget alignment (25% weight)
            cost = activity.get('cost', 0)
            if available_budget > 0:
                cost_score = max(0, 1.0 - (cost / available_budget))
                score += cost_score * 0.25
                
            # Activity type match (40% weight)
            activity_type = activity.get('type', '').lower()
            preference_text = ' '.join(str(v) for v in user_preferences.values())
            classified_prefs = self.classify_activity_preferences(preference_text)
            
            if activity_type in classified_prefs:
                score += classified_prefs[activity_type] * 0.4
            else:
                # Check if keywords match
                for pref_type, keywords in self.activity_type_keywords.items():
                    for keyword in keywords:
                        if keyword in activity_type:
                            score += classified_prefs.get(pref_type, 0.3) * 0.4
                            break
                            
            # Satisfaction potential (20% weight)
            satisfaction = activity.get('satisfaction_score', 70) / 100.0
            score += satisfaction * 0.2
            
            # Duration match (15% weight)
            duration = activity.get('duration', 2)
            if 2 <= duration <= 6:
                duration_score = 1.0
            elif duration < 2:
                duration_score = 0.7
            else:
                duration_score = 0.5
            score += duration_score * 0.15
            
            return min(1.0, score)
        except Exception as e:
            logger.error(f"Error scoring activity: {str(e)}")
            return 0.5
    
    def rank_destinations(self, destinations_list, user_preferences):
        """
        Rank destinations based on preference match using ML heuristics
        Returns sorted list with match scores
        """
        try:
            ranked = []
            preference_text = ' '.join(str(v) for v in user_preferences.values())
            classified_prefs = self.classify_activity_preferences(preference_text)
            
            for dest in destinations_list:
                # Base score from preference classification
                base_score = sum(classified_prefs.values()) / len(classified_prefs) if classified_prefs else 0.5
                
                # Similarity score
                dest_data = {
                    'name': dest.get('name', ''),
                    'description': dest.get('description', ''),
                    'activities': dest.get('activities', '')
                }
                similarity = self.calculate_preference_similarity(user_preferences, dest_data)
                
                # Weather alignment
                weather_score = self._score_weather_alignment(
                    dest.get('weather', ''),
                    user_preferences.get('weather_preference', '')
                )
                
                # Combined score
                final_score = (base_score * 0.4 + similarity * 0.4 + weather_score * 0.2)
                
                ranked.append({
                    'destination': dest,
                    'score': final_score,
                    'preference_match': classified_prefs
                })
                
            return sorted(ranked, key=lambda x: x['score'], reverse=True)
        except Exception as e:
            logger.error(f"Error ranking destinations: {str(e)}")
            return []
    
    def _score_weather_alignment(self, dest_weather, user_weather_pref):
        """Score how well destination weather aligns with user preference"""
        try:
            if not user_weather_pref:
                return 0.7  # Neutral score
                
            weather_preferences = {
                'sunny': ['clear', 'sunny', 'partly_cloudy'],
                'cool': ['cold', 'snow', 'cool', 'crisp'],
                'monsoon': ['rain', 'drizzle', 'wet'],
                'any': ['any', 'all', 'flexible']
            }
            
            user_pref_lower = user_weather_pref.lower()
            dest_weather_lower = dest_weather.lower()
            
            for pref_type, conditions in weather_preferences.items():
                if pref_type in user_pref_lower:
                    match_count = sum(1 for cond in conditions if cond in dest_weather_lower)
                    return min(1.0, match_count / len(conditions))
                    
            return 0.7
        except Exception as e:
            logger.error(f"Error scoring weather alignment: {str(e)}")
            return 0.7
    
    def personalize_itinerary(self, base_itinerary, user_preferences, user_profile):
        """
        Personalize an itinerary based on user profile and preferences
        Applies ML-based adjustments for better recommendations
        """
        try:
            personalized = base_itinerary.copy()
            
            # Adjust daily plans based on age and fitness level
            age = user_profile.get('age', 30)
            fitness_level = user_profile.get('fitness_level', 'moderate')
            
            # Adjust activity intensity based on fitness level
            intensity_multiplier = {
                'low': 0.6,
                'moderate': 1.0,
                'high': 1.3
            }
            
            # Adjust for age
            if age > 60:
                intensity_multiplier[fitness_level] *= 0.8
            elif age < 18:
                intensity_multiplier[fitness_level] *= 0.9
                
            # Apply adjustments to activities
            if 'daily_plans' in personalized:
                for day_plan in personalized['daily_plans']:
                    if 'activities' in day_plan:
                        for activity in day_plan['activities']:
                            current_intensity = activity.get('intensity', 0)
                            multiplier = intensity_multiplier.get(fitness_level, 1.0)
                            activity['adjusted_intensity'] = current_intensity * multiplier
                            
            return personalized
        except Exception as e:
            logger.error(f"Error personalizing itinerary: {str(e)}")
            return base_itinerary
