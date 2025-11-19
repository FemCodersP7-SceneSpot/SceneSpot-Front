import React from 'react'

import { Search } from 'lucide-react';
import { useState } from 'react';
import { MapPin } from '../components/ui/Icons';
import { Badge } from '../components/ui/Badge';
import Map from '../components/Map';
import MovieCarousel from '../components/MovieCarousel';
import { getAllScenes, mockMovies } from '../data/mockData';
import Button from '../components/ui/Button';
import heroBackground from '../assets/hero_background.png';

export default function LandingPage({ navigate, onOpenLogin }) {
  const allScenes = getAllScenes();
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredMovies = mockMovies.filter(movie =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full">
      
      <section className="relative text-white py-32 px-4 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBackground})` }}
        />
        <div className="absolute inset-0 bg-black/50" />
        
        <div className="container mx-auto relative z-10 max-w-5xl">
          <div className="flex items-center justify-between gap-8">
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
                <span className="text-lg">{allScenes.length} scenes from {mockMovies.length} movies</span>
              </div>
              
              <Button 
                size="lg" 
                className="bg-white text-purple-600 hover:bg-white/90 hover:scale-105 transition-all shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500"
                onClick={() => onOpenLogin('signup')}
              >
                <MapPin className="w-5 h-5 mr-2" />
                Add Scene Location
              </Button>
            </div>
          </div>
        </div>
      </section>
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">
            Explore Movie Scenes
          </Badge>
          
          <p className="text-gray-600 max-w-2xl mx-auto">
            Click on any pin to see details about the filming location
          </p>
        </div>

        <div className="w-full h-[600px] rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
          <Map 
            scenes={allScenes}
            center={{ lat: 40.7128, lng: -74.0060 }}
            zoom={2}
          />
        </div>
      </section>
      <section className="bg-gradient-to-br from-gray-50 to-blue-50 py-20">
        <div className="container mx-auto px-4">
        
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">
              Featured Movies
            </Badge>
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
          
          <MovieCarousel movies={filteredMovies} navigate={navigate} />
        </div>
      </section>
    </div>
  );
}
