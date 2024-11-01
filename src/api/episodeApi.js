import { fetchFromApi } from './apiService';

export const getEpisodes = () => fetchFromApi('episode');
export const getEpisodeById = (id) => fetchFromApi(`episode/${id}`);
