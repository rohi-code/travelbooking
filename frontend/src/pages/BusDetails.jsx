import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Bus, Clock, Calendar, User, AlertCircle, MapPin, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import { buses } from '../data/mockData';
import { format } from 'date-fns';
import { useAuth } from '../contexts/AuthContext';

const BusDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser, addBooking } = useAuth();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  
  // Find bus by id
  const bus = buses.find(b => b.id === parseInt(id));
  
  if (!bus) {
    return (
      <div className="min-h-screen bg-gray-50 pt-32 pb-12 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle size={48} className="mx-auto text-red-500 mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Bus Not Found</h2>
          <p className="text-gray-600 mb-6">The bus you're looking for doesn't exist.</p>
          <button 
            onClick={() => navigate('/buses')}
            className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition-colors"
          >
            Back to Buses
          </button>
        </div>
      </div>
    );
  }
  
  const departureDate = new Date(bus.departureTime);
  const arrivalDate = new Date(bus.arrivalTime);
  
  // Generate mock seats
  const seats = Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    available: Math.random() > 0.3, // 70% are available
    type: i < 20 ? 'normal' : 'premium',
    price: i < 20 ? bus.price : Math.round(bus.price * 1.2)
  }));
  
  const toggleSeatSelection = (seat) => {
    if (!seat.available) return;
    
    if (selectedSeats.find(s => s.id === seat.id)) {
      setSelectedSeats(selectedSeats.filter(s => s.id !== seat.id));
    } else {
      if (selectedSeats.length < 6) {
        setSelectedSeats([...selectedSeats, seat]);
      } else {
        alert('You can select up to 6 seats only.');
      }
    }
  };
  
  const handleBookNow = () => {
    if (!currentUser) {
      navigate('/login');
      return;
    }
    
    if (selectedSeats.length === 0) {
      alert('Please select at least one seat');
      return;
    }
    
    // Calculate total price
    const totalPrice = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);
    
    // Add booking to user profile
    const bookingData = {
      id: Date.now().toString(),
      type: 'bus',
      title: `${bus.operatorName} (${bus.busNumber})`,
      from: bus.from,
      to: bus.to,
      date: bus.departureTime,
      price: totalPrice,
      passengers: selectedSeats.length,
      seats: selectedSeats.map(s => s.id)
    };
    
    addBooking(bookingData);
    
    // Navigate to confirmation page
    navigate('/confirmation', { 
      state: { 
        booking: bookingData,
        redirectUrl: `https://www.redbus.in/`
      } 
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Bus Card */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
            <div className="bg-blue-900 text-white p-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Bus Details</h2>
                <div className="text-sm">
                  {format(departureDate, 'EEEE, MMMM d, yyyy')}
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                <div className="flex items-center mb-4 md:mb-0">
                  <img 
                    src={bus.logo} 
                    alt={bus.operatorName} 
                    className="w-16 h-16 object-cover mr-4 rounded-md"
                  />
                  <div>
                    <h3 className="font-bold text-gray-800 text-lg">{bus.operatorName}</h3>
                    <p className="text-gray-600">{bus.busNumber}</p>
                  </div>
                </div>
                
                <div className="bg-blue-50 px-3 py-1 rounded-md text-blue-800 text-sm font-medium">
                  {bus.type}
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row justify-between mb-6 border-b border-gray-200 pb-6">
                <div className="text-center mb-4 md:mb-0">
                  <p className="text-2xl font-bold text-gray-800">
                    {departureDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </p>
                  <p className="text-gray-600 font-medium">{bus.from}</p>
                  <p className="text-sm text-gray-500">
                    {format(departureDate, 'MMM d, yyyy')}
                  </p>
                </div>
                
                <div className="flex flex-col items-center justify-center mb-4 md:mb-0">
                  <p className="text-sm text-gray-500 mb-2">{bus.duration}</p>
                  <div className="w-24 md:w-48 h-0.5 bg-gray-300 relative">
                    <div className="absolute -top-1.5 left-0 w-2 h-2 rounded-full bg-blue-900"></div>
                    <Bus size={16} className="absolute -top-2 left-1/2 -translate-x-1/2 text-blue-900" />
                    <div className="absolute -top-1.5 right-0 w-2 h-2 rounded-full bg-blue-900"></div>
                  </div>
                </div>
                
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-800">
                    {arrivalDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </p>
                  <p className="text-gray-600 font-medium">{bus.to}</p>
                  <p className="text-sm text-gray-500">
                    {format(arrivalDate, 'MMM d, yyyy')}
                  </p>
                </div>
              </div>
              
              <div className="mb-6">
                <button 
                  className="flex items-center text-blue-900 font-medium mb-4"
                  onClick={() => setShowDetails(!showDetails)}
                >
                  {showDetails ? (
                    <>
                      <ChevronUp size={18} className="mr-1" />
                      Hide Bus Details
                    </>
                  ) : (
                    <>
                      <ChevronDown size={18} className="mr-1" />
                      Show Bus Details
                    </>
                  )}
                </button>
                
                {showDetails && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-gray-800 mb-2">Departure</h4>
                        <p className="text-gray-600 text-sm mb-1">
                          <span className="font-medium">Date:</span> {format(departureDate, 'MMMM d, yyyy')}
                        </p>
                        <p className="text-gray-600 text-sm mb-1">
                          <span className="font-medium">Time:</span> {departureDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </p>
                        <p className="text-gray-600 text-sm">
                          <span className="font-medium">City:</span> {bus.from}
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-gray-800 mb-2">Arrival</h4>
                        <p className="text-gray-600 text-sm mb-1">
                          <span className="font-medium">Date:</span> {format(arrivalDate, 'MMMM d, yyyy')}
                        </p>
                        <p className="text-gray-600 text-sm mb-1">
                          <span className="font-medium">Time:</span> {arrivalDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </p>
                        <p className="text-gray-600 text-sm">
                          <span className="font-medium">City:</span> {bus.to}
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <h4 className="font-medium text-gray-800 mb-2">Amenities</h4>
                      <div className="flex flex-wrap gap-2">
                        <span className="bg-blue-50 text-blue-800 px-3 py-1 rounded-md text-xs font-medium">
                          Water Bottle
                        </span>
                        <span className="bg-blue-50 text-blue-800 px-3 py-1 rounded-md text-xs font-medium">
                          Blanket
                        </span>
                        <span className="bg-blue-50 text-blue-800 px-3 py-1 rounded-md text-xs font-medium">
                          Charging Point
                        </span>
                        <span className="bg-blue-50 text-blue-800 px-3 py-1 rounded-md text-xs font-medium">
                          Reading Light
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Seat Selection */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
            <div className="bg-blue-900 text-white p-4">
              <h2 className="text-xl font-semibold">Select Your Seats</h2>
            </div>
            
            <div className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Seat Map */}
                <div className="flex-grow">
                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <div className="flex justify-between items-center mb-4">
                      <p className="text-gray-800 font-medium">Bus Layout</p>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center">
                          <div className="w-4 h-4 bg-gray-300 rounded mr-2"></div>
                          <span className="text-xs text-gray-600">Unavailable</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-4 h-4 bg-white border border-gray-300 rounded mr-2"></div>
                          <span className="text-xs text-gray-600">Available</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-4 h-4 bg-blue-500 rounded mr-2"></div>
                          <span className="text-xs text-gray-600">Selected</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-8">
                      {/* Driver seat */}
                      <div className="self-start mb-8">
                        <div className="w-10 h-10 rounded-md bg-gray-400 flex items-center justify-center text-white text-xs">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12" cy="8" r="4" fill="currentColor"/>
                            <path d="M5 20C5 16.6863 8.13401 14 12 14C15.866 14 19 16.6863 19 20" stroke="currentColor" strokeWidth="2"/>
                          </svg>
                        </div>
                      </div>
                      
                      {/* Seat grid */}
                      <div className="flex-grow grid grid-cols-5 gap-2">
                        {seats.map((seat) => (
                          <div
                            key={seat.id}
                            className={`w-10 h-10 rounded-md flex items-center justify-center text-xs cursor-pointer ${
                              selectedSeats.find(s => s.id === seat.id) 
                                ? 'bg-blue-500 text-white' 
                                : seat.available 
                                  ? 'bg-white border border-gray-300 hover:border-blue-500' 
                                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }`}
                            onClick={() => toggleSeatSelection(seat)}
                          >
                            {seat.id}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Selected seats summary */}
                <div className="w-full md:w-64 flex-shrink-0">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-medium text-gray-800 mb-4">Selected Seats</h3>
                    
                    {selectedSeats.length === 0 ? (
                      <p className="text-gray-500 text-sm">No seats selected</p>
                    ) : (
                      <div className="space-y-2">
                        {selectedSeats.map((seat) => (
                          <div key={seat.id} className="flex justify-between items-center">
                            <div className="flex items-center">
                              <div className="w-6 h-6 bg-blue-100 rounded-md flex items-center justify-center text-blue-800 text-xs mr-2">
                                {seat.id}
                              </div>
                              <span className="text-sm text-gray-600">
                                {seat.type === 'premium' ? 'Premium' : 'Regular'}
                              </span>
                            </div>
                            <span className="font-medium text-gray-800">₹{seat.price}</span>
                          </div>
                        ))}
                        
                        <div className="border-t border-gray-200 pt-2 mt-2">
                          <div className="flex justify-between items-center">
                            <span className="font-medium text-gray-800">Total</span>
                            <span className="font-bold text-blue-900">
                              ₹{selectedSeats.reduce((sum, seat) => sum + seat.price, 0)}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <button
                      className="w-full bg-blue-900 text-white py-2 rounded-md hover:bg-blue-800 transition-colors mt-4 flex items-center justify-center"
                      onClick={handleBookNow}
                      disabled={selectedSeats.length === 0}
                    >
                      Book Now <ExternalLink size={16} className="ml-2" />
                    </button>
                  </div>
                </div>
              </div>
              
              <p className="text-xs text-gray-500 text-center mt-4">
                By clicking "Book Now", you will be redirected to our partner website to complete your booking.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusDetails;