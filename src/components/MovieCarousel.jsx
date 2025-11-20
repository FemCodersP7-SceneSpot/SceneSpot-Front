import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from './ui/Icons';
import Button from './ui/Button';
import { useNavigate } from 'react-router-dom';


export default function MovieCarousel({ movies }) {
  const navigate = useNavigate();
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 4;

  const canGoPrev = startIndex > 0;
  const canGoNext = startIndex + itemsPerPage < movies.length;

  const handlePrev = () => {
    if (canGoPrev) {
      setStartIndex(Math.max(0, startIndex - 1));
    }
  };

  const handleNext = () => {
    if (canGoNext) {
      setStartIndex(Math.min(movies.length - itemsPerPage, startIndex + 1));
    }
  };

  const visibleMovies = movies.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="relative w-full">
      {canGoPrev && (
        <Button
          variant="outline"
          size="icon"
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white shadow-xl hover:scale-110 transition-transform border-2"
          onClick={handlePrev}
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>
      )}

      <div className="overflow-hidden px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {visibleMovies.map((movie) => (
            <div key={movie.id} className="flex flex-col group">
              <div
                className="cursor-pointer transition-all"
                onClick={() => navigate(`/detail/${movie.id}`)}
              >
                <div className="relative aspect-[2/3] rounded-xl overflow-hidden shadow-lg bg-gray-200 group-hover:shadow-2xl transition-all group-hover:scale-105">
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform">
                    <p className="text-sm">Click to explore scenes</p>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <h3 className="text-gray-800 group-hover:text-purple-600 transition-colors">{movie.title}</h3>
                  <p className="text-gray-500">({movie.year})</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {canGoNext && (
        <Button
          variant="outline"
          size="icon"
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white shadow-xl hover:scale-110 transition-transform border-2"
          onClick={handleNext}
        >
          <ChevronRight className="w-6 h-6" />
        </Button>
      )}

      <div className="flex justify-center gap-2 mt-8">
        {Array.from({ length: Math.ceil(movies.length / itemsPerPage) }).map((_, idx) => (
          <button
            key={idx}
            className={`h-2 rounded-full transition-all ${
              Math.floor(startIndex / itemsPerPage) === idx
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 w-8'
                : 'bg-gray-300 hover:bg-gray-400 w-2'
            }`}
            onClick={() => setStartIndex(idx * itemsPerPage)}
            aria-label={`Go to page ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
