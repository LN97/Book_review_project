import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useFetch ( type, endpoint , body = {} ) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if ( type = 'POST' ) {
            const response = await axios.post(`http://localhost:5000${ endpoint}` , body );
            const result = await response.data;
            setData(result);
        } else {
            const response = await axios.get(`http://localhost:5000${ endpoint}`);
            const result = await response.data;
            setData(result);
        }
      
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint]);

  return { data, loading, error };
};