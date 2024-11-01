import { fetchFromApi } from './apiService';

export const getCharacters = () => fetchFromApi('character');
export const getCharacterById = (id) => fetchFromApi(`character/${id}`);
