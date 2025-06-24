import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

// Import components
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import FlightSearch from './pages/FlightSearch';
import TrainSearch from './pages/TrainSearch';
import BusSearch from './pages/BusSearch';
import EventSearch from './pages/EventSearch';
import MovieSearch from './pages/MovieSearch';
import FlightDetails from './pages/FlightDetails';
import TrainDetails from './pages/TrainDetails';
import BusDetails from './pages/BusDetails';
import EventDetails from './pages/EventDetails';
import MovieDetails from './pages/MovieDetails';
import TheaterDetails from './pages/TheaterDetails';
import BookingConfirmation from './pages/BookingConfirmation';
import ProtectedRoute from './components/ProtectedRoute';
import PaymentPage from './pages/payment';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />
              <Route path="/flights" element={<FlightSearch />} />
              <Route path="/flights/:id" element={<FlightDetails />} />
              <Route path="/trains" element={<TrainSearch />} />
              <Route path="/trains/:id" element={<TrainDetails />} />
              <Route path="/buses" element={<BusSearch />} />
              <Route path="/buses/:id" element={<BusDetails />} />
              <Route path="/events" element={<EventSearch />} />
              <Route path="/events/:id" element={<EventDetails />} />
              <Route path="/movies" element={<MovieSearch />} />
              <Route path="/movies/:id" element={<MovieDetails />} />
              <Route path="/theaters/:id" element={<TheaterDetails />} />
              <Route path="/confirmation" element={
                <ProtectedRoute>
                  <BookingConfirmation />
                </ProtectedRoute>
              } />
              <Route path="/payment" element={<PaymentPage />} /> 
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;