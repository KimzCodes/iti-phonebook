import { useState, useCallback } from "react";
import axios from "axios";

const useApi = (props) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const callAPI = useCallback(async () => {
    //x1  //x2 //x
    setLoading(true);
    setError(null);
    try {
      const response = await axios({
        ...props,
        headers: { "X-Requested-With": "XMLHttpRequest" },
      });

      setLoading(false);
      return response;
    } catch (error) {
      setLoading(false);
      setError(error.message);
      return error.response;
    }
  }, [props]);
  return { callAPI, loading, error };
};

export default useApi;
