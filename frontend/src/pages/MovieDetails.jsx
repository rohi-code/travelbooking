import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  Star, Clock, Calendar, Film, AlertCircle, 
  Users, Tag, ChevronDown, ChevronUp, Play 
} from 'lucide-react';
import { movies, theaters } from '../data/mockData';
import { format } from 'date-fns';

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showCastCrew, setShowCastCrew] = useState(false);
  const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  
  // Find movie by id
  const movie = movies.find(m => m.id === parseInt(id));
  
  if (!movie) {
    return (
      <div className="min-h-screen bg-gray-50 pt-32 pb-12 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle size={48} className="mx-auto text-red-500 mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Movie Not Found</h2>
          <p className="text-gray-600 mb-6">The movie you're looking for doesn't exist.</p>
          <button 
            onClick={() => navigate('/movies')}
            className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition-colors"
          >
            Back to Movies
          </button>
        </div>
      </div>
    );
  }

  // Get available theaters for this movie
  const availableTheaters = theaters.filter(theater => 
    theater.showTimings.some(show => show.movieId === movie.id)
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <div className="relative h-[70vh]">
        <img 
          src={movie.bannerImage} 
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row gap-8 items-end">
              <img 
                src={movie.poster} 
                alt={movie.title}
                className="w-64 rounded-lg shadow-lg"
              />
              
              <div className="flex-grow">
                <div className="flex items-center gap-4 mb-4">
                  <h1 className="text-4xl font-bold text-white">{movie.title}</h1>
                  <div className="flex items-center bg-blue-900 text-white px-3 py-1 rounded-full">
                    <Star size={16} className="text-yellow-400 mr-1" />
                    <span>{movie.averageRating}/5</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 text-gray-300 mb-6">
                  <div className="flex items-center">
                    <Clock size={16} className="mr-1" />
                    {movie.duration}
                  </div>
                  <span>•</span>
                  <div>{movie.language}</div>
                  <span>•</span>
                  <div>{movie.category}</div>
                  <span>•</span>
                  <div>{movie.rating}</div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {movie.format.map((format, index) => (
                    <span 
                      key={index}
                      className="bg-white/20 text-white px-3 py-1 rounded-full text-sm"
                    >
                      {format}
                    </span>
                  ))}
                </div>
                
                <p className="text-gray-300 max-w-2xl mb-8">
                  {movie.description}
                </p>
                
                <button className="bg-blue-900 text-white px-8 py-3 rounded-md hover:bg-blue-800 transition-colors flex items-center">
                  <Play size={20} className="mr-2" />
                  Watch Trailer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="lg:w-2/3">
            {/* Cast & Crew */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <button 
                className="flex items-center justify-between w-full"
                onClick={() => setShowCastCrew(!showCastCrew)}
              >
                <h2 className="text-xl font-bold text-gray-800">Cast & Crew</h2>
                {showCastCrew ? <ChevronUp /> : <ChevronDown />}
              </button>
              
              {showCastCrew && (
                <div className="mt-6">
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Cast</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {movie.cast.map((person, index) => (
                        <div key={index} className="text-center">
                          <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-2 flex items-center justify-center">
                            <Users size={32} className="text-gray-400" />
                          </div>
                          <p className="font-medium text-gray-800">{person.name}</p>
                          <p className="text-sm text-gray-600">{person.role}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Crew</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {movie.crew.map((person, index) => (
                        <div key={index} className="text-center">
                          <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-2 flex items-center justify-center">
                            <Users size={32} className="text-gray-400" />
                          </div>
                          <p className="font-medium text-gray-800">{person.name}</p>
                          <p className="text-sm text-gray-600">{person.role}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Reviews */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Top Reviews</h2>
              
              <div className="space-y-6">
                {movie.reviews.map((review, index) => (
                  <div key={index} className="border-b border-gray-200 last:border-0 pb-6 last:pb-0">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center bg-blue-50 text-blue-800 px-2 py-1 rounded">
                        <Star size={14} className="mr-1" />
                        {review.rating}
                      </div>
                      <span className="font-medium text-gray-800">{review.author}</span>
                    </div>
                    <p className="text-gray-600">{review.review}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Booking Section */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Book Tickets</h2>
              
              {/* Date Selection */}
              <div className="mb-6">
                <label className="block text-gray-700 mb-2">Select Date</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min={format(new Date(), 'yyyy-MM-dd')}
                />
              </div>
              
              {/* Theaters List */}
              <div className="space-y-4">
                {availableTheaters.map((theater) => (
                  <div key={theater.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-medium text-gray-800">{theater.name}</h3>
                        <p className="text-sm text-gray-600">{theater.location}</p>
                      </div>
                      <div className="flex items-center text-sm text-blue-900">
                        <Film size={14} className="mr-1" />
                        {theater.screens.length} Screens
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {theater.showTimings
                        .filter(show => show.movieId === movie.id)
                        .map((show, index) => (
                          <Link
                            key={index}
                            to={`/theaters/${theater.id}?showTime=${show.time}&date=${show.date}`}
                            className="bg-blue-50 text-blue-900 px-4 py-2 rounded hover: bg-blue-100 transition-colors"
                          >
                            {show.time}
                          </Link>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;