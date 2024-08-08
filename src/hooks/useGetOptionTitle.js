import { useQuery } from "react-query";
import { getProductOptionTitle } from "../apis/api/option";

const useGetOptionTitle = (productId) => {
  const { data, error, refetch } = useQuery(
    ["productTitleOptions", productId],
    () => getProductOptionTitle(productId),
    {
      enabled: !!productId,
    }
  );

  const titleOptions = data?.data?.optionTitlesId?.map((id, index) => ({
    optionTitleId: id,
    titleName: data.data.optionTitleNames[index],
  })) || [];

  return { titleOptions, error, refetch };
};

export default useGetOptionTitle;
