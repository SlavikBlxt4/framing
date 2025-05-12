import api from './api';
import { Categoria } from '@/types/category';

export const getCategorias = async (): Promise<Categoria[]> => {
    const response = await api.get<Categoria[]>('/categories');
    return response.data;
}