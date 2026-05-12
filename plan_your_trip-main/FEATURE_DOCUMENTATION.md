# Plan Your Trip Feature - ML-Enhanced Implementation

## Overview

The "Plan Your Trip" feature has been completely refactored to use **rule-based logic and ML heuristics** for personalized travel planning. The system now accepts **5+ user inputs** and uses **text classification and similarity scoring** to match user preferences with curated destination and activity data.

## What's New

### 1. **ML-Based Preference Matching** 🤖
- **Text Classification**: Analyzes user activity preferences using keyword matching and TF-IDF vectorization
- **Similarity Scoring**: Uses cosine similarity to match user preferences with destination characteristics
- **Intelligent Ranking**: Ranks destinations and activities based on preference alignment
- **Personalization**: Adjusts recommendations based on age, fitness level, and travel style

### 2. **5+ User Input Fields** 📝

The system now collects comprehensive user data:

#### Required Inputs (Core):
1. **Destination** - Where the user wants to go
2. **Budget** - Total trip budget (₹)
3. **Start Date** - Trip departure date
4. **End Date** - Trip return date
5. **Number of Travelers** - Group size

#### Additional Preference Inputs:
6. **Trip Type** - Adventure, Cultural, Nature, Relaxation, Family
7. **Activity Preferences** - Detailed text describing desired activities
8. **Accommodation Type** - Budget, Mid-range, Luxury
9. **Fitness Level** - Low, Moderate, High
10. **Age** - For personalized activity recommendations
11. **Weather Preference** - Any, Sunny, Cool/Snow, Monsoon
12. **Special Interests** - Dietary needs, accessibility requirements, etc.

### 3. **Advanced Backend Features** 🔧

#### New API Endpoint
- **POST** `/api/planner/generate-personalized/` - ML-enhanced itinerary generation
- Accepts 5+ parameters and produces personalized recommendations
- Returns detailed itinerary with preference matching scores

#### Key Algorithms

**A. Hotel Scoring** (25% Priority)
```
Score = (Price Alignment × 0.4) + (Rating Match × 0.3) + 
         (Amenities × 0.2) + (Preference Alignment × 0.1)
```

**B. Activity Scoring** (40% Priority)
```
Score = (Budget Alignment × 0.25) + (Activity Type Match × 0.4) +
         (Satisfaction Potential × 0.2) + (Duration Match × 0.15)
```

**C. Destination Ranking** (Multi-factor)
- Preference classification score (40%)
- Similarity score (40%)
- Weather alignment (20%)

### 4. **Enhanced Frontend** 🎨

#### New Features
- **Dynamic Form**: Multi-section form with collapsible preference section
- **Real-time Validation**: Input validation with error messages
- **Loading States**: User feedback during API calls
- **Results Display Component**: Beautiful presentation of itinerary

#### User Experience Improvements
- Gradient backgrounds and better visual hierarchy
- Responsive design for mobile and desktop
- Clear budget breakdown visualization
- Daily activity recommendations with match scores
- Personalization metadata display

## File Structure

```
plan_your_trip-main/
├── planner/
│   ├── preference_matcher.py      [NEW] ML preference matching engine
│   ├── itinerary_generator.py     [UPDATED] Enhanced with personalization
│   ├── views.py                   [UPDATED] New API endpoint
│   ├── urls.py                    [UPDATED] Route for new endpoint
│   ├── models.py
│   └── data/
│       ├── hotels.csv
│       ├── activities.csv
│       └── transport.csv
├── manage.py
└── ...

client/src/
├── pages/
│   └── PlanYourTripPage.jsx       [UPDATED] Enhanced form
├── components/
│   └── TripResultsDisplay.jsx     [NEW] Results display
└── ...
```

## Implementation Details

### Backend: PreferenceMatcher Class

Located in `plan_your_trip-main/planner/preference_matcher.py`

**Key Methods:**
- `classify_activity_preferences()` - Text classification for activities
- `calculate_preference_similarity()` - Cosine similarity matching
- `score_hotel_match()` - ML-based hotel scoring
- `score_activity_match()` - ML-based activity scoring
- `rank_destinations()` - Multi-factor destination ranking
- `personalize_itinerary()` - Profile-based adjustments

### Backend: Enhanced Itinerary Generator

Located in `plan_your_trip-main/planner/itinerary_generator.py`

**New Functions:**
- `generate_personalized_plan()` - Main personalization engine
- `get_best_time_recommendation()` - Destination-specific timing
- `get_packing_tips()` - Activity-appropriate packing lists
- `get_local_cuisine_suggestions()` - Local food recommendations

### Frontend: Enhanced Form

Located in `client/src/pages/PlanYourTripPage.jsx`

**Features:**
- Comprehensive form with 11+ input fields
- API integration with error handling
- Loading states and validation
- Results navigation

### Frontend: Results Display

Located in `client/src/components/TripResultsDisplay.jsx`

**Display Elements:**
- Trip header with summary
- Budget breakdown visualization
- Hotel information
- Day-by-day itinerary
- Activity matching scores
- Recommendations and tips
- Print and share functionality

## How It Works

### 1. User Input Collection
```javascript
{
  destination: "Manali",
  budget: 50000,
  startDate: "2026-05-15",
  endDate: "2026-05-18",
  travelers: 2,
  activity_preferences: "trekking, photography, hiking",
  accommodation_type: "mid_range",
  fitness_level: "high",
  age: 28,
  weather_preference: "sunny",
  special_interests: "vegetarian food"
}
```

### 2. Preference Classification
The system analyzes text using keyword matching:
- "trekking" → Adventure (high confidence)
- "photography" → Photography preference
- "hiking" → Nature & Adventure

### 3. ML Scoring
Hotels and activities are scored against:
- User fitness level
- Budget constraints
- Activity preferences
- Weather conditions
- Satisfaction potential

### 4. Personalized Recommendations
Returns an itinerary with:
- Best matching hotels and activities
- Preference alignment scores (0-100%)
- Budget breakdown
- Weather considerations
- Local recommendations

## API Usage

### Create Personalized Itinerary

**Endpoint:** `POST /api/planner/generate-personalized/`

**Request Body:**
```json
{
  "destination": "Shimla",
  "from_date": "2026-05-20",
  "to_date": "2026-05-23",
  "travelers": 3,
  "budget": 60000,
  "trip_type": "cultural",
  "activity_preferences": "temples, local culture, photography",
  "accommodation_type": "mid_range",
  "fitness_level": "moderate",
  "age": 35,
  "weather_preference": "any",
  "special_interests": "vegetarian restaurants"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "destination": "Shimla",
    "from": "2026-05-20",
    "to": "2026-05-23",
    "num_days": 4,
    "travelers": 3,
    "total_estimated_expense": 58000,
    "budget_breakdown": {
      "accommodation": 19200,
      "transport": 5000,
      "activities": 12000,
      "food": 21800
    },
    "selected_hotel": {
      "name": "Shimla Paradise Hotel",
      "rating": 4.2,
      "price_per_night": 4800,
      "amenities": "WiFi, Restaurant, Parking"
    },
    "itinerary": [
      {
        "day": "Day 1 (2026-05-20)",
        "hotel": "Shimla Paradise Hotel",
        "hotel_rating": 4.2,
        "activities": [
          {
            "name": "Jakhoo Temple Visit",
            "type": "cultural",
            "cost": 0,
            "match_score": 0.92,
            "satisfaction": 85
          }
        ],
        "cost": {
          "accommodation": 4800,
          "food": 1800,
          "activities": 0,
          "daily_total": 6600
        }
      }
    ],
    "recommendations": {
      "best_time": "October-February for snow; March-May for flowers",
      "packing_tips": ["Winter clothes", "Camera", "Comfortable shoes"],
      "local_cuisine": ["Chole Bhature", "Mithai", "Local honey"]
    },
    "personalization_applied": {
      "activity_preferences": "temples, local culture, photography",
      "accommodation_type": "mid_range",
      "user_profile": {
        "age": 35,
        "fitness_level": "moderate",
        "travel_style": "balanced"
      }
    }
  },
  "personalization_metadata": {
    "preferences_used": {
      "activity_preferences": "temples, local culture, photography",
      "accommodation_type": "mid_range",
      "weather_preference": "any",
      "special_interests": "vegetarian restaurants"
    },
    "profile_applied": {
      "age": 35,
      "fitness_level": "moderate",
      "travel_style": "balanced"
    }
  }
}
```

## Installation & Setup

### Backend Setup

1. **Install Dependencies**
```bash
pip install djangorestframework scikit-learn pandas numpy requests geopy python-dotenv
```

2. **Database Migrations**
```bash
python manage.py makemigrations
python manage.py migrate
```

3. **Environment Variables** (`.env`)
```
OPENWEATHER_API_KEY=your_api_key_here
DJANGO_DEBUG=True
DJANGO_SECRET_KEY=your_secret_key
```

4. **Run Server**
```bash
python manage.py runserver
```

### Frontend Setup

1. **Install Dependencies**
```bash
cd client
npm install
```

2. **Update API URL**
Update the API endpoint in `PlanYourTripPage.jsx`:
```javascript
const response = await fetch('http://localhost:8000/api/planner/generate-personalized/', {
```

3. **Run Development Server**
```bash
npm run dev
```

## Key Features Explained

### Text Classification 🔍
- Analyzes user's activity preference text
- Identifies keywords and maps to activity types
- Confidence scoring for each classification
- Example: "I love trekking and photography" → Adventure (90%), Photography (85%)

### Similarity Scoring 📊
- Uses TF-IDF vectorization for text analysis
- Cosine similarity measures preference-destination alignment
- Scores range from 0 (no match) to 1 (perfect match)
- Helps personalize recommendations

### Rule-Based Logic 📋
- Budget constraints enforced
- Duration-based activity selection
- Weather-sensitive activity filtering
- Age and fitness level adjustments

### ML Heuristics 🧠
- Gradient Boosting models for scoring
- Multi-factor decision making
- Preference-weighted recommendations
- Historical satisfaction data utilization

## Personalization Adjustments

The system adjusts recommendations based on:

1. **Age**
   - <18: Reduced intensity for activities
   - 18-60: Full activity range
   - >60: 20% intensity reduction

2. **Fitness Level**
   - Low: Activities <4 hours, lighter intensity
   - Moderate: Standard recommendations
   - High: Enhanced activity offerings

3. **Budget Type**
   - Budget: 50% price multiplier
   - Mid-range: 100% (baseline)
   - Luxury: 150% price multiplier

## Error Handling

The system handles:
- Missing data files gracefully
- Invalid date formats with clear messages
- Missing hotel/activity matches with fallbacks
- API failures with informative errors
- Malformed user input with validation messages

## Performance Optimization

- CSV caching in memory
- Vectorization for batch scoring
- Efficient DataFrame filtering
- Lazy loading of optional features

## Future Enhancements

1. **Real-time Price Updates** - Dynamic pricing integration
2. **Weather Integration** - Actual weather forecasts
3. **User Feedback Loop** - Learn from past recommendations
4. **Social Recommendations** - User reviews and ratings
5. **Multi-day Optimization** - Route optimization
6. **Booking Integration** - Direct hotel/activity booking
7. **Mobile App** - Native mobile experience
8. **Multilingual Support** - Internationalization

## Testing

### Test Endpoints

```bash
# Generate basic itinerary
curl -X POST http://localhost:8000/api/planner/generate/ \
  -H "Content-Type: application/json" \
  -d '{
    "budget": 50000,
    "destination": "Manali",
    "from_date": "2026-05-15",
    "to_date": "2026-05-18",
    "trip_type": "adventure"
  }'

# Generate personalized itinerary
curl -X POST http://localhost:8000/api/planner/generate-personalized/ \
  -H "Content-Type: application/json" \
  -d '{
    "destination": "Manali",
    "from_date": "2026-05-15",
    "to_date": "2026-05-18",
    "travelers": 2,
    "budget": 50000,
    "activity_preferences": "trekking, photography",
    "accommodation_type": "mid_range",
    "fitness_level": "high",
    "age": 28
  }'
```

## Support & Documentation

For issues or questions:
1. Check error messages for specific guidance
2. Verify API endpoint URLs
3. Ensure all required fields are provided
4. Check Django logs for backend errors
5. Review console for frontend errors

## Contributors

Feature implemented with:
- Django REST Framework for API
- scikit-learn for ML models
- React for frontend UI
- TF-IDF for text analysis
