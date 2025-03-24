import { useState, useEffect, useCallback } from "react";

const useFetchDataPagination = (fetchCallback, deps = []) => {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    total: 0,
    pageSize: 10,
    current: 1,
  });
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const result = await fetchCallback(
        pagination.pageSize,
        pagination.current
      );
      if (result) {
        setData(result.data || []);

        // Kiểm tra và cập nhật pagination
        if (result.pagination) {
          setPagination((prev) => ({
            total: result.pagination.TotalCount || prev.total,
            pageSize: result.pagination.PageSize || prev.pageSize,
            current: result.pagination.CurrentPage || prev.current,
          }));
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }, [fetchCallback, pagination.current, pagination.pageSize]);

  useEffect(() => {
    fetchData();
  }, [pagination.current, pagination.pageSize, ...deps]);

  // Hàm cập nhật trang hoặc kích thước trang
  const updatePagination = (newPagination) => {
    setPagination((prev) => ({ ...prev, ...newPagination }));
  };

  return { data, loading, pagination, updatePagination, refetch: fetchData };
};

export default useFetchDataPagination;
