import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Filter, Search, Map, Tag } from 'lucide-react';
import { events, cities } from '../data/mockData';
import { format } from 'date-fns';

const EventSearch = () => {
  const [searchParams, setSearchParams] = useState({
    city: '',
    category: '',
    date: ''
  });
  
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 5000]);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({ ...prev, [name]: value }));
  };
  
  // Filter events
  const filteredEvents = events
    .filter(event => {
      if (searchParams.city && !event.venue.toLowerCase().includes(searchParams.city.toLowerCase())) {
        return false;
      }
      
      if (searchParams.category && event.category !== searchParams.category) {
        return false;
      }
      
      if (searchParams.date) {
        const searchDate = new Date(searchParams.date);
        const eventDate = new Date(event.date);
        if (
          searchDate.getDate() !== eventDate.getDate() ||
          searchDate.getMonth() !== eventDate.getMonth() ||
          searchDate.getFullYear() !== eventDate.getFullYear()
        ) {
          return false;
        }
      }
      
      return event.price >= priceRange[0] && event.price <= priceRange[1];
    });

  // Get unique categories
  const categories = [...new Set(events.map(event => event.category))];

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="container mx-auto px-4">
        {/* Search Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="col-span-1">
              <label className="block text-gray-700 mb-1 text-sm">City</label>
              <div className="relative">
                <input
                  type="text"
                  name="city"
                  list="eventCities"
                  placeholder="Enter city"
                  className="w-full pl-4 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchParams.city}
                  onChange={handleInputChange}
                />
                <datalist id="eventCities">
                  {cities.map((city, index) => (
                    <option key={index} value={city} />
                  ))}
                </datalist>
              </div>
            </div>
            
            <div className="col-span-1">
              <label className="block text-gray-700 mb-1 text-sm">Category</label>
              <select
                name="category"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchParams.category}
                onChange={handleInputChange}
              >
                <option value="">All Categories</option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>{category}</option>
                ))}
              </select>
            </div>
            
            <div className="col-span-1">
              <label className="block text-gray-700 mb-1 text-sm">Date</label>
              <div className="relative">
                <input
                  type="date"
                  name="date"
                  className="w-full pl-4 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchParams.date}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            
            <div className="col-span-1 flex items-end">
              <button 
                className="w-full bg-blue-900 text-white py-2 rounded-md hover:bg-blue-800 transition-colors flex items-center justify-center"
              >
                <Search size={18} className="mr-2" />
                Find Events
              </button>
            </div>
          </div>
        </div>
        
        {/* Filters and Results */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters - Mobile Toggle */}
          <div className="md:hidden mb-4">
            <button 
              className="flex items-center text-blue-900 font-medium"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter size={18} className="mr-2" />
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>
          </div>
          
          {/* Filters */}
          <div className={`${showFilters ? 'block' : 'hidden'} md:block md:w-1/4`}>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-semibold text-gray-800 mb-4">Filters</h3>
              
              <div className="mb-6">
                <label className="font-medium text-gray-700 block mb-2">Price Range</label>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">₹{priceRange[0]}</span>
                  <span className="text-sm text-gray-600">₹{priceRange[1]}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="5000"
                  step="500"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full"
                />
              </div>
              
              {searchParams.category === '' && (
                <div>
                  <label className="font-medium text-gray-700 block mb-2">Categories</label>
                  <div className="space-y-2">
                    {categories.map((category, index) => (
                      <label key={index} className="flex items-center">
                        <input
                          type="radio"
                          name="categoryFilter"
                          value={category}
                          checked={searchParams.category === category}
                          onChange={() => setSearchParams(prev => ({ ...prev, category: category }))}
                          className="mr-2"
                        />
                        <span className="text-gray-700">{category}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Results */}
          <div className="flex-grow">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-semibold text-gray-800 mb-4">
                {filteredEvents.length} Events Found
              </h3>
              
              {filteredEvents.length === 0 ? (
                <div className="text-center py-8">
                  <Calendar size={48} className="mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500">No events match your search criteria.</p>
                  <p className="text-gray-500 mt-2">Try adjusting your search parameters.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredEvents.map((event) => (
                    <Link
                      key={event.id}
                      to={`/events/${event.id}`}
                      className="block rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                    >
                      <div className="relative h-40 overflow-hidden">
                        <img 
                          src={event.image} 
                          alt={event.name} 
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                        />
                        <div className="absolute top-0 right-0 bg-blue-900 text-white px-3 py-1 m-2 rounded-full text-xs font-medium">
                          {event.category}
                        </div>
                      </div>
                      
                      <div className="p-4">
                        <h4 className="font-semibold text-gray-800 mb-2 line-clamp-1">{event.name}</h4>
                        
                        <div className="flex items-start mb-2">
                          <Calendar size={16} className="text-gray-500 mr-2 mt-0.5 flex-shrink-0" />
                          <p className="text-sm text-gray-600">
                            {format(new Date(event.date), 'EEE, MMM d, yyyy • h:mm a')}
                          </p>
                        </div>
                        
                        <div className="flex items-start mb-3">
                          <Map size={16} className="text-gray-500 mr-2 mt-0.5 flex-shrink-0" />
                          <p className="text-sm text-gray-600 line-clamp-1">{event.venue}</p>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-lg font-bold text-blue-900">
                              {event.price === 0 ? 'Free' : `₹${event.price}`}
                            </p>
                            <p className="text-xs text-gray-500">
                              {event.availableSeats} seats left
                            </p>
                          </div>
                          
                          <button className="text-blue-900 font-medium text-sm hover:text-blue-700">
                            View Details
                          </button>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventSearch;