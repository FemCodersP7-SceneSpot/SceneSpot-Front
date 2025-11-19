export const mockMovies = [
  {
    id: '1',
    title: 'Midnight in Manhattan',
    poster: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXclMjB5b3JrJTIwY2l0eSUyMHN0cmVldHxlbnwxfHx8fDE3NjM0NzIzNzB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'A romantic comedy set in the heart of New York City, following two strangers who meet on a rainy night in Times Square.',
    year: 2022,
    scenes: [
      {
        id: 's1',
        movieId: '1',
        movieTitle: 'Midnight in Manhattan',
        description: 'Opening scene - Times Square at night',
        address: 'Times Square, New York, NY 10036',
        lat: 40.7580,
        lng: -73.9855
      },
      {
        id: 's2',
        movieId: '1',
        movieTitle: 'Midnight in Manhattan',
        description: 'Central Park romantic walk',
        address: 'Central Park, New York, NY 10024',
        lat: 40.7829,
        lng: -73.9654
      }
    ]
  },
  {
    id: '2',
    title: 'Parisian Dreams',
    poster: 'https://images.unsplash.com/photo-1431274172761-fca41d930114?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJpcyUyMGVpZmZlbCUyMHRvd2VyfGVufDF8fHx8MTc2MzQxMTQwM3ww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'An artistic journey through Paris as a young painter discovers her passion and purpose.',
    year: 2021,
    scenes: [
      {
        id: 's3',
        movieId: '2',
        movieTitle: 'Parisian Dreams',
        description: 'Eiffel Tower proposal scene',
        address: 'Champ de Mars, 75007 Paris, France',
        lat: 48.8584,
        lng: 2.2945
      },
      {
        id: 's4',
        movieId: '2',
        movieTitle: 'Parisian Dreams',
        description: 'Louvre Museum art gallery',
        address: 'Rue de Rivoli, 75001 Paris, France',
        lat: 48.8606,
        lng: 2.3376
      }
    ]
  },
  {
    id: '3',
    title: 'London Calling',
    poster: 'https://images.unsplash.com/photo-1671991184977-1806e4146e37?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb25kb24lMjBicmlkZ2UlMjBzdHJlZXR8ZW58MXx8fHwxNzYzNDcyMzcxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'A thrilling mystery unfolds across London\'s iconic landmarks.',
    year: 2023,
    scenes: [
      {
        id: 's5',
        movieId: '3',
        movieTitle: 'London Calling',
        description: 'Tower Bridge chase scene',
        address: 'Tower Bridge Rd, London SE1 2UP, UK',
        lat: 51.5055,
        lng: -0.0754
      }
    ]
  },
  {
    id: '4',
    title: 'Tokyo Nights',
    poster: 'https://images.unsplash.com/photo-1643431452454-1612071b0671?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b2t5byUyMHNoaWJ1eWElMjBjcm9zc2luZ3xlbnwxfHx8fDE3NjMzNjc4Njl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'A neon-soaked adventure through Tokyo\'s vibrant nightlife and hidden corners.',
    year: 2024,
    scenes: [
      {
        id: 's6',
        movieId: '4',
        movieTitle: 'Tokyo Nights',
        description: 'Shibuya Crossing opening sequence',
        address: 'Shibuya Crossing, Tokyo, Japan',
        lat: 35.6595,
        lng: 139.7004
      }
    ]
  }
];

export const getAllScenes = () => {
  return mockMovies.flatMap(movie => movie.scenes);
};

export const getMovieById = (id) => {
  return mockMovies.find(movie => movie.id === id);
};

export const getScenesByMovieId = (movieId) => {
  const movie = getMovieById(movieId);
  return movie ? movie.scenes : [];
};
