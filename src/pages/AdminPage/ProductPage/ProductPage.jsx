/** @jsxImportSource @emotion/react */
import * as s from "./style";
import ProductList from "../../../components/ProductComponents/ProductList/ProductList";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getProductRequest } from "../../../apis/api/product";
import AdminProductList from "../../../components/ProductComponents/AdminProductList/AdminProductList";

function ProductPage(props) {
  const [productList, setProductList] = useState([]);
  const productQuery = useQuery(["productQuery"], getProductRequest, {
    onSuccess: (response) => {
      console.log(response);
      setProductList(() =>
        response.data.map((product) => {
          return {
            productId: product.productId,
            productImg: product.productImg,
            productName: product.productName,
            productPrice: product.productPrice,
          };
        })
      );
    },
    onError: (error) => {
      console.log(error);
    },
    retry: 0,
    refetchOnWindowFocus: false,
  });

  return (
    <div css={s.layout}>
      <div css={s.container}>
        <AdminProductList productList={productList} />
      </div>
    </div>
  );
}

export default ProductPage;
