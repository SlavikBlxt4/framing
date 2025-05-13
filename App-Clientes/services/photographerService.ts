import axios from 'axios';
import { Photographer } from '@/types/photographer';
import { Portfolio } from '@/types/portfolio';

const API_URL = 'http://ec2-3-87-201-29.compute-1.amazonaws.com:3000';

export const getPhotographers = async (): Promise<Photographer[]> => {
  try {
    const response = await axios.get(`${API_URL}/users/photographers`);
    return response.data;
  } catch (error) {
    console.error('Error fetching photographers:', error);
    throw error;
  }
};

export const getPhotographerById = async (id: number): Promise<Photographer> => {
  try {
    // Primero obtenemos todos los fotógrafos
    const photographers = await getPhotographers();
    // Luego filtramos el fotógrafo específico
    const photographer = photographers.find(p => p.id === id);
    
    if (!photographer) {
      throw new Error(`Photographer with id ${id} not found`);
    }
    
    return photographer;
  } catch (error) {
    console.error(`Error fetching photographer ${id}:`, error);
    throw error;
  }
};

export const getPhotographerPortfolio = async (id: number): Promise<Portfolio> => {
  try {
    const response = await axios.get(`${API_URL}/users/photographers/${id}/portfolio`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching photographer portfolio ${id}:`, error);
    throw error;
  }
}; 