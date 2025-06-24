import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plane, Calendar, Filter, Clock, Search } from 'lucide-react';
import { flights, cities } from '../data/mockData';
import { format } from 'date-fns';

const FlightSearch = () => {
  const [searchParams, setSearchParams] = useState({
    from: '',
    to: '',
    date: format(new Date(), 'yyyy-MM-dd')
  });
  
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 20000]);
  const [sortBy, setSortBy] = useState('price');
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({ ...prev, [name]: value }));
  };
  
  // Filter and sort flights
  const filteredFlights = flights
    .filter(flight => {
      if (!searchParams.from && !searchParams.to) return true;
      
      const fromMatch = !searchParams.from || flight.from.toLowerCase().includes(searchParams.from.toLowerCase());
      const toMatch = !searchParams.to || flight.to.toLowerCase().includes(searchParams.to.toLowerCase());
      
      return fromMatch && toMatch && flight.price >= priceRange[0] && flight.price <= priceRange[1];
    })
    .sort((a, b) => {
      if (sortBy === 'price') return a.price - b.price;
      if (sortBy === 'duration') {
        const durationA = a.duration.replace('h ', '') * 60 + parseInt(a.duration.split('m')[0].split(' ')[1]);
        const durationB = b.duration.replace('h ', '') * 60 + parseInt(b.duration.split('m')[0].split(' ')[1]);
        return durationA - durationB;
      }
      return 0;
    });

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="container mx-auto px-4">
        {/* Search Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="col-span-1">
              <label className="block text-gray-700 mb-1 text-sm">From</label>
              <div className="relative">
                <input
                  type="text"
                  name="from"
                  list="fromCities"
                  placeholder="From City"
                  className="w-full pl-4 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchParams.from}
                  onChange={handleInputChange}
                />
                <datalist id="fromCities">
                  {cities.map((city, index) => (
                    <option key={index} value={city} />
                  ))}
                </datalist>
              </div>
            </div>
            
            <div className="col-span-1">
              <label className="block text-gray-700 mb-1 text-sm">To</label>
              <div className="relative">
                <input
                  type="text"
                  name="to"
                  list="toCities"
                  placeholder="To City"
                  className="w-full pl-4 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchParams.to}
                  onChange={handleInputChange}
                />
                <datalist id="toCities">
                  {cities.map((city, index) => (
                    <option key={index} value={city} />
                  ))}
                </datalist>
              </div>
            </div>
            
            <div className="col-span-1">
              <label className="block text-gray-700 mb-1 text-sm">Departure Date</label>
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
                Search Flights
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
                  max="20000"
                  step="500"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full"
                />
              </div>
              
              <div className="mb-6">
                <label className="font-medium text-gray-700 block mb-2">Sort By</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="sortBy"
                      value="price"
                      checked={sortBy === 'price'}
                      onChange={() => setSortBy('price')}
                      className="mr-2"
                    />
                    <span className="text-gray-700">Price (Low to High)</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="sortBy"
                      value="duration"
                      checked={sortBy === 'duration'}
                      onChange={() => setSortBy('duration')}
                      className="mr-2"
                    />
                    <span className="text-gray-700">Duration (Shortest)</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          
          {/* Results */}
          <div className="flex-grow">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-semibold text-gray-800 mb-4">
                {filteredFlights.length} Flights Available
              </h3>
              
              {filteredFlights.length === 0 ? (
                <div className="text-center py-8">
                  <Plane size={48} className="mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500">No flights match your search criteria.</p>
                  <p className="text-gray-500 mt-2">Try adjusting your search parameters.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredFlights.map((flight) => (
                    <Link
                      key={flight.id}
                      to={`/flights/${flight.id}`}
                      className="block border border-gray-200 rounded-lg hover:shadow-md transition-shadow p-4"
                    >
                      <div className="flex flex-col sm:flex-row justify-between">
                        <div className="flex items-center mb-4 sm:mb-0">
                          <img 
                            src={flight.logo} 
                            alt={flight.airline} 
                            className="w-12 h-12 object-contain mr-4 rounded-md"
                          />
                          <div>
                            <h4 className="font-medium text-gray-800">{flight.airline}</h4>
                            <p className="text-sm text-gray-600">{flight.flightNumber}</p>
                          </div>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between flex-grow sm:ml-6 gap-4">
                          <div className="text-center">
                            <p className="font-medium text-gray-800">
                              {new Date(flight.departureTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                            </p>
                            <p className="text-sm text-gray-600">{flight.from.split('(')[0]}</p>
                          </div>
                          
                          <div className="flex flex-col items-center">
                            <p className="text-xs text-gray-500 mb-1">{flight.duration}</p>
                            <div className="w-20 sm:w-32 h-0.5 bg-gray-300 relative">
                              <div className="absolute -top-1.5 left-0 w-2 h-2 rounded-full bg-gray-400"></div>
                              <div className="absolute -top-1.5 right-0 w-2 h-2 rounded-full bg-gray-400"></div>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Direct</p>
                          </div>
                          
                          <div className="text-center">
                            <p className="font-medium text-gray-800">
                              {new Date(flight.arrivalTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                            </p>
                            <p className="text-sm text-gray-600">{flight.to.split('(')[0]}</p>
                          </div>
                          
                          <div className="text-center ml-auto">
                            <p className="text-lg font-bold text-blue-900">₹{flight.price}</p>
                            <p className="text-xs text-gray-500">per person</p>
                          </div>
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

export default FlightSearch;