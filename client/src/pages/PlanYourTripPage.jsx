import React, { useState } from 'react';
import TripResultsDisplay from '../components/TripResultsDisplay';

const PlanYourTripPage = () => {
  const [formData, setFormData] = useState({
    destination: '',
    startDate: '',
    endDate: '',
    travelers: 1,
    budget: '',
    trip_type: 'adventure',
    activity_preferences: '',
    accommodation_type: 'mid_range',
    fitness_level: 'moderate',
    age: '',
    weather_preference: 'any',
    special_interests: ''
  });

  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResults(null);

    try {
      // Validate required fields
      if (!formData.destination || !formData.startDate || !formData.endDate || !formData.budget) {
        setError('Please fill in all required fields');
        setLoading(false);
        return;
      }

      // API call to backend
      const response = await fetch('http://localhost:8000/api/planner/generate-personalized/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          destination: formData.destination,
          from_date: formData.startDate,
          to_date: formData.endDate,
          travelers: parseInt(formData.travelers),
          budget: parseInt(formData.budget),
          trip_type: formData.trip_type,
          activity_preferences: formData.activity_preferences,
          accommodation_type: formData.accommodation_type,
          fitness_level: formData.fitness_level,
          age: parseInt(formData.age) || 30,
          weather_preference: formData.weather_preference,
          special_interests: formData.special_interests
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate itinerary');
      }

      const data = await response.json();
      setResults(data.data);
    } catch (err) {
      setError(err.message || 'An error occurred while generating your travel plan');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (results) {
    return <TripResultsDisplay results={results} onBack={() => setResults(null)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-2">Plan Your Dream Trip</h1>
          <p className="text-center text-gray-600 mb-8">Tell us about your travel preferences and get personalized recommendations</p>

          {error && (
            <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSearch} className="space-y-6">
            {/* Core Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="destination" className="block text-sm font-semibold text-gray-700 mb-2">
                  Destination <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="destination"
                  name="destination"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="e.g., Manali, Shimla"
                  value={formData.destination}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="budget" className="block text-sm font-semibold text-gray-700 mb-2">
                  Total Budget (₹) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="budget"
                  name="budget"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="e.g., 50000"
                  value={formData.budget}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            {/* Dates and Travelers */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label htmlFor="startDate" className="block text-sm font-semibold text-gray-700 mb-2">
                  Start Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="endDate" className="block text-sm font-semibold text-gray-700 mb-2">
                  End Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="travelers" className="block text-sm font-semibold text-gray-700 mb-2">
                  Number of Travelers
                </label>
                <input
                  type="number"
                  id="travelers"
                  name="travelers"
                  min="1"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  value={formData.travelers}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Preferences Section */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Preferences</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="trip_type" className="block text-sm font-semibold text-gray-700 mb-2">
                    Trip Type
                  </label>
                  <select
                    id="trip_type"
                    name="trip_type"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    value={formData.trip_type}
                    onChange={handleInputChange}
                  >
                    <option value="adventure">Adventure</option>
                    <option value="cultural">Cultural</option>
                    <option value="nature">Nature & Wildlife</option>
                    <option value="relaxation">Relaxation</option>
                    <option value="family">Family</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="accommodation_type" className="block text-sm font-semibold text-gray-700 mb-2">
                    Accommodation Type
                  </label>
                  <select
                    id="accommodation_type"
                    name="accommodation_type"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    value={formData.accommodation_type}
                    onChange={handleInputChange}
                  >
                    <option value="budget">Budget</option>
                    <option value="mid_range">Mid-Range</option>
                    <option value="luxury">Luxury</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="fitness_level" className="block text-sm font-semibold text-gray-700 mb-2">
                    Fitness Level
                  </label>
                  <select
                    id="fitness_level"
                    name="fitness_level"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    value={formData.fitness_level}
                    onChange={handleInputChange}
                  >
                    <option value="low">Low</option>
                    <option value="moderate">Moderate</option>
                    <option value="high">High</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="age" className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Age
                  </label>
                  <input
                    type="number"
                    id="age"
                    name="age"
                    min="1"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="e.g., 30"
                    value={formData.age}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <label htmlFor="weather_preference" className="block text-sm font-semibold text-gray-700 mb-2">
                    Weather Preference
                  </label>
                  <select
                    id="weather_preference"
                    name="weather_preference"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    value={formData.weather_preference}
                    onChange={handleInputChange}
                  >
                    <option value="any">Any Weather</option>
                    <option value="sunny">Sunny</option>
                    <option value="cool">Cool/Snow</option>
                    <option value="monsoon">Monsoon</option>
                  </select>
                </div>
              </div>

              <div className="mt-6">
                <label htmlFor="activity_preferences" className="block text-sm font-semibold text-gray-700 mb-2">
                  Activity Interests (describe what you enjoy)
                </label>
                <textarea
                  id="activity_preferences"
                  name="activity_preferences"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="e.g., trekking, photography, camping, local culture, wildlife"
                  rows="3"
                  value={formData.activity_preferences}
                  onChange={handleInputChange}
                />
              </div>

              <div className="mt-6">
                <label htmlFor="special_interests" className="block text-sm font-semibold text-gray-700 mb-2">
                  Special Interests (optional)
                </label>
                <textarea
                  id="special_interests"
                  name="special_interests"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="e.g., vegetarian food, allergies, accessibility needs, etc."
                  rows="2"
                  value={formData.special_interests}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-3 px-6 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-semibold rounded-lg shadow-md transition-colors duration-200"
              >
                {loading ? 'Generating Your Plan...' : 'Plan My Trip'}
              </button>
            </div>
          </form>

          {/* Info Section */}
          <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-gray-700">
              <span className="font-semibold">💡 Tip:</span> The more details you provide, the better personalized recommendations we can generate using our AI-powered matching system.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanYourTripPage;
