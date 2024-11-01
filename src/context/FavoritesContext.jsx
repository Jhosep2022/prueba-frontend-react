import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { getFavorites, addFavorite, removeFavorite } from '../api/favoriteApi';

const FavoritesContext = createContext();

export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadFavorites = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getFavorites();
      setFavorites(data || []);
    } catch (error) {
      console.error('Error loading favorites:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadFavorites();
  }, [loadFavorites]);

  const isFavorite = (id) => favorites.some((fav) => fav.id === id);

  const toggleFavorite = async (character) => {
    const isFav = isFavorite(character.id);
    try {
      if (isFav) {
        const result = await removeFavorite(character.id);
        if (result && result.status) {
          setFavorites((prevFavorites) => prevFavorites.filter((fav) => fav.id !== character.id));
          loadFavorites();
        }
      } else {
        const result = await addFavorite(character);
        if (result && result.status) {
          setFavorites((prevFavorites) => [...prevFavorites, character]);
          loadFavorites();
        }
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
  };
  
  FavoritesProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite, loading }}>
      {children}
    </FavoritesContext.Provider>
  );
};
