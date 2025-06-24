import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, Clock, Map, Tag, AlertCircle, User, Ticket, ExternalLink } from 'lucide-react';
import { events } from '../data/mockData';
import { format } from 'date-fns';
import { useAuth } from '../contexts/AuthContext';

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser, addBooking } = useAuth();
  const [ticketCount, setTicketCount] = useState(1);
  
  // Find event by id
  const event = events.find(e => e.id === parseInt(id));
  
  if (!event) {
    return (
      <div className="min-h-screen bg-gray-50 pt-32 pb-12 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle size={48} className="mx-auto text-red-500 mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Event Not Found</h2>
          <p className="text-gray-600 mb-6">The event you're looking for doesn't exist.</p>
          <button 
            onClick={() => navigate('/events')}
            className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition-colors"
          >
            Back to Events
          </button>
        </div>
      </div>
    );
  }
  
  const eventDate = new Date(event.date);
  
  const handleBookNow = () => {
    if (!currentUser) {
      navigate('/login');
      return;
    }
    
    // Add booking to user profile
    const bookingData = {
      id: Date.now().toString(),
      type: 'event',
      title: event.name,
      location: event.venue,
      date: event.date,
      price: event.price * ticketCount,
      tickets: ticketCount
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
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="relative h-80 mb-6 rounded-lg overflow-hidden shadow-md">
            <img 
              src={event.image} 
              alt={event.name} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent opacity-80"></div>
            <div className="absolute bottom-0 left-0 p-6">
              <div className="bg-blue-900 text-white px-3 py-1 inline-block rounded-full text-xs font-medium mb-3">
                {event.category}
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">{event.name}</h1>
              <div className="flex items-center text-white opacity-90">
                <Clock size={16} className="mr-1" />
                <span className="text-sm">
                  {format(eventDate, 'EEEE, MMMM d, yyyy • h:mm a')}
                </span>
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="flex flex-col md:flex-row gap-6">
            {/* Event Details */}
            <div className="w-full md:w-2/3">
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">About the Event</h2>
                <p className="text-gray-700 mb-6">
                  {event.description}
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Calendar size={18} className="text-blue-900 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-gray-800">Date and Time</h3>
                      <p className="text-gray-600">
                        {format(eventDate, 'EEEE, MMMM d, yyyy')}
                        <br />
                        {format(eventDate, 'h:mm a')}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Map size={18} className="text-blue-900 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-gray-800">Venue</h3>
                      <p className="text-gray-600">{event.venue}</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="font-medium text-gray-800 mb-3">Terms and Conditions</h3>
                  <ul className="text-sm text-gray-600 space-y-2 list-disc pl-4">
                    <li>Tickets once booked cannot be exchanged or refunded</li>
                    <li>No entry will be allowed once the event has started</li>
                    <li>Please carry a valid ID proof along with your ticket</li>
                    <li>Recording of the event is strictly prohibited</li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Booking Card */}
            <div className="w-full md:w-1/3">
              <div className="bg-white rounded-lg shadow-md overflow-hidden sticky top-24">
                <div className="bg-blue-900 text-white p-4">
                  <h2 className="text-xl font-semibold">Book Tickets</h2>
                </div>
                
                <div className="p-6">
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-gray-700 font-medium">Price per ticket</p>
                      <p className="text-gray-800 font-bold">
                        {event.price === 0 ? 'Free' : `₹${event.price}`}
                      </p>
                    </div>
                    
                    <div className="flex justify-between items-center mb-4">
                      <p className="text-gray-700">Available tickets</p>
                      <p className="text-gray-800">{event.availableSeats}</p>
                    </div>
                    
                    <div className="mb-6">
                      <label className="block text-gray-700 font-medium mb-2">
                        Number of Tickets
                      </label>
                      <div className="flex">
                        <button
                          className="bg-gray-200 text-gray-700 px-3 py-2 rounded-l-md hover:bg-gray-300 transition-colors focus:outline-none"
                          onClick={() => setTicketCount(Math.max(1, ticketCount - 1))}
                        >
                          -
                        </button>
                        <input
                          type="number"
                          min="1"
                          max={event.availableSeats}
                          value={ticketCount}
                          onChange={(e) => setTicketCount(Math.min(event.availableSeats, Math.max(1, parseInt(e.target.value) || 1)))}
                          className="w-16 text-center border-t border-b border-gray-300 py-2 focus:outline-none"
                        />
                        <button
                          className="bg-gray-200 text-gray-700 px-3 py-2 rounded-r-md hover:bg-gray-300 transition-colors focus:outline-none"
                          onClick={() => setTicketCount(Math.min(event.availableSeats, ticketCount + 1))}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-6 border-t border-gray-200 pt-6">
                    <div className="flex justify-between items-center mb-4">
                      <p className="text-gray-700">Ticket Price</p>
                      <p className="text-gray-800">
                        {event.price === 0 ? 'Free' : `₹${event.price * ticketCount}`}
                      </p>
                    </div>
                    <div className="flex justify-between items-center mb-4">
                      <p className="text-gray-700">Convenience Fee</p>
                      <p className="text-gray-800">
                        {event.price === 0 ? 'Free' : `₹${Math.round(event.price * ticketCount * 0.05)}`}
                      </p>
                    </div>
                    <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                      <p className="font-bold text-gray-800">Total</p>
                      <p className="font-bold text-xl text-blue-900">
                        {event.price === 0 
                          ? 'Free' 
                          : `₹${event.price * ticketCount + Math.round(event.price * ticketCount * 0.05)}`}
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
      </div>
    </div>
  );
};

export default EventDetails;