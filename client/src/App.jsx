// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Homepage from "./components/Homepage";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Conclusion from "./pages/Conclusion";
import MiddlePage from "./pages/MiddlePage";
import PlanYourTrip from "./pages/PlanYourTrip";
import HotelOfferPage from "./pages/HotelOfferPage";
// import HotelResults from "./pages/HotelResults";
import HotelList from "./pages/HotelList";
import SearchFilterPage from "./pages/SearchFilterPage";
import RoomLayout from "./pages/RoomsLayout";
import AdminDashboard from "./pages/AdminDashboard";
import Kullu from "./pages/Kullu";
import Dussera from "./pages/Dussera";
import Prasharlake from "./pages/Prasharlake";
import SearchHotelPage from "./pages/SearchHotelPage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Homepage />
              <MiddlePage />
              <HotelOfferPage />
              <Conclusion />
            </>
          }
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/results" element={<HotelResults />} /> */}
        <Route path="/searchfilter" element={<SearchFilterPage />} />
        <Route path="/plan-your-trip" element={<PlanYourTrip />} />
        <Route path="/hotels/:location" element={<HotelList />} />
        <Route path="/room-layout" element={<RoomLayout />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/dussera" element={<Dussera/>} />
        <Route path="/kullu" element={<Kullu/>} />
        <Route path="/prasharlake" element={<Prasharlake />} />
        <Route path="/search-hotel" element={<SearchHotelPage />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
