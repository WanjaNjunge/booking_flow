import { useState, useCallback } from 'react';

/**
 * Generic fetch hook with loading, error, and retry states.
 * Implementation to be completed in Session 2.
 */
export default function useApi() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(async (_url, _options = {}) => {
    // TODO: Implement fetch logic with loading/error/retry
    setLoading(false);
  }, []);

  const retry = useCallback(() => {
    // TODO: Re-execute last request
  }, []);

  return { data, loading, error, execute, retry };
}
