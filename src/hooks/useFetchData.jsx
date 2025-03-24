import { useState, useEffect, useCallback } from "react";

const useFetchData = (fetchCallback, deps = []) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const result = await fetchCallback();
      setData(result?.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }, [fetchCallback]);

  useEffect(() => {
    fetchData();
  }, [...deps]);

  return { data, loading, refetch: fetchData };
};

export default useFetchData;
