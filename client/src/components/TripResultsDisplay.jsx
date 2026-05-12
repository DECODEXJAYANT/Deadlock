import React from 'react';

const TripResultsDisplay = ({ results, onBack }) => {
  if (!results) {
    return null;
  }

  const {
    destination,
    from,
    to,
    num_days,
    travelers,
    selected_hotel,
    total_estimated_expense,
    budget_breakdown,
    itinerary,
    recommendations,
    personalization_applied
  } = results;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 py-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <button
          onClick={onBack}
          className="mb-6 inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
        >
          ← Back to Planning
        </button>

        <div className="bg-white rounded-lg shadow-xl p-8">
          {/* Trip Header */}
          <div className="border-b pb-6 mb-6">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">{destination} Trip</h1>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-gray-700">
              <div>
                <p className="text-sm text-gray-600">Dates</p>
                <p className="font-semibold">{from} to {to}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Duration</p>
                <p className="font-semibold">{num_days} days</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Travelers</p>
                <p className="font-semibold">{travelers} person(s)</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Budget</p>
                <p className="font-semibold text-indigo-600 text-lg">{formatCurrency(total_estimated_expense)}</p>
              </div>
            </div>
          </div>

          {/* Budget Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <p className="text-gray-600 text-sm">Accommodation</p>
              <p className="text-lg font-bold text-blue-600">{formatCurrency(budget_breakdown.accommodation)}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <p className="text-gray-600 text-sm">Activities</p>
              <p className="text-lg font-bold text-green-600">{formatCurrency(budget_breakdown.activities)}</p>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
              <p className="text-gray-600 text-sm">Food</p>
              <p className="text-lg font-bold text-orange-600">{formatCurrency(budget_breakdown.food)}</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <p className="text-gray-600 text-sm">Transport</p>
              <p className="text-lg font-bold text-purple-600">{formatCurrency(budget_breakdown.transport)}</p>
            </div>
            <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
              <p className="text-gray-600 text-sm">Total</p>
              <p className="text-lg font-bold text-indigo-600">{formatCurrency(total_estimated_expense)}</p>
            </div>
          </div>

          {/* Hotel Section */}
          {selected_hotel && (
            <div className="mb-8 p-6 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg border border-amber-200">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">🏨 Accommodation</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-gray-600 text-sm">Hotel</p>
                  <p className="font-bold text-lg">{selected_hotel.name}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Rating</p>
                  <p className="font-bold text-lg">
                    {selected_hotel.rating.toFixed(1)} ⭐
                  </p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Price per Night</p>
                  <p className="font-bold text-lg">{formatCurrency(selected_hotel.price_per_night)}</p>
                </div>
              </div>
              {selected_hotel.amenities && (
                <p className="mt-4 text-gray-700">
                  <span className="font-semibold">Amenities:</span> {selected_hotel.amenities}
                </p>
              )}
            </div>
          )}

          {/* Daily Itinerary */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">📅 Daily Itinerary</h2>
            <div className="space-y-6">
              {itinerary && itinerary.map((day, index) => (
                <div key={index} className="border-l-4 border-indigo-500 pl-6 py-4 bg-gray-50 rounded-r-lg">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">{day.day}</h3>

                  {/* Hotel Info */}
                  <div className="mb-4 p-4 bg-white rounded border border-gray-200">
                    <p className="text-gray-600 text-sm">Stay:</p>
                    <p className="font-semibold text-lg">{day.hotel}</p>
                    {day.hotel_rating && (
                      <p className="text-gray-600 text-sm">Rating: {day.hotel_rating.toFixed(1)} ⭐</p>
                    )}
                  </div>

                  {/* Activities */}
                  {day.activities && day.activities.length > 0 && (
                    <div className="mb-4">
                      <p className="font-semibold text-gray-800 mb-3">🎯 Activities:</p>
                      <div className="space-y-3">
                        {day.activities.map((activity, actIndex) => (
                          <div key={actIndex} className="p-3 bg-white rounded border-l-4 border-indigo-400">
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <p className="font-semibold text-gray-800">{activity.name}</p>
                                <p className="text-sm text-gray-600">{activity.type}</p>
                                {activity.match_score && (
                                  <p className="text-xs text-green-600 mt-1">
                                    ✓ Match: {(activity.match_score * 100).toFixed(0)}%
                                  </p>
                                )}
                              </div>
                              <div className="text-right">
                                <p className="font-bold text-indigo-600">{formatCurrency(activity.cost)}</p>
                                {activity.satisfaction && (
                                  <p className="text-xs text-gray-600">Satisfaction: {activity.satisfaction}%</p>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Day Cost */}
                  {day.cost && (
                    <div className="p-3 bg-indigo-50 rounded border border-indigo-200">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-gray-700">Day Total:</span>
                        <span className="font-bold text-indigo-600">{formatCurrency(day.cost.daily_total)}</span>
                      </div>
                      <div className="text-xs text-gray-600 mt-2 space-y-1">
                        <p>Accommodation: {formatCurrency(day.cost.accommodation)}</p>
                        <p>Food: {formatCurrency(day.cost.food)}</p>
                        <p>Activities: {formatCurrency(day.cost.activities)}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Recommendations */}
          {recommendations && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {recommendations.best_time && (
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <h3 className="font-bold text-gray-800 mb-2">🌤️ Best Time to Visit</h3>
                  <p className="text-gray-700 text-sm">{recommendations.best_time}</p>
                </div>
              )}
              {recommendations.packing_tips && (
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h3 className="font-bold text-gray-800 mb-2">🎒 Packing Tips</h3>
                  <ul className="text-gray-700 text-sm space-y-1">
                    {recommendations.packing_tips.map((tip, i) => (
                      <li key={i}>✓ {tip}</li>
                    ))}
                  </ul>
                </div>
              )}
              {recommendations.local_cuisine && (
                <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <h3 className="font-bold text-gray-800 mb-2">🍛 Must Try Cuisine</h3>
                  <ul className="text-gray-700 text-sm space-y-1">
                    {recommendations.local_cuisine.map((dish, i) => (
                      <li key={i}>✓ {dish}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Personalization Info */}
          {personalization_applied && (
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200 mb-6">
              <p className="text-sm text-gray-700">
                <span className="font-semibold">✨ Personalized for you:</span> This itinerary was customized based on your preferences ({personalization_applied.accommodation_type} accommodation, {personalization_applied.user_profile?.fitness_level} fitness level, and your activity interests).
              </p>
            </div>
          )}

          {/* Print/Share Buttons */}
          <div className="flex gap-4 justify-center pt-6 border-t">
            <button
              onClick={() => window.print()}
              className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
            >
              🖨️ Print Itinerary
            </button>
            <button
              onClick={onBack}
              className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
            >
              ← Create Another Plan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripResultsDisplay;
