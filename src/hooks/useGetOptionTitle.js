import { getProductOptionTitle } from "../apis/api/option";
import { useEffect, useState } from "react";

const useGetOptionTitle = (productId, refresh) => {
  const [optionTitles, setOptionTitles] = useState([]);
  const [error, setError] = useState(null);

  const fetchOptionTitle = async () => {
    try {
      const response = await getProductOptionTitle(productId);
      setOptionTitles(response.optionTitles); // 응답 데이터 구조에 맞게 수정
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    if (productId !== 0) {
      fetchOptionTitle();
    }
  }, [productId, refresh]);

  return {
    optionTitles,
    error,
    refetch: fetchOptionTitle,
  };
};

export default useGetOptionTitle;
