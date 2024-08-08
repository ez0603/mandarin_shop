import { useEffect, useState } from "react";
import { getProductOptionTitle } from "../apis/api/option";

const useGetOptionTitle = (productId, refresh) => {
  const [optionTitleId, setOptionTitleId] = useState([]);
  const [optionTitleName, setOptionTitleName] = useState([]);
  const [error, setError] = useState(null);

  const fetchOptionTitle = async () => {
    try {
      const response = await getProductOptionTitle(productId);
      setOptionTitleId(response.data.optionTitlesId);
      setOptionTitleName(response.data.optionTitleNames);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    if (productId) {
      fetchOptionTitle();
    }
  }, [productId, refresh]);

  return { optionTitleId, optionTitleName, error, refetch: fetchOptionTitle };
};

export default useGetOptionTitle;
