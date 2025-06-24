import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bus, Calendar, Filter, Clock, Search } from 'lucide-react';
import { buses, cities } from '../data/mockData';
import { format } from 'date-fns';

const BusSearch = () => {
  const [searchParams, setSearchParams] = useState({
    from: '',
    to: '',
    date: format(new Date(), 'yyyy-MM-dd')
  });
  
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 1500]);
  const [busTypes, setBusTypes] = useState({
    'AC Sleeper': true,
    'Non-AC Sleeper': true,
    'Volvo AC Seater': true,
    'Non-AC Seater': true
  });
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({ ...prev, [name]: value }));
  };
  
  const handleBusTypeChange = (type) => {
    setBusTypes(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };
  
  // Filter buses
  const filteredBuses = buses
    .filter(bus => {
      if (!searchParams.from && !searchParams.to) return true;
      
      const fromMatch = !searchParams.from || bus.from.toLowerCase().includes(searchParams.from.toLowerCase());
      const toMatch = !searchParams.to || bus.to.toLowerCase().includes(searchParams.to.toLowerCase());
      const typeMatch = busTypes[bus.type];
      
      return fromMatch && toMatch && typeMatch && bus.price >= priceRange[0] && bus.price <= priceRange[1];
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
              <label className="block text-gray-700 mb-1 text-sm">Journey Date</label>
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
                Search Buses
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
                  max="1500"
                  step="100"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full"
                />
              </div>
              
              <div>
                <label className="font-medium text-gray-700 block mb-2">Bus Type</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={busTypes['AC Sleeper']}
                      onChange={() => handleBusTypeChange('AC Sleeper')}
                      className="mr-2"
                    />
                    <span className="text-gray-700">AC Sleeper</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={busTypes['Non-AC Sleeper']}
                      onChange={() => handleBusTypeChange('Non-AC Sleeper')}
                      className="mr-2"
                    />
                    <span className="text-gray-700">Non-AC Sleeper</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={busTypes['Volvo AC Seater']}
                      onChange={() => handleBusTypeChange('Volvo AC Seater')}
                      className="mr-2"
                    />
                    <span className="text-gray-700">Volvo AC Seater</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={busTypes['Non-AC Seater']}
                      onChange={() => handleBusTypeChange('Non-AC Seater')}
                      className="mr-2"
                    />
                    <span className="text-gray-700">Non-AC Seater</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          
          {/* Results */}
          <div className="flex-grow">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-semibold text-gray-800 mb-4">
                {filteredBuses.length} Buses Available
              </h3>
              
              {filteredBuses.length === 0 ? (
                <div className="text-center py-8">
                  <Bus size={48} className="mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500">No buses match your search criteria.</p>
                  <p className="text-gray-500 mt-2">Try adjusting your search parameters.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredBuses.map((bus) => (
                    <Link
                      key={bus.id}
                      to={`/buses/${bus.id}`}
                      className="block border border-gray-200 rounded-lg hover:shadow-md transition-shadow p-4"
                    >
                      <div className="flex flex-col sm:flex-row justify-between">
                        <div className="mb-4 sm:mb-0">
                          <div className="flex items-center mb-2">
                            <img 
                              src={bus.logo} 
                              alt={bus.operatorName} 
                              className="w-10 h-10 object-cover mr-3 rounded-md"
                            />
                            <div>
                              <h4 className="font-medium text-gray-800">{bus.operatorName}</h4>
                              <p className="text-sm text-gray-600">{bus.busNumber}</p>
                            </div>
                          </div>
                          
                          <div className="ml-13 pl-13">
                            <p className="text-sm text-blue-800 font-medium">
                              {bus.type}
                            </p>
                            <p className="text-sm text-gray-600">
                              {bus.availableSeats} seats available
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                          <div className="text-center">
                            <p className="font-semibold text-gray-800">
                              {new Date(bus.departureTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                            </p>
                            <p className="text-sm text-gray-600">{bus.from}</p>
                          </div>
                          
                          <div className="hidden sm:flex flex-col items-center">
                            <p className="text-xs text-gray-500 mb-1">{bus.duration}</p>
                            <div className="w-20 sm:w-32 h-0.5 bg-gray-300 relative">
                              <div className="absolute -top-1.5 left-0 w-2 h-2 rounded-full bg-gray-400"></div>
                              <div className="absolute -top-1.5 right-0 w-2 h-2 rounded-full bg-gray-400"></div>
                            </div>
                          </div>
                          
                          <div className="text-center">
                            <p className="font-semibold text-gray-800">
                              {new Date(bus.arrivalTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                            </p>
                            <p className="text-sm text-gray-600">{bus.to}</p>
                          </div>
                          
                          <div className="mt-2 sm:mt-0 text-center sm:ml-4">
                            <p className="text-lg font-bold text-blue-900">₹{bus.price}</p>
                            <p className="text-xs text-gray-500">per seat</p>
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

export default BusSearch;