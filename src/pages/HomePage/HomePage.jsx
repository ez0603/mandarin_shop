/**@jsxImportSource @emotion/react */
import * as s from "./style";
import { useState, useEffect } from "react";
import ProductList from "../../components/ProductComponents/ProductList/ProductList";
import { useLocation } from "react-router-dom";
import {
  getProductRequest,
  getProductCategoryRequest,
} from "../../apis/api/product";

const HomePage = () => {
  const [productList, setProductList] = useState([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryId = queryParams.get("category");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let response;
        if (categoryId) {
          response = await getProductCategoryRequest(categoryId);
        } else {
          response = await getProductRequest();
        }
        setProductList(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, [categoryId]);

  return (
    <div css={s.layout}>
      <h1>Products</h1>
      <ProductList css={s.container} productList={productList} />
    </div>
  );
};

export default HomePage;
