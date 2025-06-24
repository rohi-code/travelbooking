import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plane, Train, Bus, Calendar, MapPin, Navigation, ArrowRight } from 'lucide-react';
import { popularDestinations } from '../data/mockData';

const Home = () => {
  const [activeTab, setActiveTab] = useState('flights');

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative pt-32 pb-20 md:pt-48 md:pb-32"
        style={{
          background: 'linear-gradient(to right, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.4)), url(https://images.pexels.com/photos/358220/pexels-photo-358220.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Your Journey Begins Here
          </h1>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Book flights, trains, buses and events all in one place
          </p>
        </div>
      </section>

      {/* Search Section */}
      <section className="container mx-auto px-4 py-6 -mt-16 md:-mt-24">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex flex-wrap mb-6 gap-2">
            <button
              className={`flex items-center px-4 py-2 rounded-md ${
                activeTab === 'flights'
                  ? 'bg-blue-900 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setActiveTab('flights')}
            >
              <Plane size={18} className="mr-2" />
              <span>Flights</span>
            </button>
            <button
              className={`flex items-center px-4 py-2 rounded-md ${
                activeTab === 'trains'
                  ? 'bg-blue-900 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setActiveTab('trains')}
            >
              <Train size={18} className="mr-2" />
              <span>Trains</span>
            </button>
            <button
              className={`flex items-center px-4 py-2 rounded-md ${
                activeTab === 'buses'
                  ? 'bg-blue-900 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setActiveTab('buses')}
            >
              <Bus size={18} className="mr-2" />
              <span>Buses</span>
            </button>
            <button
              className={`flex items-center px-4 py-2 rounded-md ${
                activeTab === 'events'
                  ? 'bg-blue-900 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setActiveTab('events')}
            >
              <Calendar size={18} className="mr-2" />
              <span>Events</span>
            </button>
          </div>

          {activeTab === 'flights' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="col-span-1">
                <label className="block text-gray-700 mb-1 text-sm">From</label>
                <div className="relative">
                  <MapPin size={16} className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Departure city"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="col-span-1">
                <label className="block text-gray-700 mb-1 text-sm">To</label>
                <div className="relative">
                  <Navigation size={16} className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Arrival city"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="col-span-1">
                <label className="block text-gray-700 mb-1 text-sm">Departure</label>
                <div className="relative">
                  <Calendar size={16} className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="date"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="col-span-1 md:col-span-3 flex justify-center mt-4">
                <Link
                  to="/flights"
                  className="inline-block bg-blue-900 text-white px-6 py-3 rounded-md hover:bg-blue-800 transition-colors"
                >
                  Search Flights
                </Link>
              </div>
            </div>
          )}

          {activeTab === 'trains' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="col-span-1">
                <label className="block text-gray-700 mb-1 text-sm">From</label>
                <div className="relative">
                  <MapPin size={16} className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Departure station"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="col-span-1">
                <label className="block text-gray-700 mb-1 text-sm">To</label>
                <div className="relative">
                  <Navigation size={16} className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Arrival station"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="col-span-1">
                <label className="block text-gray-700 mb-1 text-sm">Date</label>
                <div className="relative">
                  <Calendar size={16} className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="date"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="col-span-1 md:col-span-3 flex justify-center mt-4">
                <Link
                  to="/trains"
                  className="inline-block bg-blue-900 text-white px-6 py-3 rounded-md hover:bg-blue-800 transition-colors"
                >
                  Search Trains
                </Link>
              </div>
            </div>
          )}

          {activeTab === 'buses' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="col-span-1">
                <label className="block text-gray-700 mb-1 text-sm">From</label>
                <div className="relative">
                  <MapPin size={16} className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Departure city"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="col-span-1">
                <label className="block text-gray-700 mb-1 text-sm">To</label>
                <div className="relative">
                  <Navigation size={16} className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Arrival city"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="col-span-1">
                <label className="block text-gray-700 mb-1 text-sm">Date</label>
                <div className="relative">
                  <Calendar size={16} className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="date"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="col-span-1 md:col-span-3 flex justify-center mt-4">
                <Link
                  to="/buses"
                  className="inline-block bg-blue-900 text-white px-6 py-3 rounded-md hover:bg-blue-800 transition-colors"
                >
                  Search Buses
                </Link>
              </div>
            </div>
          )}

          {activeTab === 'events' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="col-span-1">
                <label className="block text-gray-700 mb-1 text-sm">City</label>
                <div className="relative">
                  <MapPin size={16} className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Event city"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="col-span-1">
                <label className="block text-gray-700 mb-1 text-sm">Event Type</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">All Events</option>
                  <option value="music">Music</option>
                  <option value="movie">Movies</option>
                  <option value="theatre">Theatre</option>
                  <option value="exhibition">Exhibition</option>
                </select>
              </div>
              <div className="col-span-1">
                <label className="block text-gray-700 mb-1 text-sm">Date</label>
                <div className="relative">
                  <Calendar size={16} className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="date"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="col-span-1 md:col-span-3 flex justify-center mt-4">
                <Link
                  to="/events"
                  className="inline-block bg-blue-900 text-white px-6 py-3 rounded-md hover:bg-blue-800 transition-colors"
                >
                  Find Events
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-8">Popular Destinations</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularDestinations.map((destination, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-xl transition-shadow"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={destination.image} 
                  alt={destination.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
                <h3 className="absolute bottom-4 left-4 text-xl font-bold text-white">
                  {destination.name}
                </h3>
              </div>
              <div className="p-4">
                <p className="text-gray-600 mb-4">{destination.description}</p>
                <Link 
                  to="/flights" 
                  className="inline-flex items-center text-blue-900 hover:text-blue-700"
                >
                  Explore <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose TravelEase</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Plane className="text-blue-900" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-center mb-3">All in One Platform</h3>
              <p className="text-gray-600 text-center">
                Book flights, trains, buses, and events all in one place. No need to switch between apps.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Calendar className="text-blue-900" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-center mb-3">Easy Booking</h3>
              <p className="text-gray-600 text-center">
                Our intuitive interface makes booking quick and hassle-free, saving you time and frustration.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <MapPin className="text-blue-900" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-center mb-3">Best Prices</h3>
              <p className="text-gray-600 text-center">
                Access to the best deals and offers from top partners across India.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-blue-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of travelers who book with TravelEase every day
          </p>
          {!localStorage.getItem('currentUser') && (
            <Link 
              to="/register" 
              className="inline-block bg-yellow-500 text-blue-900 font-bold px-8 py-3 rounded-md hover:bg-yellow-400 transition-colors"
            >
              Sign Up Now
            </Link>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;