import React from "react";
import { registerProductRequest } from "../apis/api/product";

function useInsertProduct(props) {
  const insertProduct = async (
    productName,
    productPrice,
    categoryId,
    categoryName
  ) => {
    try {
      if (categoryId === 0) {
        alert("카테고리를 선택해주세요");
        throw new Error("카테고리를 선택해주세요.");
      }
      const params = {
        menuCategoryId: categoryId,
        menuCategoryName: categoryName,
        productName: productName,
        productPrice: productPrice,
      };
      await registerProductRequest(params);
      alert("메뉴 추가가 완료되었습니다.");
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return { insertProduct };
}

export default useInsertProduct;
