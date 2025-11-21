import { useState, useEffect } from 'react';
import { CheckCircle, MapPin, Sparkles } from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/input/Input';
import Textarea from '../components/ui/textarea/Textarea';
import Label from '../components/ui/label/Label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/cardSiemple';
import Badge from '../components/ui/Badge';
import { toast } from '../utils/tosat';
import { useNavigate } from 'react-router-dom';
import { fetchMovies, getMovieDetails } from '../services/tmbdService';

export default function SceneRegistration() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    movieId: null,      // TMDB movie ID
    movieTitle: '',
    description: '',
    address: '',
    latitude: '',
    longitude: ''
  });

  const [movieSuggestions, setMovieSuggestions] = useState([]);
  const [searchTimeout, setSearchTimeout] = useState(null);

  // Handle movie search
  const handleMovieSearch = (title) => {
    setFormData(prev => ({ ...prev, movieTitle: title, movieId: null }));

    if (searchTimeout) clearTimeout(searchTimeout);

    setSearchTimeout(setTimeout(async () => {
      if (title.trim() === '') return setMovieSuggestions([]);

      const results = await fetchMovies(title);
      setMovieSuggestions(results);
    }, 500)); // delay to reduce API calls
  };

  const handleSelectMovie = (movie) => {
    setFormData(prev => ({
      ...prev,
      movieTitle: movie.title,
      movieId: movie.id
    }));
    setMovieSuggestions([]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'movieTitle') {
      handleMovieSearch(value);
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.movieId || !formData.description || !formData.address ||
        !formData.latitude || !formData.longitude) {
      toast.error('Please fill in all fields and select a movie from suggestions');
      return;
    }

    const lat = parseFloat(formData.latitude);
    const lng = parseFloat(formData.longitude);

    if (isNaN(lat) || isNaN(lng) || lat < -90 || lat > 90 || lng < -180 || lng > 180) {
      toast.error('Please enter valid latitude and longitude values');
      return;
    }

    try {
      // Save to backend
      const movieSelected = await getMovieDetails(formData.movieId);
      const response = await fetch('http://localhost:8080/api/scene', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          scene_description: formData.description,
          address: formData.address,
          latitude: lat,
          longitude: lng,
          movie: {
            title: movieSelected.title,
            release_year: movieSelected.year,
            description: movieSelected.description.length > 250 ? movieSelected.description.slice(0, 250) + "..." : movieSelected.description,
            poster_img: movieSelected.poster
           }
        })
      });

      if (!response.ok) throw new Error('Failed to save scene');

      toast.success('Scene registered successfully!');

      // Reset form
      setFormData({
        movieId: null,
        movieTitle: '',
        description: '',
        address: '',
        latitude: '',
        longitude: ''
      });

      setTimeout(() => navigate('/'), 2000);
    } catch (err) {
      console.error(err);
      toast.error('Error registering scene');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-16 px-4">
      <div className="container mx-auto max-w-2xl">
        <div className="mb-10 text-center">
          <Badge variant="outline" className="mb-4">
            <Sparkles className="w-4 h-4 mr-1" />
            Contribute to the Community
          </Badge>

          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-3 rounded-xl shadow-lg">
              <MapPin className="w-8 h-8 text-white" />
            </div>
            <h1>Register Scene Location</h1>
          </div>

          <p className="text-gray-600 max-w-lg mx-auto">
            Help build our database by adding filming locations you know about
          </p>
        </div>

        <Card className="shadow-xl border-2">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
            <CardTitle>Scene Details</CardTitle>
            <CardDescription>
              Fill in the information about the movie scene location
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2 relative">
                <Label htmlFor="movieTitle">Movie Title</Label>
                <Input
                  id="movieTitle"
                  name="movieTitle"
                  placeholder="Enter movie title"
                  value={formData.movieTitle}
                  onChange={handleChange}
                  required
                  className="border-2 focus:border-purple-600"
                  autoComplete="off"
                />
                {movieSuggestions.length > 0 && (
                  <ul className="absolute z-50 bg-white border border-gray-300 w-full max-h-60 overflow-auto rounded-md mt-1 shadow-lg">
                    {movieSuggestions.map(m => (
                      <li
                        key={m.id}
                        className="px-3 py-2 cursor-pointer hover:bg-purple-100"
                        onClick={() => handleSelectMovie(m)}
                      >
                        {m.title} ({m.year})
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Scene Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Describe the scene..."
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  required
                  className="border-2 focus:border-purple-600"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  name="address"
                  placeholder="Enter the location address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="border-2 focus:border-purple-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="latitude">Latitude</Label>
                  <Input
                    id="latitude"
                    name="latitude"
                    type="number"
                    step="any"
                    placeholder="e.g., 40.7128"
                    value={formData.latitude}
                    onChange={handleChange}
                    required
                    className="border-2 focus:border-purple-600"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="longitude">Longitude</Label>
                  <Input
                    id="longitude"
                    name="longitude"
                    type="number"
                    step="any"
                    placeholder="e.g., -74.0060"
                    value={formData.longitude}
                    onChange={handleChange}
                    required
                    className="border-2 focus:border-purple-600"
                  />
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-5 rounded-xl border-2 border-blue-200">
                <div className="flex gap-3">
                  <span className="text-2xl">💡</span>
                  <p className="text-gray-700">
                    <span>Tip: </span>
                    Right-click any spot on Google Maps to copy its coordinates.
                  </p>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all"
                size="lg"
              >
                <CheckCircle className="w-5 h-5 mr-2" />
                Register Scene
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
