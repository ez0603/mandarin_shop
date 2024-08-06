import { useState, useEffect } from "react";
import { getProductTitleOption } from "../apis/api/product";

const useGetTitleOption = (productId) => {
  const [titleOptions, setTitleOptions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTitleOptions = async () => {
      try {
        const response = await getProductTitleOption(productId);
        console.log("Product title options response:", response.data);

        if (response.data) {
          const optionTitles = response.data.optionTitlesId.map((id, index) => ({
            optionTitleId: id,
            titleName: response.data.optionTitleNames[index],
          }));
          setTitleOptions(optionTitles);
        }
      } catch (error) {
        console.error("Error fetching product title options", error);
        setError(error);
      }
    };

    if (productId) {
      fetchTitleOptions();
    }
  }, [productId]);

  return { titleOptions, error };
};

export default useGetTitleOption;
