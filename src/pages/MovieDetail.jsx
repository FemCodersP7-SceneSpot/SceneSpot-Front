import React, { useEffect, useState } from "react";
import { Heart, MapPin, Plus, Calendar } from "../components/ui/Icons";
import { Card, CardContent } from "../components/ui/Card";
import { useParams, useNavigate } from "react-router-dom";
import Map from "../components/Map";
import { toast } from "../utils/tosat";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import { getMovieCredits, getMovieDetails } from "../services/tmbdService";

export default function MovieDetail() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [scenes, setScenes] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    async function fetchMovie() {
      try {
        const details = await getMovieDetails(id);
        setMovie(details);

        const credits = await getMovieCredits(id);
      } catch (err) {
        console.error("Error fetching movie:", err);
        setMovie(null);
      }
    }

    fetchMovie();
  }, [id]);

  useEffect(() => {
    fetch(`http://localhost:8080/api/scene/movie/${id}`)
      .then((res) => res.json())
      .then((data) => setScenes(data))
      .catch((err) => console.error("Error fetching scenes:", err));
  }, [id]);

  if (!movie) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1>Movie not found</h1>
        <Button onClick={() => navigate("/")} className="mt-4">
          Back to Home
        </Button>
      </div>
    );
  }

  const handleFavoriteToggle = () => {
    setIsFavorite(!isFavorite);
    toast(isFavorite ? "Removed from favorites" : "Added to favorites", {
      icon: isFavorite ? "💔" : "❤️",
    });
  };

  const handleRegisterScene = () => {
    navigate("/register_scene");
  };

  return (
    <div className="w-full">
      <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="grid md:grid-cols-[350px,1fr] gap-10 items-start">
            <div className="flex justify-center">
              <div className="rounded-2xl overflow-hidden shadow-2xl ring-4 ring-white/10 transform hover:scale-105 transition-transform">
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="max-w-full max-h-full max-h-[500px] object-contain"
                />
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h1 className="mb-4">{movie.title}</h1>
                  <div className="flex items-center gap-3 flex-wrap">
                    <Badge
                      variant="secondary"
                      className="flex items-center gap-1 bg-white/20 text-white border-white/30"
                    >
                      <Calendar className="w-4 h-4" />
                      {movie.year}
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="flex items-center gap-1 bg-white/20 text-white border-white/30"
                    >
                      <MapPin className="w-4 h-4" />
                      {scenes.length} {scenes.length === 1 ? "scene" : "scenes"}
                    </Badge>
                  </div>
                </div>

                <Button
                  variant={isFavorite ? "default" : "outline"}
                  size="lg"
                  onClick={handleFavoriteToggle}
                  className={
                    isFavorite
                      ? "bg-red-600 hover:bg-red-700 border-0 text-white"
                      : "border-2 border-white bg-white/10 hover:bg-white/20 text-white"
                  }
                  aria-label={
                    isFavorite ? "Remove from favorites" : "Add to favorites"
                  }
                  aria-pressed={isFavorite}
                >
                  <Heart
                    className={`w-5 h-5 ${isFavorite ? "fill-current" : ""}`}
                    aria-hidden="true"
                  />
                </Button>
              </div>

              <p className="text-gray-300 text-lg leading-relaxed">
                {movie.description}
              </p>

              <Button
                onClick={handleRegisterScene}
                size="lg"
                className="gap-2 bg-black text-white hover:bg-gray-700 transition-colors duration-200"
              >
                <Plus className="w-5 h-5" aria-hidden="true" />
                Register New Scene Location
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-20">
        <div className="mb-16">
          <Card className="overflow-hidden border-2 shadow-xl">
            <CardContent className="p-0">
              <div className="w-full h-[500px]">
                <Map scenes={scenes} zoom={12} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
