export const BASE_URL = 'https://rickandmortyapi.com/api';

export const fetchFromApi = async (endpoint) => {
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`);
    if (!response.ok) throw new Error('Error en la petición');
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};
