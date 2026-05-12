# Plan Your Trip Feature - Setup Guide

## Quick Start

This guide will help you set up and run the enhanced "Plan Your Trip" feature with ML-based personalization.

## Prerequisites

- Python 3.8+
- Node.js 14+
- pip and npm
- SQLite3 (included with Python)

## Backend Setup

### Step 1: Install Python Dependencies

Navigate to the project root directory and run:

```bash
pip install -r requirements.txt
```

If `requirements.txt` doesn't exist, install these packages manually:

```bash
pip install django django-rest-framework scikit-learn pandas numpy requests geopy python-dotenv cors-headers
```

### Step 2: Create Environment File

Create a `.env` file in the project root:

```
DJANGO_DEBUG=True
DJANGO_SECRET_KEY=your-secret-key-here-change-in-production
OPENWEATHER_API_KEY=your_openweather_api_key
ALLOWED_HOSTS=localhost,127.0.0.1
```

### Step 3: Database Setup

Run migrations:

```bash
python manage.py makemigrations
python manage.py migrate
```

### Step 4: Verify Data Files

Ensure these CSV files exist in `plan_your_trip-main/planner/data/`:
- `hotels.csv`
- `activities.csv`
- `transport.csv`

### Step 5: Start Django Server

```bash
python manage.py runserver
```

The server will run on `http://localhost:8000`

## Frontend Setup

### Step 1: Navigate to Client Directory

```bash
cd client
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Update API Configuration

In `client/src/pages/PlanYourTripPage.jsx`, verify the API endpoint:

```javascript
const response = await fetch('http://localhost:8000/api/planner/generate-personalized/', {
```

If your backend runs on a different URL, update this accordingly.

### Step 4: Configure CORS (if needed)

If you get CORS errors, update `INSTALLED_APPS` in `plan_your_trip-main/travel_planner/settings.py`:

```python
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'corsheaders',  # Add this
    'planner',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',  # Add this first
    'django.middleware.security.SecurityMiddleware',
    # ... rest of middleware
]

CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]
```

### Step 5: Start React Development Server

```bash
npm run dev
```

The frontend will run on `http://localhost:5173` (or `http://localhost:3000` depending on your setup)

## Verification

### Test the Backend API

Use curl or Postman to test:

```bash
curl -X POST http://localhost:8000/api/planner/generate-personalized/ \
  -H "Content-Type: application/json" \
  -d '{
    "destination": "Manali",
    "from_date": "2026-05-15",
    "to_date": "2026-05-18",
    "travelers": 1,
    "budget": 50000,
    "trip_type": "adventure",
    "activity_preferences": "trekking and photography",
    "accommodation_type": "mid_range",
    "fitness_level": "high",
    "age": 28,
    "weather_preference": "sunny"
  }'
```

Expected response should include:
- `success: true`
- `data.destination`: "Manali"
- `data.itinerary`: Array of daily plans
- `data.total_estimated_expense`: Budget calculation

### Test the Frontend

1. Navigate to `http://localhost:5173` in your browser
2. Go to "Plan Your Trip" page
3. Fill in the form with sample data:
   - Destination: Manali
   - Budget: 50000
   - Start Date: 2026-05-15
   - End Date: 2026-05-18
   - Activity Preferences: trekking, photography
4. Click "Plan My Trip"
5. You should see personalized recommendations

## Troubleshooting

### Issue: ModuleNotFoundError for preference_matcher

**Solution:** Ensure the import in `views.py` is correct:
```python
from .preference_matcher import PreferenceMatcher
```

### Issue: CORS Error in Browser Console

**Solution:** 
1. Add `corsheaders` to Django settings (see CORS configuration above)
2. Restart Django server

### Issue: No data in CSV files

**Solution:**
1. Check that CSV files exist in `plan_your_trip-main/planner/data/`
2. Verify they have proper headers matching the code expectations
3. Required columns in each file:
   - hotels.csv: destination, price_per_night, rating, hotel_name, amenities
   - activities.csv: destination, activity, type, price, duration, satisfaction_score
   - transport.csv: to, price

### Issue: "No hotels/activities found" Error

**Solution:**
1. Check the destination name matches what's in CSV files
2. Ensure budget is sufficient for the destination
3. Try a different destination like "Shimla" or "Manali"

### Issue: Slow API Response

**Solution:**
1. This is normal for the first request (model training)
2. Subsequent requests will be faster
3. For production, consider caching model predictions

## Project Structure

```
Deadlock/
├── plan_your_trip-main/
│   ├── planner/
│   │   ├── preference_matcher.py      [ML matching]
│   │   ├── itinerary_generator.py     [Personalization]
│   │   ├── views.py                   [API endpoints]
│   │   ├── urls.py
│   │   ├── models.py
│   │   ├── data/
│   │   │   ├── hotels.csv
│   │   │   ├── activities.csv
│   │   │   └── transport.csv
│   │   └── migrations/
│   ├── travel_planner/
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── wsgi.py
│   ├── manage.py
│   ├── db.sqlite3
│   └── FEATURE_DOCUMENTATION.md
├── client/
│   ├── src/
│   │   ├── pages/
│   │   │   └── PlanYourTripPage.jsx       [Enhanced form]
│   │   ├── components/
│   │   │   └── TripResultsDisplay.jsx    [Results display]
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
└── README.md
```

## Key Files to Modify if Needed

1. **`preference_matcher.py`** - ML algorithm customization
   - Adjust confidence thresholds
   - Modify activity type keywords
   - Update accommodation preferences

2. **`itinerary_generator.py`** - Personalization logic
   - Adjust budget allocation percentages
   - Modify recommendation algorithms
   - Add/remove recommendation types

3. **`PlanYourTripPage.jsx`** - Form fields and styling
   - Add/remove input fields
   - Customize validation rules
   - Update API endpoint URL

4. **`TripResultsDisplay.jsx`** - Results presentation
   - Modify result formatting
   - Adjust display sections
   - Customize styling

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| DJANGO_DEBUG | Debug mode (False in production) | True |
| DJANGO_SECRET_KEY | Django secret key | your-secret-key |
| OPENWEATHER_API_KEY | Weather API key (optional) | abc123xyz |
| ALLOWED_HOSTS | Allowed hosts | localhost,127.0.0.1 |

## Performance Tips

1. **Caching**: Implement caching for destination data
2. **Async Processing**: Use Celery for long-running tasks
3. **Database**: Consider PostgreSQL for production
4. **Static Files**: Use CDN for frontend assets
5. **API Rate Limiting**: Implement rate limiting

## Security Considerations

1. Change `DJANGO_SECRET_KEY` in production
2. Set `DEBUG = False` in production
3. Use HTTPS in production
4. Implement authentication for API
5. Validate all user inputs
6. Sanitize CSV data

## Next Steps

After successful setup:

1. Test with various destinations and preferences
2. Customize activity keywords in `preference_matcher.py`
3. Add more data to CSV files
4. Implement user authentication
5. Add database models for saving user plans
6. Deploy to production

## Support

For issues:
1. Check error messages carefully
2. Review Django and browser console logs
3. Verify all file paths are correct
4. Ensure ports 8000 and 5173 are available
5. Check Python and Node versions

## Production Deployment

For production deployment:

1. Use environment variables for all sensitive data
2. Set `DEBUG = False`
3. Use a production database (PostgreSQL)
4. Set up proper logging
5. Use a production WSGI server (Gunicorn)
6. Set up SSL/HTTPS
7. Implement rate limiting
8. Add API authentication
9. Set up monitoring and alerting
10. Use a load balancer

See main README for full deployment instructions.
