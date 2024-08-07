import { useQuery } from "react-query";
import { getProductDetailRequest } from "../apis/api/product";

const useGetProductsDetail = (productId) => {
  const queryResult = useQuery(
    ["productDetail", productId],
    () => getProductDetailRequest(productId),
    {
      enabled: !!productId,
    }
  );

  return {
    ...queryResult,
    productDetail: queryResult.data?.data,
  };
};

export default useGetProductsDetail;
