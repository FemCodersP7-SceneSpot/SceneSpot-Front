import React, { useEffect, useState, useCallback } from 'react';
import { Search } from 'lucide-react';
import { MapPin } from '../components/ui/Icons';
import Badge from '../components/ui/Badge';
import Map from '../components/Map';
import MovieCarousel from '../components/MovieCarousel';
import Button from '../components/ui/Button';
import heroBackground from '../assets/hero_background.png';
import { useNavigate } from 'react-router-dom';
import { getPopularMovies, searchMovies } from '../services/tmbdService';
import debounce from 'lodash.debounce';

export default function LandingPage({ onOpenLogin }) {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [scenes, setScenes] = useState([]);
  const [loadingMovies, setLoadingMovies] = useState(true);
  const [loadingScenes, setLoadingScenes] = useState(true);
  const [featuredMovies, setFeaturedMovies] = useState([]);
  const [dbMovies, setDbMovies] = useState([]);
  const [loadingDbMovies, setLoadingDbMovies] = useState(true);

  useEffect(() => {
    async function fetchFeatured() {
      const movies = await getPopularMovies();
      setFeaturedMovies(movies);
      setMovies(movies);
      setLoadingMovies(false);
    }
    fetchFeatured();
  }, []);

  useEffect(() => {
  async function fetchDbMovies() {
    try {
      const res = await fetch('http://localhost:8080/api/movie/all'); 
      if (!res.ok) throw new Error('Failed to fetch movies from DB');
      const data = await res.json();
      setDbMovies(data);
    } catch (err) {
      console.error('Error fetching DB movies:', err);
    } finally {
      setLoadingDbMovies(false);
    }
  }
  fetchDbMovies();
  }, []);

  useEffect(() => {
    async function fetchScenes() {
      try {
        const res = await fetch('http://localhost:8080/api/scene');
        if (!res.ok) throw new Error('Failed to fetch scenes');
        const data = await res.json();
        setScenes(data);
      } catch (err) {
        console.error('Error fetching scenes:', err);
      } finally {
        setLoadingScenes(false);
      }
    }
    fetchScenes();
  }, []);

  const fetchSearchResults = useCallback(
    debounce(async (query) => {
      if (!query || query.length < 1) {
        setMovies(featuredMovies);
        return;
      }

      setLoadingMovies(true);
      try {
        const results = await searchMovies(query);
        setMovies(results);
      } catch (err) {
        console.error('Error searching movies:', err);
      } finally {
        setLoadingMovies(false);
      }
    }, 500),
    [featuredMovies]
  );

  useEffect(() => {
    fetchSearchResults(searchQuery);
  }, [searchQuery, fetchSearchResults]);

  return (
    <div className="w-full">

      <section className="relative text-white py-32 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${heroBackground})` }} />
        <div className="absolute inset-0 bg-black/50" />
        <div className="container mx-auto relative z-10 max-w-5xl flex items-center justify-between gap-8">
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h1 className="text-6xl md:text-7xl">
              Step<br />
              into the<br />
              Scene
            </h1>
          </div>
          <div className="flex flex-col items-end gap-6">
            <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full border border-white/30 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
              <MapPin className="w-5 h-5 inline mr-2" />
              <span className="text-lg">{loadingScenes ? '...' : scenes.length} scenes from {loadingDbMovies ? '...' : dbMovies.length} movies</span>
            </div>
            <Button 
              size="lg" 
              className="bg-white text-purple-600 hover:bg-white/90 hover:scale-105 transition-all shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500"
              onClick={() => navigate("/register_scene")}
            >
              <MapPin className="w-5 h-5 mr-2" />
              Add Scene Location
            </Button>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 pt-32 pb-20">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">Explore Movie Scenes</Badge>
          <p className="text-gray-600 max-w-2xl mx-auto">Click on any pin to see details about the filming location</p>
        </div>
        <div className="w-full h-[600px] rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
          {loadingScenes ? (
            <p className="text-center mt-24 text-gray-500">Loading map...</p>
          ) : (
            <Map scenes={scenes} center={{ lat: 40.7128, lng: -74.0060 }} zoom={2} />
          )}
        </div>
      </section>

      <section className="bg-gradient-to-br from-gray-50 to-blue-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">Featured Movies</Badge>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Browse through our curated collection of movies with registered filming locations
            </p>
          </div>
          <div className="max-w-xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for a movie..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent shadow-sm"
              />
            </div>
          </div>
          {loadingMovies ? (
            <p className="text-center text-gray-500">Loading movies...</p>
          ) : (
            <MovieCarousel 
              movies={movies} 
              navigate={(movieId) => navigate(`/detail/${movieId}`)} 
            />
          )}
        </div>
      </section>
    </div>
  );
}
