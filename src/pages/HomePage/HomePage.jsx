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
        if (categoryId) {
          const response = await getProductCategoryRequest(categoryId);
          setProductList(response.data);
          console.log(response.data);
        } else {
          setProductList([]); // 카테고리가 선택되지 않았을 때는 빈 리스트
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, [categoryId]);

  return (
    <div css={s.layout}>
      <h1>홈페이지</h1>
      {categoryId ? (
        productList.length > 0 ? (
          <ProductList css={s.container} productList={productList} />
        ) : (
          <p>선택한 카테고리에 해당하는 상품이 없습니다.</p>
        )
      ) : (
        <div>
          <h2>Welcome to Our Shop!</h2>
          <p>Select a category to see our products.</p>
          {/* 여기에 배너나 소개 이미지를 추가할 수 있습니다. */}
        </div>
      )}
    </div>
  );
};

export default HomePage;
