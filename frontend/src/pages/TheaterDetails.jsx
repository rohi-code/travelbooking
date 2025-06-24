import React, { useState } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { Film, MapPin, Coffee, Wifi, Car, Armchair as Wheelchair, AlertCircle, ExternalLink } from 'lucide-react';
import { theaters, movies } from '../data/mockData';
import { format } from 'date-fns';
import { useAuth } from '../contexts/AuthContext';

const TheaterDetails = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const showTime = searchParams.get('showTime');
  const showDate = searchParams.get('date');
  const navigate = useNavigate();
  const { currentUser, addBooking } = useAuth();
  
  const [selectedSeats, setSelectedSeats] = useState([]);
  
  // Find theater by id
  const theater = theaters.find(t => t.id === parseInt(id));
  
  if (!theater) {
    return (
      <div className="min-h-screen bg-gray-50 pt-32 pb-12 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle size={48} className="mx-auto text-red-500 mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Theater Not Found</h2>
          <p className="text-gray-600 mb-6">The theater you're looking for doesn't exist.</p>
          <button 
            onClick={() => navigate('/movies')}
            className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition-colors"
          >
            Back to Movies
          </button>
        </div>
      </div>
    );
  }
  
  // Find show details
  const show = theater.showTimings.find(s => 
    s.time === showTime && s.date === showDate
  );
  
  // Find movie details
  const movie = movies.find(m => m.id === show?.movieId);
  
  if (!show || !movie) {
    return (
      <div className="min-h-screen bg-gray-50 pt-32 pb-12 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle size={48} className="mx-auto text-red-500 mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Show Not Found</h2>
          <p className="text-gray-600 mb-6">The show timing you're looking for doesn't exist.</p>
          <button 
            onClick={() => navigate('/movies')}
            className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition-colors"
          >
            Back to Movies
          </button>
        </div>
      </div>
    );
  }
  
  // Generate seat layout
  const generateSeats = (rowName, count, type) => {
    return Array.from({ length: count }, (_, i) => ({
      id: `${rowName}${i + 1}`,
      number: i + 1,
      row: rowName,
      type,
      available: Math.random() > 0.3,
      price: show.price[type.toLowerCase()]
    }));
  };
  
  const seatLayout = {
    recliner: generateSeats('R', 15, 'recliner'),
    premium: generateSeats('P', 40, 'premium'),
    standard: generateSeats('S', 60, 'standard')
  };
  
  const toggleSeatSelection = (seat) => {
    if (!seat.available) return;
    
    if (selectedSeats.find(s => s.id === seat.id)) {
      setSelectedSeats(selectedSeats.filter(s => s.id !== seat.id));
    } else {
      if (selectedSeats.length < 10) {
        setSelectedSeats([...selectedSeats, seat]);
      } else {
        alert('You can select up to 10 seats only');
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
      type: 'movie',
      title: movie.title,
      location: theater.name,
      date: `${show.date}T${show.time}`,
      price: totalPrice,
      tickets: selectedSeats.length,
      seats: selectedSeats.map(s => s.id)
    };
    
    addBooking(bookingData);
    
    // Navigate to confirmation page
    navigate('/confirmation', { 
      state: { 
        booking: bookingData,
        redirectUrl: `https://in.bookmyshow.com/`
      } 
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="container mx-auto px-4">
        {/* Theater Info */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start gap-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">{theater.name}</h1>
              <div className="flex items-center text-gray-600 mb-4">
                <MapPin size={18} className="mr-2" />
                {theater.location}
              </div>
              
              <div className="flex flex-wrap gap-3">
                {theater.facilities.map((facility, index) => (
                  <div 
                    key={index}
                    className="flex items-center bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                  >
                    {facility === 'Food Court' && <Coffee size={14} className="mr-1" />}
                    {facility === 'Parking' && <Car size={14} className="mr-1" />}
                    {facility === 'Wheelchair Access' && <Wheelchair size={14} className="mr-1" />}
                    {facility === 'Gaming Zone' && <Film size={14} className="mr-1" />}
                    {facility === 'VR Experience' && <Film size={14} className="mr-1" />}
                    {facility}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="text-right">
              <p className="text-gray-600">Show Time</p>
              <p className="text-2xl font-bold text-gray-800">{show.time}</p>
              <p className="text-gray-600">{format(new Date(show.date), 'EEEE, MMMM d, yyyy')}</p>
            </div>
          </div>
        </div>
        
        {/* Seat Selection */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">Select Seats</h2>
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-gray-300 rounded mr-2"></div>
                <span className="text-sm text-gray-600">Unavailable</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-white border border-gray-300 rounded mr-2"></div>
                <span className="text-sm text-gray-600">Available</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-blue-500 rounded mr-2"></div>
                <span className="text-sm text-gray-600">Selected</span>
              </div>
            </div>
          </div>
          
          {/* Screen */}
          <div className="relative mb-12">
            <div className="h-2 bg-gray-300 rounded-lg mb-2"></div>
            <p className="text-center text-sm text-gray-500">SCREEN</p>
          </div>
          
          {/* Seat Layout */}
          <div className="space-y-8">
            {/* Recliner */}
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-4">
                Recliner - ₹{show.price.recliner}
              </h3>
              <div className="grid grid-cols-15 gap-2">
                {seatLayout.recliner.map((seat) => (
                  <div
                    key={seat.id}
                    className={`w-8 h-8 rounded flex items-center justify-center text-xs cursor-pointer ${
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
            
            {/* Premium */}
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-4">
                Premium - ₹{show.price.premium}
              </h3>
              <div className="grid grid-cols-20 gap-2">
                {seatLayout.premium.map((seat) => (
                  <div
                    key={seat.id}
                    className={`w-8 h-8 rounded flex items-center justify-center text-xs cursor-pointer ${
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
            
            {/* Standard */}
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-4">
                Standard - ₹{show.price.standard}
              </h3>
              <div className="grid grid-cols-20 gap-2">
                {seatLayout.standard.map((seat) => (
                  <div
                    key={seat.id}
                    className={`w-8 h-8 rounded flex items-center justify-center text-xs cursor-pointer ${
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
        
        {/* Booking Summary */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
          <div className="container mx-auto">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-600">Selected Seats: {selectedSeats.length}</p>
                <p className="font-bold text-gray-800">
                  Total: ₹{selectedSeats.reduce((sum, seat) => sum + seat.price, 0)}
                </p>
              </div>
              
              <button
                className="bg-blue-900 text-white px-8 py-3 rounded-md hover:bg-blue-800 transition-colors flex items-center"
                onClick={handleBookNow}
                disabled={selectedSeats.length === 0}
              >
                Book Now <ExternalLink size={16} className="ml-2" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TheaterDetails;