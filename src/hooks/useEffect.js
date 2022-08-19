import { useState, useEffect } from 'react';

export const useFetch = url => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    const feachData = async () => {
      try {
        const response = await fetch(url);
        const result = await response.json();
        setData(result.result);
      } catch (err) {
        setError(true);
      }
      setLoading(false);
    };
    feachData();
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
