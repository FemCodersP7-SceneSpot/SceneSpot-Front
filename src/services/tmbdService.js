import axios from "axios";

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_API_KEY = import.meta.env.VITE_API_KEY;

const tmdbClient = axios.create({
  baseURL: TMDB_BASE_URL,
  headers: {
    Authorization: `Bearer ${TMDB_API_KEY}`,
  },
});

const mapMovie = (movie) => ({
  id: movie.id,
  title: movie.title,
  poster: movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "/placeholder.jpg",
  year: movie.release_date ? movie.release_date.split("-")[0] : "",
  description: movie.overview || "",
  scenes: [], 
});

export const getPopularMovies = async (page = 1) => {
  try {
    const response = await tmdbClient.get("/movie/popular", {
      params: { page },
    });
    return response.data.results.map(mapMovie);
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    return [];
  }
};

export const searchMovies = async (query, page = 1) => {
  try {
    const response = await tmdbClient.get("/search/movie", {
      params: { query, page },
    });
    return response.data.results.map(mapMovie);
  } catch (error) {
    console.error("Error searching movies:", error);
    return [];
  }
};

export const getMovieDetails = async (movieId) => {
  try {
    const response = await tmdbClient.get(`/movie/${movieId}`);
    const movie = response.data;
    return {
      id: movie.id,
      title: movie.title,
      poster: movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : "/placeholder.jpg",
      year: movie.release_date ? movie.release_date.split("-")[0] : "",
      description: movie.overview || "",
      scenes: [], 
    };
  } catch (error) {
    console.error(`Error fetching movie ${movieId}:`, error);
    return null;
  }
};

export const getMovieCredits = async (movieId) => {
  try {
    const response = await tmdbClient.get(`/movie/${movieId}/credits`);
    return response.data; 
  } catch (error) {
    console.error(`Error fetching credits for movie ${movieId}:`, error);
    return null;
  }
};

export const fetchMovies = async (query = "", page = 1) => {
  return query ? searchMovies(query, page) : getPopularMovies(page);
};

export default {
  getPopularMovies,
  searchMovies,
  getMovieDetails,
  getMovieCredits,
  fetchMovies,
};
