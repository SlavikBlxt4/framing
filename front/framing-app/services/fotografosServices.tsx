import { fotografos } from '@/mocks/mockFotografo';

export type Fotografo = {
  id: string;
  nombreEstudio: string;
  fotografiaUrl: string;
  puntuacion: number;
  categoriaId: number;
};

export const getFotografos = (): Promise<Fotografo[]> => {
  return Promise.resolve(fotografos);
};

export const getFotografosPorCategoria = (categoriaId: number): Promise<Fotografo[]> => {
  return Promise.resolve(
    fotografos.filter(f => f.categoriaId === categoriaId)
  );
};