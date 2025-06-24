import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Train, Clock, Calendar, User, AlertCircle, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import { trains } from '../data/mockData';
import { format } from 'date-fns';
import { useAuth } from '../contexts/AuthContext';

const TrainDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser, addBooking } = useAuth();
  const [selectedClass, setSelectedClass] = useState(null);
  const [passengerCount, setPassengerCount] = useState(1);
  const [showDetails, setShowDetails] = useState(false);
  
  // Find train by id
  const train = trains.find(t => t.id === parseInt(id));
  
  if (!train) {
    return (
      <div className="min-h-screen bg-gray-50 pt-32 pb-12 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle size={48} className="mx-auto text-red-500 mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Train Not Found</h2>
          <p className="text-gray-600 mb-6">The train you're looking for doesn't exist.</p>
          <button 
            onClick={() => navigate('/trains')}
            className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition-colors"
          >
            Back to Trains
          </button>
        </div>
      </div>
    );
  }
  
  const departureDate = new Date(train.departureTime);
  const arrivalDate = new Date(train.arrivalTime);
  
  const handleBookNow = () => {
    if (!currentUser) {
      navigate('/login');
      return;
    }
    
    if (!selectedClass) {
      alert('Please select a travel class');
      return;
    }
    
    // Add booking to user profile
    const classDetails = train.classes.find(c => c.name === selectedClass);
    const bookingData = {
      id: Date.now().toString(),
      type: 'train',
      title: `${train.trainName} (${train.trainNumber})`,
      from: train.from,
      to: train.to,
      date: train.departureTime,
      price: classDetails.price * passengerCount,
      passengers: passengerCount,
      class: selectedClass
    };
    
    addBooking(bookingData);
    
    // Navigate to confirmation page
    navigate('/confirmation', { 
      state: { 
        booking: bookingData,
        redirectUrl: `https://www.confirmtkt.com/train-tickets/`
      } 
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Train Card */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
            <div className="bg-blue-900 text-white p-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Train Details</h2>
                <div className="text-sm">
                  {format(departureDate, 'EEEE, MMMM d, yyyy')}
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                <div className="flex items-center mb-4 md:mb-0">
                  <img 
                    src={train.logo} 
                    alt={train.trainName} 
                    className="w-16 h-16 object-cover mr-4 rounded-md"
                  />
                  <div>
                    <h3 className="font-bold text-gray-800 text-lg">{train.trainName}</h3>
                    <p className="text-gray-600">{train.trainNumber}</p>
                  </div>
                </div>
                
                <div className="bg-blue-50 px-3 py-1 rounded-md text-blue-800 text-sm font-medium">
                  {train.classes.length} Classes Available
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row justify-between mb-6 border-b border-gray-200 pb-6">
                <div className="text-center mb-4 md:mb-0">
                  <p className="text-2xl font-bold text-gray-800">
                    {departureDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </p>
                  <p className="text-gray-600 font-medium">{train.from}</p>
                  <p className="text-sm text-gray-500">
                    {format(departureDate, 'MMM d, yyyy')}
                  </p>
                </div>
                
                <div className="flex flex-col items-center justify-center mb-4 md:mb-0">
                  <p className="text-sm text-gray-500 mb-2">{train.duration}</p>
                  <div className="w-24 md:w-48 h-0.5 bg-gray-300 relative">
                    <div className="absolute -top-1.5 left-0 w-2 h-2 rounded-full bg-blue-900"></div>
                    <Train size={16} className="absolute -top-2 left-1/2 -translate-x-1/2 text-blue-900" />
                    <div className="absolute -top-1.5 right-0 w-2 h-2 rounded-full bg-blue-900"></div>
                  </div>
                </div>
                
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-800">
                    {arrivalDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </p>
                  <p className="text-gray-600 font-medium">{train.to}</p>
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
                      Hide Train Details
                    </>
                  ) : (
                    <>
                      <ChevronDown size={18} className="mr-1" />
                      Show Train Details
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
                          <span className="font-medium">Station:</span> {train.from}
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
                          <span className="font-medium">Station:</span> {train.to}
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <h4 className="font-medium text-gray-800 mb-2">Additional Information</h4>
                      <p className="text-gray-600 text-sm mb-1">
                        <span className="font-medium">Running Days:</span> Daily
                      </p>
                      <p className="text-gray-600 text-sm">
                        <span className="font-medium">Pantry:</span> Available
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Booking Card */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-blue-900 text-white p-4">
              <h2 className="text-xl font-semibold">Book Your Ticket</h2>
            </div>
            
            <div className="p-6">
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">
                  Select Travel Class
                </label>
                <div className="space-y-3">
                  {train.classes.map((classOption, index) => (
                    <div
                      key={index}
                      className={`border ${
                        selectedClass === classOption.name 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-200 hover:border-blue-300'
                      } rounded-lg p-4 transition-colors cursor-pointer`}
                      onClick={() => setSelectedClass(classOption.name)}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium text-gray-800">{classOption.name}</p>
                          <p className="text-sm text-gray-600">
                            {classOption.available} seats available
                          </p>
                        </div>
                        <p className="text-lg font-bold text-blue-900">₹{classOption.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">
                  Number of Passengers
                </label>
                <div className="flex">
                  <button
                    className="bg-gray-200 text-gray-700 px-3 py-2 rounded-l-md hover:bg-gray-300 transition-colors focus:outline-none"
                    onClick={() => setPassengerCount(Math.max(1, passengerCount - 1))}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    max="6"
                    value={passengerCount}
                    onChange={(e) => setPassengerCount(Math.min(6, Math.max(1, parseInt(e.target.value) || 1)))}
                    className="w-16 text-center border-t border-b border-gray-300 py-2 focus:outline-none"
                  />
                  <button
                    className="bg-gray-200 text-gray-700 px-3 py-2 rounded-r-md hover:bg-gray-300 transition-colors focus:outline-none"
                    onClick={() => setPassengerCount(Math.min(6, passengerCount + 1))}
                  >
                    +
                  </button>
                </div>
              </div>
              
              <div className="mb-6 border-t border-gray-200 pt-6">
                <div className="flex justify-between items-center mb-4">
                  <p className="text-gray-700">Base Fare</p>
                  <p className="text-gray-800">
                    ₹{selectedClass 
                      ? (train.classes.find(c => c.name === selectedClass).price * passengerCount) 
                      : 0}
                  </p>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <p className="text-gray-700">Reservation Charges</p>
                  <p className="text-gray-800">Included</p>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                  <p className="font-bold text-gray-800">Total Amount</p>
                  <p className="font-bold text-xl text-blue-900">
                    ₹{selectedClass 
                      ? (train.classes.find(c => c.name === selectedClass).price * passengerCount) 
                      : 0}
                  </p>
                </div>
              </div>
              
              <button
                className="w-full bg-blue-900 text-white py-3 rounded-md hover:bg-blue-800 transition-colors flex items-center justify-center"
                onClick={handleBookNow}
              >
                Book Now <ExternalLink size={16} className="ml-2" />
              </button>
              
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

export default TrainDetails;