import { useState, useEffect, useCallback } from "react";

const useServiceFetch = (service, setOnState) => {
  const [isLoading, setIsLoading] = useState(false);
  const [hookData, setHookData] = useState([]);

  const fetchService = useCallback(async () => {
    setIsLoading(true);
    const data = await service();

    if (setOnState) {
      setOnState(data);
      setIsLoading(false);
    } else {
      setHookData(data);
      setIsLoading(false);
    }
  }, [service, setOnState]);

  const refreshData = async () => {
    await fetchService();
  };

  useEffect(() => {
    fetchService();
  }, [fetchService]);

  return {
    isLoading,
    hookData,
    refreshData,
  };
};

export default useServiceFetch;
