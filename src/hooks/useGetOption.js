import { useState, useEffect } from "react";
import { getProductTitleOption, getProductOption } from "../apis/api/product";

const useGetOption = (productId) => {
  const [options, setOptions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const titleResponse = await getProductTitleOption(productId);
        const optionResponse = await getProductOption(productId);
        console.log("Title options response:", titleResponse.data);
        console.log("Product options response:", optionResponse.data);

        if (titleResponse.data && optionResponse.data) {
          const optionTitles = titleResponse.data.optionTitlesId.map((id, index) => {
            const optionNames = optionResponse.data.optionNames.filter(
              (_, i) => optionResponse.data.optionTitlesId[i] === id
            );
            const optionNameIds = optionNames.map((_, i) => `${id}-${i}`);

            return {
              optionTitleId: id,
              titleName: titleResponse.data.optionTitleNames[index],
              optionNames,
              optionNameIds,
            };
          });
          setOptions(optionTitles);
        }
      } catch (error) {
        console.error("Error fetching options", error);
        setError(error);
      }
    };

    if (productId) {
      fetchOptions();
    }
  }, [productId]);

  return { options, error };
};

export default useGetOption;
