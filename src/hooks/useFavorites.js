import { useState, useEffect } from 'react';

export function useFavorites() {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('kazilink-favorites');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('kazilink-favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (workerId) => {
    setFavorites((prev) =>
      prev.includes(workerId)
        ? prev.filter((id) => id !== workerId)
        : [...prev, workerId]
    );
  };

  const isFavorite = (workerId) => favorites.includes(workerId);

  return { favorites, toggleFavorite, isFavorite };
}
