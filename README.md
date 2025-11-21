# SceneSpot
A web application for exploring and contributing filming locations of movies. Users can browse featured movies, view scene locations on a map, and register new scene locations.

## Features

-Browse featured movies from TMDb API.

-Search for movies by title.

-View movie details and registered scenes.

-Interactive map showing scene locations.

-Register new scene locations for movies.

-Favorite movies (UI only, can be extended to database).

-Responsive UI with modern design.

## Technologies

React 19

React Router

Tailwind CSS

Lucide Icons

Axios

Leaflet (for maps)

[TMDB](https://www.themoviedb.org/documentation/api)


## API endpoints

Movie

GET /api/movie/all – Get all movies from the database.

POST /api/movie – Add a new movie.

GET /api/movie/{id} – Get details of a specific movie.

Scene

GET /api/scene – Get all scenes.

POST /api/scene – Register a new scene.

GET /api/scene/movie/{id} – Get scenes for a specific movie.





