import React from "react";
import { registerProduct } from "../apis/api/product";

function useInsertProduct() {
  const insertProduct = async ({
    productName,
    categoryId,
    productPrice,
    productImg,
    productDescription,
    inventoryQuantity,
  }) => {
    try {
      console.log("insertProduct called");

      if (categoryId === 0) {
        alert("카테고리를 선택해주세요");
        throw new Error("카테고리를 선택해주세요.");
      }

      const params = {
        productName,
        categoryId,
        productPrice: parseInt(productPrice, 10),
        productImg,
        productDescription,
        inventoryQuantity: parseInt(inventoryQuantity, 10),
      };

      console.log("Params before sending:", params);

      await registerProduct(params);

      alert("상품 추가가 완료되었습니다.");
      // window.location.reload();
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  return { insertProduct };
}

export default useInsertProduct;
