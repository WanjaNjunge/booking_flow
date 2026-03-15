import { useState, useCallback, useRef } from 'react';

export default function useApi() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const lastCall = useRef(null);

  const execute = useCallback(async (url, options = {}) => {
    lastCall.current = { url, options };
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const res = await fetch(url, {
        method: options.method || 'GET',
        headers: options.body ? { 'Content-Type': 'application/json' } : {},
        body: options.body ? JSON.stringify(options.body) : undefined,
      });

      const json = await res.json();

      if (!res.ok) {
        setError(json.error || `Request failed (${res.status})`);
        setLoading(false);
        return null;
      }

      setData(json);
      setLoading(false);
      return json;
    } catch (err) {
      setError(err.message || 'Network error');
      setLoading(false);
      return null;
    }
  }, []);

  const retry = useCallback(() => {
    if (lastCall.current) {
      return execute(lastCall.current.url, lastCall.current.options);
    }
  }, [execute]);

  return { data, loading, error, execute, retry };
}
