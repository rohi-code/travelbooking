import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Clock, CalendarDays, MapPin } from 'lucide-react';
import { format } from 'date-fns';

const Profile = () => {
  const { currentUser } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
            <div className="p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row items-center sm:items-start">
                <div className="bg-blue-100 text-blue-900 w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold mb-4 sm:mb-0 sm:mr-6">
                  {currentUser.name.charAt(0).toUpperCase()}
                </div>
                <div className="text-center sm:text-left">
                  <h1 className="text-2xl font-bold text-gray-800">{currentUser.name}</h1>
                  <p className="text-gray-600">{currentUser.email}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Booking History */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="border-b border-gray-200">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Bookings</h2>
                
                {(!currentUser.bookings || currentUser.bookings.length === 0) ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500">You don't have any bookings yet.</p>
                    <p className="text-gray-500 mt-2">Start exploring and book your next trip!</p>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-200">
                    {currentUser.bookings.map((booking, index) => (
                      <div key={index} className="py-4">
                        <div className="flex flex-col md:flex-row justify-between">
                          <div>
                            <div className="flex items-center mb-2">
                              <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
                                booking.type === 'flight' ? 'bg-blue-500' :
                                booking.type === 'train' ? 'bg-green-500' :
                                booking.type === 'bus' ? 'bg-orange-500' : 'bg-purple-500'
                              }`}></span>
                              <h3 className="font-medium text-gray-800">
                                {booking.title}
                              </h3>
                            </div>
                            
                            <div className="flex items-center text-gray-600 text-sm mb-1">
                              <MapPin size={14} className="mr-1" />
                              <span>
                                {booking.from && booking.to ? `${booking.from} to ${booking.to}` : booking.location}
                              </span>
                            </div>
                            
                            <div className="flex items-center text-gray-600 text-sm">
                              <CalendarDays size={14} className="mr-1" />
                              <span>
                                {format(new Date(booking.date), 'PPP')}
                              </span>
                            </div>
                          </div>
                          
                          <div className="mt-3 md:mt-0 flex flex-col items-start md:items-end">
                            <div className="bg-blue-50 text-blue-800 px-2 py-1 rounded text-xs font-medium mb-2">
                              {booking.type.charAt(0).toUpperCase() + booking.type.slice(1)}
                            </div>
                            <div className="text-gray-800 font-medium">₹{booking.price.toLocaleString()}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;