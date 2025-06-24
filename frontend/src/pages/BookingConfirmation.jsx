import React, { useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Check, Calendar, MapPin, Users, CreditCard, ExternalLink, Clock } from 'lucide-react';
import { format } from 'date-fns';

const BookingConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { booking, redirectUrl } = location.state || {};

  useEffect(() => {
    if (!booking) {
      navigate('/');
    }
  }, [booking, navigate]);

  if (!booking) {
    return null;
  }

  const eventDate = new Date(booking.date);

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-blue-900 text-white p-6 text-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
              <Check size={32} className="text-blue-900" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Booking Confirmed!</h2>
            <p className="text-blue-100">
              Your booking has been successfully created and added to your profile.
            </p>
          </div>

          <div className="p-6">
            <div className="border-b border-gray-200 pb-6 mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Booking Details</h3>
              
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="w-10 flex-shrink-0 text-gray-400">
                    <Clock size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Booking ID</p>
                    <p className="font-medium text-gray-800">{booking.id}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-10 flex-shrink-0 text-gray-400">
                    <Calendar size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Date</p>
                    <p className="font-medium text-gray-800">
                      {format(eventDate, 'EEEE, MMMM d, yyyy')}
                      <br />
                      {format(eventDate, 'h:mm a')}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-10 flex-shrink-0 text-gray-400">
                    {booking.type === 'event' ? (
                      <MapPin size={20} />
                    ) : (
                      <div className="flex flex-col items-center">
                        <div className="w-2 h-2 bg-gray-400 rounded-full mb-1"></div>
                        <div className="w-0.5 h-10 bg-gray-200"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full mt-1"></div>
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">
                      {booking.type === 'event' ? 'Venue' : 'Route'}
                    </p>
                    <p className="font-medium text-gray-800">
                      {booking.type === 'event' ? (
                        booking.location
                      ) : (
                        <>
                          {booking.from}
                          <br />
                          {booking.to}
                        </>
                      )}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-10 flex-shrink-0 text-gray-400">
                    <Users size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">
                      {booking.type === 'event' ? 'Tickets' : 'Passengers'}
                    </p>
                    <p className="font-medium text-gray-800">
                      {booking.type === 'event' ? 
                        `${booking.tickets} ticket${booking.tickets > 1 ? 's' : ''}` : 
                        `${booking.passengers} passenger${booking.passengers > 1 ? 's' : ''}`}
                    </p>
                    {booking.class && (
                      <p className="text-sm text-gray-600 mt-1">
                        Class: {booking.class}
                      </p>
                    )}
                    {booking.seats && (
                      <p className="text-sm text-gray-600 mt-1">
                        Seat{booking.seats.length > 1 ? 's' : ''}: {booking.seats.join(', ')}
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-10 flex-shrink-0 text-gray-400">
                    <CreditCard size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total Amount</p>
                    <p className="font-bold text-blue-900 text-lg">₹{booking.price}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-center space-y-4">
              <p className="text-gray-600">
                To complete your booking, you'll be redirected to our partner website.
              </p>
              
              <a 
                href={redirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-blue-900 text-white px-6 py-3 rounded-md hover:bg-blue-800 transition-colors"
              >
                Complete Booking <ExternalLink size={16} className="ml-2" />
              </a>
              
              <div className="pt-4">
                <Link to="/profile" className="text-blue-900 hover:text-blue-700 font-medium">
                  View my bookings
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;