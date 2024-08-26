/** @jsxImportSource @emotion/react */
import { useParams } from "react-router-dom";
import * as s from "./style";
import { useState } from "react";
import ProductRegister from "../../../components/ProductComponents/ProductRegister/ProductRegister";
import useCategories from "../../../hooks/useCategories";
import useInsertProduct from "../../../hooks/useInsertProduct";
import useCategoryInsert from "../../../hooks/useCategoryInsert";
import ImageUpload from "../../../components/ProductComponents/ImageUpload/ImageUpload";

function ProductAddPage(props) {
  const { productId } = useParams();

  const [selectedImage, setSelectedImage] = useState(null);
  const [categoryId, setCategoryId] = useState(0);
  const categories = useCategories();
  const {
    productName,
    productPrice,
    setproductName,
    setproductPrice,
    insertProduct,
  } = useInsertProduct(categories);
  const { categoryName } = useCategoryInsert();

  return (
    <div css={s.layout}>
      <div css={s.container}>
        <div css={s.productLayout}>
          <div css={s.productInsert}>
            <ProductRegister
              categories={categories}
              categoryId={categoryId}
              setCategoryId={setCategoryId}
              setproductName={setproductName}
              setproductPrice={setproductPrice}
              insertProduct={insertProduct}
              categoryName={categoryName}
            />
          </div>
        </div>
        <div css={s.optionLayout}></div>
      </div>
    </div>
  );
}

export default ProductAddPage;
