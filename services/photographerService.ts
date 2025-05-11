import axios from 'axios';
import { Photographer } from '@/types/photographer';

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
    const response = await axios.get(`${API_URL}/users/photographers/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching photographer ${id}:`, error);
    throw error;
  }
}; 