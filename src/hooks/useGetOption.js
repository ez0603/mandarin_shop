import { useState, useEffect } from 'react';
import { getProductOption } from '../apis/api/product';

const useGetOption = (productId) => {
  const [options, setOptions] = useState([]);
  const [error, setError] = useState(null);

  const getOptions = async () => {
    try {
      const response = await getProductOption(productId);
      setOptions(response.data);
    } catch (error) {
      console.log("에러", error);
      setError(error);
    }
  };

  useEffect(() => {
    if (productId) {
      getOptions();
    }
  }, [productId]);

  return { options, error, refetch: getOptions };
};

export default useGetOption;
