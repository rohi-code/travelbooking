import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Train, Calendar, Filter, Clock, Search } from 'lucide-react';
import { trains, cities } from '../data/mockData';
import { format } from 'date-fns';

const TrainSearch = () => {
  const [searchParams, setSearchParams] = useState({
    from: '',
    to: '',
    date: format(new Date(), 'yyyy-MM-dd')
  });
  
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 6000]);
  const [classTypes, setClassTypes] = useState({
    '1A': true,
    '2A': true,
    '3A': true,
    'SL': true,
    'CC': true,
    'EC': true
  });
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({ ...prev, [name]: value }));
  };
  
  const handleClassTypeChange = (classType) => {
    setClassTypes(prev => ({
      ...prev,
      [classType]: !prev[classType]
    }));
  };
  
  // Filter trains
  const filteredTrains = trains
    .filter(train => {
      if (!searchParams.from && !searchParams.to) return true;
      
      const fromMatch = !searchParams.from || train.from.toLowerCase().includes(searchParams.from.toLowerCase());
      const toMatch = !searchParams.to || train.to.toLowerCase().includes(searchParams.to.toLowerCase());
      
      const hasSelectedClass = train.classes.some(cls => {
        const classKey = cls.name.includes('First Class') ? '1A' :
                        cls.name.includes('2-Tier') ? '2A' :
                        cls.name.includes('3-Tier') ? '3A' :
                        cls.name.includes('Sleeper') ? 'SL' :
                        cls.name.includes('Chair Car') ? 'CC' :
                        cls.name.includes('Executive') ? 'EC' : null;
                        
        return classKey && classTypes[classKey] && cls.price >= priceRange[0] && cls.price <= priceRange[1];
      });
      
      return fromMatch && toMatch && hasSelectedClass;
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
                  list="fromStations"
                  placeholder="From Station"
                  className="w-full pl-4 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchParams.from}
                  onChange={handleInputChange}
                />
                <datalist id="fromStations">
                  {cities.map((city, index) => (
                    <option key={index} value={`${city} (${city.substring(0, 3).toUpperCase()})`} />
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
                  list="toStations"
                  placeholder="To Station"
                  className="w-full pl-4 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchParams.to}
                  onChange={handleInputChange}
                />
                <datalist id="toStations">
                  {cities.map((city, index) => (
                    <option key={index} value={`${city} (${city.substring(0, 3).toUpperCase()})`} />
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
                Search Trains
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
                  max="6000"
                  step="500"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full"
                />
              </div>
              
              <div>
                <label className="font-medium text-gray-700 block mb-2">Class</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={classTypes['1A']}
                      onChange={() => handleClassTypeChange('1A')}
                      className="mr-2"
                    />
                    <span className="text-gray-700">AC First Class (1A)</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={classTypes['2A']}
                      onChange={() => handleClassTypeChange('2A')}
                      className="mr-2"
                    />
                    <span className="text-gray-700">AC 2-Tier (2A)</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={classTypes['3A']}
                      onChange={() => handleClassTypeChange('3A')}
                      className="mr-2"
                    />
                    <span className="text-gray-700">AC 3-Tier (3A)</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={classTypes['SL']}
                      onChange={() => handleClassTypeChange('SL')}
                      className="mr-2"
                    />
                    <span className="text-gray-700">Sleeper (SL)</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={classTypes['CC']}
                      onChange={() => handleClassTypeChange('CC')}
                      className="mr-2"
                    />
                    <span className="text-gray-700">Chair Car (CC)</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={classTypes['EC']}
                      onChange={() => handleClassTypeChange('EC')}
                      className="mr-2"
                    />
                    <span className="text-gray-700">Executive Chair (EC)</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          
          {/* Results */}
          <div className="flex-grow">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-semibold text-gray-800 mb-4">
                {filteredTrains.length} Trains Available
              </h3>
              
              {filteredTrains.length === 0 ? (
                <div className="text-center py-8">
                  <Train size={48} className="mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500">No trains match your search criteria.</p>
                  <p className="text-gray-500 mt-2">Try adjusting your search parameters.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredTrains.map((train) => (
                    <Link
                      key={train.id}
                      to={`/trains/${train.id}`}
                      className="block border border-gray-200 rounded-lg hover:shadow-md transition-shadow p-4"
                    >
                      <div className="flex flex-col sm:flex-row justify-between">
                        <div className="mb-4 sm:mb-0">
                          <div className="flex items-center mb-2">
                            <img 
                              src={train.logo} 
                              alt={train.trainName} 
                              className="w-10 h-10 object-cover mr-3 rounded-md"
                            />
                            <div>
                              <h4 className="font-medium text-gray-800">{train.trainName}</h4>
                              <p className="text-sm text-gray-600">{train.trainNumber}</p>
                            </div>
                          </div>
                          
                          <div className="ml-13 pl-13">
                            <p className="text-sm text-gray-700 mb-1">
                              <span className="inline-block w-20">Runs on:</span> 
                              <span className="font-medium">Daily</span>
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                          <div className="text-center">
                            <p className="font-semibold text-gray-800">
                              {new Date(train.departureTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                            </p>
                            <p className="text-sm text-gray-600">{train.from.split('(')[0]}</p>
                          </div>
                          
                          <div className="hidden sm:flex flex-col items-center">
                            <p className="text-xs text-gray-500 mb-1">{train.duration}</p>
                            <div className="w-20 sm:w-32 h-0.5 bg-gray-300 relative">
                              <div className="absolute -top-1.5 left-0 w-2 h-2 rounded-full bg-gray-400"></div>
                              <div className="absolute -top-1.5 right-0 w-2 h-2 rounded-full bg-gray-400"></div>
                            </div>
                          </div>
                          
                          <div className="text-center">
                            <p className="font-semibold text-gray-800">
                              {new Date(train.arrivalTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                            </p>
                            <p className="text-sm text-gray-600">{train.to.split('(')[0]}</p>
                          </div>
                          
                          <div className="mt-2 sm:mt-0 sm:ml-4">
                            <div className="flex flex-wrap gap-2">
                              {train.classes.slice(0, 2).map((cls, index) => (
                                <div key={index} className="text-center">
                                  <p className="bg-blue-50 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                                    {cls.name.split('(')[1]?.replace(')', '') || cls.name}
                                  </p>
                                  <p className="text-sm font-semibold text-blue-900 mt-1">₹{cls.price}</p>
                                </div>
                              ))}
                              {train.classes.length > 2 && (
                                <div className="text-center">
                                  <p className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs font-medium">
                                    +{train.classes.length - 2} more
                                  </p>
                                </div>
                              )}
                            </div>
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

export default TrainSearch;