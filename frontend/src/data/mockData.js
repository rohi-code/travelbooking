// Mock data for flights
export const flights = [
    {
      id: 1,
      airline: "IndiGo",
      flightNumber: "6E-2371",
      from: "Delhi (DEL)",
      to: "Mumbai (BOM)",
      departureTime: "2023-05-20T06:20:00",
      arrivalTime: "2023-05-20T08:40:00",
      duration: "2h 20m",
      price: 4299,
      seats: [
        { class: "Economy", available: 43, price: 4299 },
        { class: "Business", available: 8, price: 12599 }
      ],
      logo: "https://images.pexels.com/photos/8910681/pexels-photo-8910681.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
      id: 2,
      airline: "Air India",
      flightNumber: "AI-887",
      from: "Mumbai (BOM)",
      to: "Bangalore (BLR)",
      departureTime: "2023-05-21T13:15:00",
      arrivalTime: "2023-05-21T15:00:00",
      duration: "1h 45m",
      price: 5199,
      seats: [
        { class: "Economy", available: 28, price: 5199 },
        { class: "Business", available: 4, price: 14399 }
      ],
      logo: "https://images.pexels.com/photos/1701202/pexels-photo-1701202.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
      id: 3,
      airline: "Vistara",
      flightNumber: "UK-902",
      from: "Bangalore (BLR)",
      to: "Kolkata (CCU)",
      departureTime: "2023-05-22T09:45:00",
      arrivalTime: "2023-05-22T12:25:00",
      duration: "2h 40m",
      price: 6099,
      seats: [
        { class: "Economy", available: 32, price: 6099 },
        { class: "Premium Economy", available: 12, price: 9399 },
        { class: "Business", available: 6, price: 18299 }
      ],
      logo: "https://images.pexels.com/photos/46148/aircraft-jet-landing-cloud-46148.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
      id: 4,
      airline: "SpiceJet",
      flightNumber: "SG-438",
      from: "Delhi (DEL)",
      to: "Chennai (MAA)",
      departureTime: "2023-05-23T16:50:00",
      arrivalTime: "2023-05-23T19:40:00",
      duration: "2h 50m",
      price: 3899,
      seats: [
        { class: "Economy", available: 52, price: 3899 },
        { class: "SpiceMax", available: 10, price: 5999 }
      ],
      logo: "https://images.pexels.com/photos/358220/pexels-photo-358220.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
      id: 5,
      airline: "IndiGo",
      flightNumber: "6E-784",
      from: "Mumbai (BOM)",
      to: "Delhi (DEL)",
      departureTime: "2023-05-24T05:30:00",
      arrivalTime: "2023-05-24T07:45:00",
      duration: "2h 15m",
      price: 4499,
      seats: [
        { class: "Economy", available: 39, price: 4499 }
      ],
      logo: "https://images.pexels.com/photos/8910681/pexels-photo-8910681.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    }
  ];
  
  // Mock data for trains
  export const trains = [
    {
      id: 1,
      trainName: "Rajdhani Express",
      trainNumber: "12301",
      from: "New Delhi (NDLS)",
      to: "Howrah (HWH)",
      departureTime: "2023-05-20T16:10:00",
      arrivalTime: "2023-05-21T10:05:00",
      duration: "17h 55m",
      classes: [
        { name: "AC First Class (1A)", available: 4, price: 4290 },
        { name: "AC 2-Tier (2A)", available: 28, price: 2490 },
        { name: "AC 3-Tier (3A)", available: 64, price: 1720 }
      ],
      logo: "https://images.pexels.com/photos/5112228/pexels-photo-5112228.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
      id: 2,
      trainName: "Shatabdi Express",
      trainNumber: "12046",
      from: "Chandigarh (CDG)",
      to: "New Delhi (NDLS)",
      departureTime: "2023-05-21T06:55:00",
      arrivalTime: "2023-05-21T10:25:00",
      duration: "3h 30m",
      classes: [
        { name: "Executive Class (EC)", available: 12, price: 1505 },
        { name: "Chair Car (CC)", available: 78, price: 955 }
      ],
      logo: "https://images.pexels.com/photos/2790396/pexels-photo-2790396.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
      id: 3,
      trainName: "Duronto Express",
      trainNumber: "12245",
      from: "Howrah (HWH)",
      to: "Chennai Central (MAS)",
      departureTime: "2023-05-22T12:45:00",
      arrivalTime: "2023-05-23T17:15:00",
      duration: "28h 30m",
      classes: [
        { name: "AC First Class (1A)", available: 2, price: 5890 },
        { name: "AC 2-Tier (2A)", available: 22, price: 3420 },
        { name: "AC 3-Tier (3A)", available: 58, price: 2340 },
        { name: "Sleeper (SL)", available: 180, price: 950 }
      ],
      logo: "https://images.pexels.com/photos/6156089/pexels-photo-6156089.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
      id: 4,
      trainName: "Vande Bharat Express",
      trainNumber: "22439",
      from: "New Delhi (NDLS)",
      to: "Varanasi (BSB)",
      departureTime: "2023-05-23T06:00:00",
      arrivalTime: "2023-05-23T14:00:00",
      duration: "8h 00m",
      classes: [
        { name: "Executive Class (EC)", available: 16, price: 2310 },
        { name: "Chair Car (CC)", available: 96, price: 1155 }
      ],
      logo: "https://images.pexels.com/photos/4555348/pexels-photo-4555348.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
      id: 5,
      trainName: "Gatimaan Express",
      trainNumber: "12049",
      from: "New Delhi (NDLS)",
      to: "Agra Cantt (AGC)",
      departureTime: "2023-05-24T08:10:00",
      arrivalTime: "2023-05-24T09:50:00",
      duration: "1h 40m",
      classes: [
        { name: "Executive Class (EC)", available: 10, price: 1505 },
        { name: "Chair Car (CC)", available: 73, price: 755 }
      ],
      logo: "https://images.pexels.com/photos/1762437/pexels-photo-1762437.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    }
  ];
  
  // Mock data for buses
  export const buses = [
    {
      id: 1,
      operatorName: "Uttar Pradesh State Transport",
      busNumber: "UP-1234",
      from: "Delhi",
      to: "Lucknow",
      departureTime: "2023-05-20T21:00:00",
      arrivalTime: "2023-05-21T07:00:00",
      duration: "10h 00m",
      type: "AC Sleeper",
      availableSeats: 18,
      price: 950,
      logo: "https://images.pexels.com/photos/68629/pexels-photo-68629.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
      id: 2,
      operatorName: "Orange Travels",
      busNumber: "OT-4567",
      from: "Bangalore",
      to: "Hyderabad",
      departureTime: "2023-05-21T22:30:00",
      arrivalTime: "2023-05-22T06:15:00",
      duration: "7h 45m",
      type: "Volvo AC Seater",
      availableSeats: 24,
      price: 850,
      logo: "https://images.pexels.com/photos/385997/pexels-photo-385997.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
      id: 3,
      operatorName: "Rajasthan State Transport",
      busNumber: "RJ-7890",
      from: "Jaipur",
      to: "Delhi",
      departureTime: "2023-05-22T16:45:00",
      arrivalTime: "2023-05-22T22:30:00",
      duration: "5h 45m",
      type: "Non-AC Seater",
      availableSeats: 32,
      price: 450,
      logo: "https://images.pexels.com/photos/1426516/pexels-photo-1426516.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
      id: 4,
      operatorName: "VRL Travels",
      busNumber: "VT-2468",
      from: "Mumbai",
      to: "Pune",
      departureTime: "2023-05-23T07:30:00",
      arrivalTime: "2023-05-23T10:30:00",
      duration: "3h 00m",
      type: "Volvo AC Seater",
      availableSeats: 27,
      price: 450,
      logo: "https://images.pexels.com/photos/4608344/pexels-photo-4608344.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
      id: 5,
      operatorName: "Kerala State Transport",
      busNumber: "KL-1357",
      from: "Kochi",
      to: "Trivandrum",
      departureTime: "2023-05-24T15:15:00",
      arrivalTime: "2023-05-24T22:45:00",
      duration: "7h 30m",
      type: "AC Sleeper",
      availableSeats: 14,
      price: 750,
      logo: "https://images.pexels.com/photos/4552350/pexels-photo-4552350.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    }
  ];
  
  // Mock data for events
  export const events = [
    {
      id: 1,
      name: "Arijit Singh Live in Concert",
      category: "Music",
      date: "2023-05-30T19:00:00",
      venue: "Jawaharlal Nehru Stadium, Delhi",
      price: 2500,
      availableSeats: 450,
      image: "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      description: "Experience the magical voice of Arijit Singh live in concert as he performs his chart-topping hits that have captured hearts across the nation. This spectacular musical evening promises to be an unforgettable experience for music lovers."
    },
    {
      id: 2,
      name: "Avengers: Secret Wars",
      category: "Movies",
      date: "2023-06-05T18:30:00",
      venue: "PVR Cinemas, Mumbai",
      price: 500,
      availableSeats: 120,
      image: "https://images.pexels.com/photos/33129/popcorn-movie-party-entertainment.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      description: "The much-awaited next installment in the Marvel Cinematic Universe is here! Watch as your favorite superheroes band together to face the greatest threat the universe has ever seen in this action-packed adventure."
    },
    {
      id: 3,
      name: "Sunburn Music Festival",
      category: "Music",
      date: "2023-06-15T16:00:00",
      venue: "Candolim Beach, Goa",
      price: 3500,
      availableSeats: 1200,
      image: "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      description: "Asia's biggest electronic dance music festival returns to Goa! Experience three days of non-stop music featuring world-renowned DJs, stunning visuals, and unforgettable performances on the beautiful beaches of Goa."
    },
    {
      id: 4,
      name: "Hamlet by Shakespeare Society",
      category: "Theatre",
      date: "2023-05-25T19:30:00",
      venue: "National Centre for Performing Arts, Mumbai",
      price: 1200,
      availableSeats: 78,
      image: "https://images.pexels.com/photos/713149/pexels-photo-713149.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      description: "To be or not to be? Experience Shakespeare's timeless tragedy brought to life by the acclaimed Shakespeare Society. This modern interpretation of the classic play explores the themes of revenge, morality, and madness."
    },
    {
      id: 5,
      name: "Comic Con India",
      category: "Exhibition",
      date: "2023-07-01T10:00:00",
      venue: "IECC, Pragati Maidan, Delhi",
      price: 899,
      availableSeats: 2500,
      image: "https://images.pexels.com/photos/20458/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      description: "India's largest pop culture event is back! Meet your favorite comic book artists, cosplayers, and celebrities, shop for exclusive merchandise, and immerse yourself in the world of comics, movies, and gaming."
    },
    {
      id: 6,
      name: "International Yoga Day Celebration",
      category: "Wellness",
      date: "2023-06-21T06:30:00",
      venue: "Cubbon Park, Bangalore",
      price: 0,
      availableSeats: 500,
      image: "https://images.pexels.com/photos/3822864/pexels-photo-3822864.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      description: "Join hundreds of yoga enthusiasts to celebrate International Yoga Day with special sessions led by renowned yoga instructors. Experience the physical, mental, and spiritual benefits of yoga in the serene surroundings of Cubbon Park."
    }
  ];
  
  // Mock cities data for search
  export const cities = [
    "Delhi", "Mumbai", "Bangalore", "Chennai", "Kolkata", 
    "Hyderabad", "Pune", "Jaipur", "Ahmedabad", "Lucknow",
    "Chandigarh", "Kochi", "Goa", "Varanasi", "Agra"
  ];
  
  // Popular destinations
  export const popularDestinations = [
    {
      name: "Goa",
      image: "https://images.pexels.com/photos/1078983/pexels-photo-1078983.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      description: "Beach paradise"
    },
    {
      name: "Jaipur",
      image: "https://images.pexels.com/photos/3581364/pexels-photo-3581364.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      description: "Pink City"
    },
    {
      name: "Delhi",
      image: "https://images.pexels.com/photos/789750/pexels-photo-789750.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      description: "Historical Capital"
    },
    {
      name: "Mumbai",
      image: "https://images.pexels.com/photos/2409953/pexels-photo-2409953.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      description: "City of Dreams"
    }
  ];
  
  // Mock data for movies
  export const movies = [
    {
      id: 1,
      title: "Avengers: Secret Wars",
      category: "Action/Adventure",
      rating: "UA",
      duration: "2h 45m",
      language: "English",
      format: ["2D", "3D", "IMAX"],
      releaseDate: "2024-05-01",
      poster: "https://images.pexels.com/photos/1117132/pexels-photo-1117132.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      bannerImage: "https://images.pexels.com/photos/1117132/pexels-photo-1117132.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      description: "The epic conclusion to Phase 6 of the Marvel Cinematic Universe brings together heroes from across the multiverse for the ultimate battle.",
      cast: [
        { name: "Chris Hemsworth", role: "Thor" },
        { name: "Tom Hiddleston", role: "Loki" },
        { name: "Benedict Cumberbatch", role: "Dr. Strange" }
      ],
      crew: [
        { name: "Kevin Feige", role: "Producer" },
        { name: "Joe Russo", role: "Director" }
      ],
      reviews: [
        { rating: 4.5, review: "Mind-blowing visual effects!", author: "MovieBuff22" },
        { rating: 4.8, review: "Best Marvel movie yet!", author: "ComicFan99" }
      ],
      averageRating: 4.6
    },
    {
      id: 2,
      title: "Inception Returns",
      category: "Sci-Fi/Thriller",
      rating: "UA",
      duration: "2h 30m",
      language: "English",
      format: ["2D", "IMAX"],
      releaseDate: "2024-06-15",
      poster: "https://images.pexels.com/photos/2873486/pexels-photo-2873486.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      bannerImage: "https://images.pexels.com/photos/2873486/pexels-photo-2873486.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      description: "A mind-bending sequel to the critically acclaimed Inception, diving deeper into the world of dream manipulation.",
      cast: [
        { name: "Leonardo DiCaprio", role: "Cobb" },
        { name: "Tom Hardy", role: "Eames" }
      ],
      crew: [
        { name: "Christopher Nolan", role: "Director" },
        { name: "Hans Zimmer", role: "Music Director" }
      ],
      reviews: [
        { rating: 4.7, review: "A masterpiece!", author: "CinemaLover" },
        { rating: 4.9, review: "Nolan does it again!", author: "FilmCritic" }
      ],
      averageRating: 4.8
    },
    {
      id: 3,
      title: "The Last Symphony",
      category: "Drama",
      rating: "U",
      duration: "2h 15m",
      language: "English",
      format: ["2D"],
      releaseDate: "2024-07-01",
      poster: "https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      bannerImage: "https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      description: "A touching story about a renowned musician's final performance and the lives he impacts along the way.",
      cast: [
        { name: "Morgan Freeman", role: "Marcus Williams" },
        { name: "Emma Stone", role: "Sarah Chen" }
      ],
      crew: [
        { name: "David Fincher", role: "Director" },
        { name: "John Williams", role: "Music Director" }
      ],
      reviews: [
        { rating: 4.6, review: "Emotionally powerful!", author: "ArtHouse" },
        { rating: 4.4, review: "Beautiful storytelling", author: "FilmBuff" }
      ],
      averageRating: 4.5
    }
  ];
  
  // Mock data for theaters
  export const theaters = [
    {
      id: 1,
      name: "PVR IMAX",
      location: "Phoenix Mall, Mumbai",
      city: "Mumbai",
      facilities: ["Parking", "Food Court", "Wheelchair Access"],
      screens: [
        {
          id: 1,
          name: "Audi 1",
          capacity: 240,
          type: "IMAX"
        },
        {
          id: 2,
          name: "Audi 2",
          capacity: 180,
          type: "Standard"
        }
      ],
      showTimings: [
        {
          movieId: 1,
          screenId: 1,
          date: "2024-05-01",
          time: "10:00",
          price: {
            standard: 250,
            premium: 450,
            recliner: 700
          },
          seatsAvailable: 150
        },
        {
          movieId: 1,
          screenId: 1,
          date: "2024-05-01",
          time: "13:30",
          price: {
            standard: 300,
            premium: 500,
            recliner: 800
          },
          seatsAvailable: 200
        },
        {
          movieId: 1,
          screenId: 2,
          date: "2024-05-01",
          time: "16:45",
          price: {
            standard: 350,
            premium: 550,
            recliner: 850
          },
          seatsAvailable: 120
        }
      ]
    },
    {
      id: 2,
      name: "INOX Megaplex",
      location: "Cyber Hub, Delhi",
      city: "Delhi",
      facilities: ["Parking", "Food Court", "Gaming Zone", "Wheelchair Access"],
      screens: [
        {
          id: 1,
          name: "Sapphire",
          capacity: 300,
          type: "IMAX"
        },
        {
          id: 2,
          name: "Ruby",
          capacity: 200,
          type: "Standard"
        }
      ],
      showTimings: [
        {
          movieId: 1,
          screenId: 1,
          date: "2024-05-01",
          time: "09:30",
          price: {
            standard: 200,
            premium: 400,
            recliner: 600
          },
          seatsAvailable: 250
        },
        {
          movieId: 2,
          screenId: 2,
          date: "2024-05-01",
          time: "14:15",
          price: {
            standard: 250,
            premium: 450,
            recliner: 700
          },
          seatsAvailable: 180
        }
      ]
    },
    {
      id: 3,
      name: "Cinepolis VR",
      location: "Forum Mall, Bangalore",
      city: "Bangalore",
      facilities: ["VR Experience", "Parking", "Food Court", "Wheelchair Access"],
      screens: [
        {
          id: 1,
          name: "VR Max",
          capacity: 280,
          type: "4DX"
        },
        {
          id: 2,
          name: "Gold Class",
          capacity: 160,
          type: "Premium"
        }
      ],
      showTimings: [
        {
          movieId: 2,
          screenId: 1,
          date: "2024-05-01",
          time: "11:00",
          price: {
            standard: 300,
            premium: 500,
            recliner: 800
          },
          seatsAvailable: 200
        },
        {
          movieId: 3,
          screenId: 2,
          date: "2024-05-01",
          time: "15:30",
          price: {
            standard: 350,
            premium: 550,
            recliner: 900
          },
          seatsAvailable: 140
        }
      ]
    }
  ];
  
  // Mock data for movie genres
  export const movieGenres = [
    "Action",
    "Adventure", 
    "Animation",
    "Comedy",
    "Crime",
    "Drama",
    "Fantasy",
    "Horror",
    "Mystery",
    "Romance",
    "Sci-Fi",
    "Thriller"
  ];
  
  // Mock data for languages
  export const movieLanguages = [
    "English",
    "Hindi",
    "Tamil", 
    "Telugu",
    "Malayalam",
    "Kannada",
    "Bengali",
    "Marathi"
  ];
  
  // Mock data for formats
  export const movieFormats = [
    "2D",
    "3D",
    "4DX",
    "IMAX 2D",
    "IMAX 3D"
  ];