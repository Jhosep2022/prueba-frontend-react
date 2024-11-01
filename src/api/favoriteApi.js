
const API_BASE_URL = 'http://localhost:3000';

export const getFavorites = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/favorites`);
    if (!response.ok) throw new Error('Error al obtener los favoritos');
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching favorites:', error);
    return [];
  }
};

export const addFavorite = async (favoriteData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/favorites`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(favoriteData),
      });
      return await response.json();
    } catch (error) {
      console.error("Error al agregar a favoritos:", error);
      return null;
    }
  };
  

export const removeFavorite = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/favorites/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Error al eliminar favorito');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error removing favorite:', error);
    return null;
  }
};
