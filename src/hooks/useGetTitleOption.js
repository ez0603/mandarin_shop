import { useQuery } from "react-query";
import { getProductTitleOption } from "../apis/api/product"; // 경로가 정확한지 확인하세요.

const useGetTitleOption = (productId) => {
  const { data, error, refetch } = useQuery(
    ["productTitleOptions", productId],
    () => getProductTitleOption(productId),
    {
      enabled: !!productId,
    }
  );

  const titleOptions = data?.data.optionTitlesId.map((id, index) => ({
    optionTitleId: id,
    titleName: data.data.optionTitleNames[index],
  })) || [];

  return { titleOptions, error, refetch };
};

export default useGetTitleOption;
