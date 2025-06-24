import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Film, Calendar, Filter, Search, Star, Clock } from 'lucide-react';
import { movies, movieGenres, movieLanguages, movieFormats } from '../data/mockData';
import { format } from 'date-fns';

const MovieSearch = () => {
  const [searchParams, setSearchParams] = useState({
    query: '',
    language: '',
    format: '',
    genre: ''
  });
  
  const [showFilters, setShowFilters] = useState(false);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({ ...prev, [name]: value }));
  };
  
  // Filter movies
  const filteredMovies = movies.filter(movie => {
    const matchQuery = !searchParams.query || 
      movie.title.toLowerCase().includes(searchParams.query.toLowerCase());
    const matchLanguage = !searchParams.language || 
      movie.language === searchParams.language;
    const matchFormat = !searchParams.format || 
      movie.format.includes(searchParams.format);
    const matchGenre = !searchParams.genre || 
      movie.category.toLowerCase().includes(searchParams.genre.toLowerCase());
    
    return matchQuery && matchLanguage && matchFormat && matchGenre;
  });

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="container mx-auto px-4">
        {/* Hero Banner */}
        <div className="relative h-64 md:h-96 rounded-xl overflow-hidden mb-8">
          <img 
            src="https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Movies Banner"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Book Movie Tickets
            </h1>
            <p className="text-lg text-gray-200">
              Watch the latest movies in theaters near you
            </p>
          </div>
        </div>

        {/* Search Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="col-span-1">
              <label className="block text-gray-700 mb-1 text-sm">Search Movies</label>
              <div className="relative">
                <input
                  type="text"
                  name="query"
                  placeholder="Search by movie title"
                  className="w-full pl-4 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchParams.query}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            
            <div className="col-span-1">
              <label className="block text-gray-700 mb-1 text-sm">Language</label>
              <select
                name="language"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchParams.language}
                onChange={handleInputChange}
              >
                <option value="">All Languages</option>
                {movieLanguages.map((language, index) => (
                  <option key={index} value={language}>{language}</option>
                ))}
              </select>
            </div>
            
            <div className="col-span-1">
              <label className="block text-gray-700 mb-1 text-sm">Format</label>
              <select
                name="format"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchParams.format}
                onChange={handleInputChange}
              >
                <option value="">All Formats</option>
                {movieFormats.map((format, index) => (
                  <option key={index} value={format}>{format}</option>
                ))}
              </select>
            </div>
            
            <div className="col-span-1">
              <label className="block text-gray-700 mb-1 text-sm">Genre</label>
              <select
                name="genre"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchParams.genre}
                onChange={handleInputChange}
              >
                <option value="">All Genres</option>
                {movieGenres.map((genre, index) => (
                  <option key={index} value={genre}>{genre}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        {/* Movies Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredMovies.map((movie) => (
            <Link
              key={movie.id}
              to={`/movies/${movie.id}`}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative h-96">
                <img 
                  src={movie.poster} 
                  alt={movie.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-0 right-0 bg-black bg-opacity-75 text-white px-3 py-1 m-2 rounded-full text-sm font-medium flex items-center">
                  <Star size={14} className="text-yellow-400 mr-1" />
                  {movie.averageRating}/5
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 text-lg mb-2">{movie.title}</h3>
                
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <Clock size={14} className="mr-1" />
                  {movie.duration}
                  <span className="mx-2">•</span>
                  {movie.language}
                  <span className="mx-2">•</span>
                  {movie.rating}
                </div>
                
                <p className="text-sm text-gray-600 mb-3">{movie.category}</p>
                
                <div className="flex flex-wrap gap-2">
                  {movie.format.map((format, index) => (
                    <span 
                      key={index}
                      className="bg-blue-50 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded"
                    >
                      {format}
                    </span>
                  ))}
                </div>
                
                <button className="w-full mt-4 bg-blue-900 text-white py-2 rounded-md hover:bg-blue-800 transition-colors">
                  Book Tickets
                </button>
              </div>
            </Link>
          ))}
        </div>
        
        {filteredMovies.length === 0 && (
          <div className="text-center py-12">
            <Film size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500">No movies match your search criteria.</p>
            <p className="text-gray-500 mt-2">Try adjusting your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieSearch;