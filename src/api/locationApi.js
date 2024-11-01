import { fetchFromApi } from './apiService';

export const getLocations = () => fetchFromApi('location');
export const getLocationById = (id) => fetchFromApi(`location/${id}`);
