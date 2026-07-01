# 🏔️ Smart Tourism & AI Trip Planner

An AI-powered tourism planning platform that generates personalized travel itineraries based on user preferences using Machine Learning, text classification, and similarity scoring.

---

# 📖 About The Project

Planning a trip often requires researching destinations, accommodations, activities, and budgets across multiple platforms. This project simplifies the entire process by generating **personalized travel itineraries** based on the user's interests, budget, travel style, fitness level, and other preferences.

The system combines **Machine Learning**, **Natural Language Processing (NLP)**, and **rule-based recommendation techniques** to recommend suitable hotels, attractions, and activities while optimizing the travel experience.

Instead of providing generic travel suggestions, the application intelligently understands user preferences and generates customized travel plans.

---

# ✨ Key Features

- 🎯 Personalized trip planning using 12+ user inputs
- 🤖 Machine Learning–based recommendation engine
- 🧠 NLP-powered text classification for travel preferences
- 📊 Similarity scoring using TF-IDF & Cosine Similarity
- 🏨 Smart hotel recommendation system
- 🎡 Activity recommendation based on interests
- 💰 Budget-aware itinerary generation
- 📅 Automatic trip duration calculation
- 🌦️ Weather-aware travel planning
- 📍 Interactive and responsive user interface

---

# 🛠️ Tech Stack

### Frontend

- React.js
- Vite
- Tailwind CSS
- React Router
- Axios
- Recharts

### Backend

- Django
- Django REST Framework
- Python

### Machine Learning

- Scikit-Learn
- TF-IDF Vectorizer
- Cosine Similarity
- Rule-Based Recommendation Engine

### Database

- SQLite

### Tools

- Git
- GitHub
- VS Code

---

# 🏗️ Project Architecture

```
                    User Preferences
                          │
                          ▼
                  React Frontend (Vite)
                          │
                    REST API (Axios)
                          │
                          ▼
                 Django Backend API
                          │
      ┌───────────────────┼───────────────────┐
      │                   │                   │
      ▼                   ▼                   ▼
Text Classification   Preference Engine   Budget Analyzer
      │                   │                   │
      └──────────────┬────┴──────────────┬────┘
                     ▼
            ML Recommendation Engine
                     │
          Hotel & Activity Ranking
                     │
                     ▼
          Personalized Trip Itinerary
```

---

# 📂 Project Structure

```
Smart-Tourism/
│
├── client/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── api/
│   ├── itinerary_generator.py
│   ├── preference_matcher.py
│   ├── views.py
│   ├── urls.py
│   └── manage.py
│
├── Documentation/
│
├── README.md
└── requirements.txt
```

---

# 🚀 Getting Started

## Prerequisites

- Python 3.11+
- Node.js 18+
- npm

---

# ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/DECODEXJAYANT/Deadlock.git
```

### Navigate to Project

```bash
cd Deadlock
```

---

## Backend Setup

Create Virtual Environment

```bash
python -m venv venv
```

Activate Environment

Windows

```bash
venv\Scripts\activate
```

Linux / macOS

```bash
source venv/bin/activate
```

Install Dependencies

```bash
pip install -r requirements.txt
```

Run Backend

```bash
python manage.py runserver
```

---

## Frontend Setup

Navigate to client

```bash
cd client
```

Install Packages

```bash
npm install
```

Run Development Server

```bash
npm run dev
```

---

# 💻 Usage

1. Open the application.

2. Navigate to **Plan Your Trip**

3. Fill in

- Destination
- Budget
- Number of Travelers
- Start Date
- End Date
- Trip Type
- Activity Preferences
- Accommodation Type
- Fitness Level
- Age
- Weather Preference
- Special Interests

4. Click **Plan My Trip**

5. Receive

- Personalized Itinerary
- Hotel Recommendations
- Activity Suggestions
- Estimated Budget
- Travel Insights

---

# 🧠 Machine Learning Workflow

```
User Preferences
       │
       ▼
Text Classification
       │
       ▼
TF-IDF Vectorization
       │
       ▼
Cosine Similarity
       │
       ▼
Recommendation Engine
       │
       ▼
Personalized Itinerary
```

---

# 🌟 Future Improvements

- Google Maps Integration
- Live Weather API
- Hotel Booking Integration
- AI Chat Assistant
- Multi-language Support
- User Authentication
- Collaborative Trip Planning
- Mobile Application

---

# 🤝 Contributing

Contributions are welcome!

1. Fork the repository

2. Create a feature branch

```bash
git checkout -b feature/NewFeature
```

3. Commit your changes

```bash
git commit -m "Added new feature"
```

4. Push to GitHub

```bash
git push origin feature/NewFeature
```

5. Open a Pull Request

---

# 👨‍💻 Author

**Jayant Kumar**

- GitHub: https://github.com/DECODEXJAYANT
- Email: kumarjayant087@gmail.com

---

# ⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub!You can see the live version here:- 
