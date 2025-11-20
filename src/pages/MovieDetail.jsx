import React, { useState } from 'react'
import { getMovieById } from '../data/mockData';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { Calendar, Heart, MapPin, Plus } from '../components/ui/Icons';
import { Card, CardContent } from '../components/ui/cardSiemple';
import Map from '../components/Map';
import { useNavigate, useParams } from 'react-router-dom';

function MovieDetail() {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);

  const {id} = useParams();
  const movie = getMovieById(id);


  if(!movie){
    return(
      <div className="container mx-auto px-4 py-16 text-center">
        <h1>Movie not found</h1>
        <Button onClick={() => navigate("/")} className='mt-4'>
          Back to Home
        </Button>
      </div>
    )
  }
  const handleFavoriteToggle =()=>{
    setIsFavorite(!isFavorite);
    renderToStaticMarkup(isFavorite ? "Removed from favorites" : "Added to favorites", {
      icon: isFavorite ? '💔' : '❤️'
    })
  }

  const handleRegisterScene =()=>{
    navigate("/register_scene")
  }
  return (
    <div className="w-full">
      <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="grid md:grid-cols-[350px,1fr] gap-10 items-start">
            <div className="rounded-2xl overflow-hidden shadow-2xl ring-4 ring-white/10 transform hover:scale-105 transition-transform">
              <img 
                src={movie.poster} 
                alt={movie.title}
                className="w-full h-auto"
              />
            </div>
            <div className="space-y-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h1 className="mb-4">{movie.title}</h1>
                  <div className="flex items-center gap-3 flex-wrap">
                    <Badge variant="secondary" className="flex items-center gap-1 bg-white/20 text-white border-white/30">
                      <Calendar className="w-4 h-4" />
                      {movie.year}
                    </Badge>
                    <Badge variant="secondary" className="flex items-center gap-1 bg-white/20 text-white border-white/30">
                      <MapPin className="w-4 h-4" />
                      {movie.scenes.length} {movie.scenes.length === 1 ? 'scene' : 'scenes'}
                    </Badge>
                  </div>
                </div>
                
                <Button
                  variant={isFavorite ? "default" : "outline"}
                  size="lg"
                  onClick={handleFavoriteToggle}
                  className={isFavorite ? "bg-red-600 hover:bg-red-700 border-0 text-white" : "border-2 border-white bg-white/10 hover:bg-white/20 text-white"}
                  aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                  aria-pressed={isFavorite}
                >
                  <Heart 
                    className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} 
                    aria-hidden="true"
                  />
                  <span className="sr-only">
                    {isFavorite ? "Remove from favorites" : "Add to favorites"}
                  </span>
                </Button>
              </div>

              <p className="text-gray-300 text-lg leading-relaxed">
                {movie.description}
              </p>

              <Button 
                onClick={handleRegisterScene}
                size="lg"
                className="gap-2 bg-black text-white hover:bg-gray-700 transition-colors duration-200"
                aria-label="Register a new scene location for this movie"
              >
                <Plus className="w-5 h-5" aria-hidden="true" />
                Register New Scene Location
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-20">
        <div className="mb-12 text-center">
          <Badge variant="outline" className="mb-4">
            <MapPin className="w-4 h-4 mr-1" />
            Filming Locations
          </Badge>
          <h2 className="mb-3">Explore the Locations</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover the iconic locations where {movie.title} was filmed
          </p>
        </div>
        <div className="mb-16">
          <Card className="overflow-hidden border-2 shadow-xl">
            <CardContent className="p-0">
              <div className="w-full h-[500px]">
                <Map 
                  scenes={movie.scenes}
                  center={movie.scenes.length > 0 ? { 
                    lat: movie.scenes[0].lat, 
                    lng: movie.scenes[0].lng 
                  } : undefined}
                  zoom={12}
                />
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {movie.scenes.map((scene) => (
            <Card key={scene.id} className="hover:shadow-xl transition-all hover:scale-105 border-2">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-3 rounded-xl shadow-lg">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-2">{scene.description}</h3>
                    <p className="text-gray-600 mb-3">{scene.address}</p>
                    <div className="flex gap-2 text-gray-500">
                      <Badge variant="outline" className="text-xs">
                        📍 {scene.lat.toFixed(4)}, {scene.lng.toFixed(4)}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {movie.scenes.length === 0 && (
          <Card className="p-16 text-center border-2 border-dashed bg-gradient-to-br from-gray-50 to-blue-50">
            <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <MapPin className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="mb-3 text-gray-700">No scenes registered yet</h3>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              Be the first to add a filming location for this movie!
            </p>
            <Button onClick={handleRegisterScene} size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <Plus className="w-5 h-5 mr-2" />
              Register First Scene
            </Button>
          </Card>
        )}
      </div>
    </div>
  )
}

export default MovieDetail