/** @jsxImportSource @emotion/react */
import { useParams } from "react-router-dom";
import * as s from "./style";
import { useState } from "react";
import ProductRegister from "../../../components/ProductComponents/ProductRegister/ProductRegister";
import useCategories from "../../../hooks/useCategories";
import useInsertProduct from "../../../hooks/useInsertProduct";
import useCategoryInsert from "../../../hooks/useCategoryInsert";
import OptionManager from "../../../components/ProductComponents/OptionComponents/OptionManager/OptionManager";

function ProductAddPage(props) {
  const { productId } = useParams();

  const [categoryId, setCategoryId] = useState(0);
  const categories = useCategories();
  const {
    productName,
    productPrice,
    setproductName,
    setproductPrice,
    insertProduct,
  } = useInsertProduct(categories);
  const [productDetailState, setProductDetailState] = useState({
    productId,
    productName: "",
    categoryId: "",
    categoryName: "",
    productPrice: "",
    productImg: "",
    productDescription: "",
    optionTitles: [],
    optionNames: [],
  });
  const { categoryName } = useCategoryInsert();
  const [isEditing, setIsEditing] = useState(false);

  const handleOptionUpdate = (updatedOptionTitles, updatedOptionNames) => {
    setProductDetailState((prevState) => ({
      ...prevState,
      optionTitles: updatedOptionTitles,
      optionNames: updatedOptionNames,
    }));
    setIsEditing(true);
  };

  return (
    <div css={s.layout}>
      <div css={s.container}>
        <div css={s.header}>
          <button css={s.saveButton}>저장</button>
        </div>
        <div css={s.content}>
          <div css={s.productLayout}>
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
          <div css={s.optionLayout}>
            <OptionManager
              productId={productId}
              optionTitles={productDetailState.optionTitles}
              optionNames={productDetailState.optionNames}
              setOptionList={handleOptionUpdate}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductAddPage;
