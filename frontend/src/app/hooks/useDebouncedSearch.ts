import { useState, useEffect, useMemo } from 'react';

export function useDebouncedSearch<T>(
  searchFunction: (query: string) => Promise<T[]>,
  delay: number = 300
) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const debouncedQuery = useMemo(() => {
    const handler = setTimeout(() => {
      if (query.trim()) {
        performSearch(query);
      } else {
        setResults([]);
        setError(null);
      }
    }, delay);

    return () => clearTimeout(handler);
  }, [query, delay]);

  const performSearch = async (searchQuery: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const searchResults = await searchFunction(searchQuery);
      setResults(searchResults);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search failed');
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    return debouncedQuery;
  }, [debouncedQuery]);

  return {
    query,
    setQuery,
    results,
    isLoading,
    error,
  };
}