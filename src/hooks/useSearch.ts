import { useQuery } from '@tanstack/react-query';
import { useDebounce } from './useDebounce';
import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL || '',
});

export const useSearch = (query: string, city?: string) => {
  const debouncedQuery = useDebounce(query, 500);

  return useQuery({
    queryKey: ['search', debouncedQuery, city],
    queryFn: async () => {
      if (!debouncedQuery) return [];
      const { data } = await apiClient.get('/api/businesses', {
        params: {
          where: {
            name: {
              contains: debouncedQuery,
            },
            ...(city ? { city: { equals: city } } : {}),
          },
        },
      });
      return data.docs;
    },
    enabled: !!debouncedQuery,
  });
};
